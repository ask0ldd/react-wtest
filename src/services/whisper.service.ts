/* eslint-disable @typescript-eslint/no-unused-vars */
import { type AutomaticSpeechRecognitionOutput, AutomaticSpeechRecognitionPipeline, env, pipeline } from '@huggingface/transformers';

env.allowRemoteModels = false
env.allowLocalModels = true
env.localModelPath = 'http://localhost:3000/static/model'

export default class WhisperService {
  transcriber : AutomaticSpeechRecognitionPipeline | null = null

  constructor() { }

  async init(){
    if(this.transcriber != null) return
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.transcriber = await pipeline(
      "automatic-speech-recognition",
      "onnx-community/whisper-tiny.en",
      { 
        device: "webgpu",
        dtype : 'fp32',
      },
    )
  }  

  async transcribe(floatArray : Float32Array) : Promise<AutomaticSpeechRecognitionOutput | AutomaticSpeechRecognitionOutput[] | null>{
    try{
      await this.init()
      if(!this.transcriber) throw new Error("TTS generator hasn't been initilized.")
      /*const audioCtx = new AudioContext({ sampleRate: 16000 });
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      const floatArray = audioBuffer.getChannelData(0);*/
      return await this.transcriber(floatArray, {
        chunk_length_s: 30,
        stride_length_s: 10,
      });
    }catch(error : unknown){
      console.error(error)
      return null
    }
  }  
}
