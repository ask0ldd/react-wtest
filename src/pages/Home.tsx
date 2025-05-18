/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from "react"
import { useServices } from "../hooks/useServices"
import AudioNavService from "../services/audio-nav.service"
import CircularMenu from "../components/CircularMenu"
import Header from "../components/Header"
import { useNavigate } from "react-router"
import { Directive } from "../components/Directive"
import '../App.css'
import { useLayoutMode } from "../hooks/useLayoutMode"
import AudioLink from "../components/AudioLink"
import Input from "../components/Input"

export default function Home(){

    const {whisperService, audioRecordingService} = useServices()
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [isMenuActive, setMenuIsActive] = useState<boolean>(false)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null> (null)
    const [transcribedText, setTranscribedText] = useState("")
    const [buttonColor, setButtonColor] = useState("blue")
    const navigate = useNavigate()
    const {switchLayoutMode} = useLayoutMode()
    
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
                const triggerSentences = AudioNavService.getAllNavDirectives()
                for (const sentence in triggerSentences) {
                    if(transcription.text.toLowerCase().includes(sentence)) return navigate(triggerSentences[sentence])
                }
                const globalDirectives = AudioNavService.getAllGlobalDirectives()
                console.log(JSON.stringify(globalDirectives))
                globalDirectives.forEach(directive => {
                    if(directive.regex.test(transcription.text)) {
                        console.log("positive")
                        return directive.action()
                    }
                })
                // layout ou overlay
            }
            return 
        }
        setIsRecording(true)
        return audioRecordingService.startRecording()
    }

    return(
        <div className='flex flex-col w-full'>
            <Header/>
            <main className='flex flex-col w-full justify-center mt-[2rem] gap-y-[2rem]'>
                <button className='cursor-pointer' style={buttonColor == "red" ? {background : buttonColor} : {}} onClick={handleClick}>Record</button>
                <AudioLink to={""} audioTriggers={[]} voiceActivator={"Menu"}><button>Display Main Menu</button></AudioLink>
                <Input ref={inputRef} voiceActivator={"focus city"} className="flex justify-center items-center shrink-0 w-[240px] h-[50px] border-1 border-black px-[10px]" placeholder="City"/>
                <textarea className='border-1 border-blue-400 resize-none focus:outline-1 focus:outline-blue-700 p-[10px]' rows={10} cols={100} ref={textareaRef} value={transcribedText.trim()}/>
                <span className='text-red-400'>{isRecording ? "Recording" : "Not Recording"}</span>
                <div className='h-[3000px] w-full bg-neutral-100'></div>
            </main>
            {isMenuActive && <CircularMenu/>}
            <Directive id="layout" regex={/lay out|layout|leo|lea|overly|overlay|sitemap|site map|side map|sidemap/i} action={() => switchLayoutMode()}/>
            <Directive id="menu" regex={/menu|man you|manu|the new/i} action={() => setMenuIsActive(prev => {
                console.log("menu call")
                return !prev
            })}/>
            <Directive id="focus city" regex={/focus city|focus ct|for the city/i} action={() => inputRef.current?.focus()}/>
            <Directive id="down" regex={/bottom|bodom|but um|down|dawn|don|doun|downn|downer|downed|down the|down to|down two|down too|on|downed/i} action={() => window.scrollBy(0, 1000)}/>
        </div>
    )
}

// https://tympanus.net/codrops/2013/08/09/building-a-circular-navigation-with-css-transforms/