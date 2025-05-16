export default class AudioRecordingService {

    private mediaRecorder?: MediaRecorder;
    private chunks : Blob[] = []
    private silenceCutThreshold = 2

    constructor() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                this.mediaRecorder = new MediaRecorder(stream)
                this.mediaRecorder.ondataavailable = (ev: BlobEvent) => {
                    this.chunks.push(ev.data)
                    console.log(this.chunks)
                }
            })
            .catch((err) => {
                console.error('Microphone access denied:', err)
        })
    }

    startRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
            console.log('Start Recording...')
            this.chunks = []
            this.mediaRecorder.start()
        } else {
            console.warn('MediaRecorder not ready or already recording.')
        }
    }

    stopRecording(): Promise<Float32Array<ArrayBufferLike>> {
        return new Promise((resolve, reject) => {
            if (!this.mediaRecorder) {
                reject('MediaRecorder not initialized.')
                return
            }
            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.chunks, { type: 'audio/webm' })
                this.convertAudioBlobToArrayBuffer(audioBlob)
                    .then(arrayBuffer => {
                        console.log('Stopped Recording.')
                        resolve(arrayBuffer)
                    })
            }
            this.mediaRecorder.stop()
        })
    }

    async convertAudioBlobToArrayBuffer(audioBlob : Blob) : Promise<Float32Array>{
        const arrayBuffer = await audioBlob.arrayBuffer()
        const audioCtx = new AudioContext({ sampleRate: 16000 });
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        return audioBuffer.getChannelData(0);
    }

    setSilenceThresholdCut(seconds : number){
        this.silenceCutThreshold = seconds
    }
}

/*
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    const mediaRecorder = new MediaRecorder(stream);

    analyser.fftSize = 2048;
    const dataArray = new Uint8Array(analyser.fftSize);
    const silenceThreshold = 0.01; // 1% of max amplitude
    const silenceDuration = 3000; // 3 seconds
    let silenceStart = performance.now();

    function calculateRMS(data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        const normalized = data[i] / 128 - 1;
        sum += normalized * normalized;
    }
    return Math.sqrt(sum / data.length);
    }

    function detectSilence() {
    analyser.getByteTimeDomainData(dataArray);
    const rms = calculateRMS(dataArray);
    const now = performance.now();

    if (rms < silenceThreshold) {
        if (now - silenceStart > silenceDuration) {
        if (mediaRecorder.state === "recording") mediaRecorder.stop();
        }
    } else {
        silenceStart = now;
        if (mediaRecorder.state === "inactive") mediaRecorder.start();
    }
    requestAnimationFrame(detectSilence);
    }

    detectSilence();
*/