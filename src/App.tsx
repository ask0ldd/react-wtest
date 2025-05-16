/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { useServices } from './hooks/useServices'
import { useNavigate } from 'react-router'
import Header from './components/Header'
import AudioNavService from './services/audio-nav.service'

function App() {

  const {whisperService, audioRecordingService} = useServices()
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [transcribedText, setTranscribedText] = useState("")
  const [buttonColor, setButtonColor] = useState("blue")
  const navigate = useNavigate()

  useEffect(() => {
    audioRecordingService.setSilenceThresholdCut(2)
  }, [])

  async function handleClick(){
    if(isRecording) {
      const arrayAudioBuffer = await audioRecordingService.stopRecording()
      setIsRecording(false)
      const transcription = await whisperService.transcribe(arrayAudioBuffer)
      console.log(JSON.stringify(transcription))
      setTranscribedText(JSON.stringify(transcription))
      if(transcription && "text" in transcription) {
        console.log(transcription.text)
        setTranscribedText(transcription.text)
        const triggerSentences = AudioNavService.getAllTriggerSentences()
        for (const sentence in triggerSentences) {
          if(transcription.text.toLowerCase().includes(sentence)) return navigate(triggerSentences[sentence])
        }
        // if(/(down|bottom)/i.test(transcription.text)) return window.scrollBy(0, 1000);
        if(/down|dawn|don|doun|downn|downer|downed|down the|down to|down two|down too|on|downed/i.test(transcription.text)) return window.scrollBy(0, 1000);
        if(/bottom|botom|bodom|bought ?'em|bot ?'em|but ?'em|bought ?them|bottem|bottum|bottam|boddem|badam|bahdum/i.test(transcription.text)) return window.scrollBy(0, 1000);
      }
      return 
    }
    setIsRecording(true)
    return audioRecordingService.startRecording()
  }

  return (
    <div className='flex flex-col w-full'>
      <Header/>
      <main className='flex flex-col w-full justify-center mt-[2rem]'>
        <button className='cursor-pointer' style={buttonColor == "red" ? {background : buttonColor} : {}} onClick={handleClick}>Record</button>
        <textarea className='mt-[2rem] border-1 border-blue-400 resize-none focus:outline-1 focus:outline-blue-700' rows={10} cols={100} ref={textareaRef} value={transcribedText}/>
        <span className='mt-[2rem] text-red-400'>{isRecording ? "Recording" : "Not Recording"}</span>
        <div className='h-[3000px] w-[200px] bg-neutral-100'>
        </div>
      </main>
    </div>
  )
}

export default App
