import { createContext, type ReactNode } from "react";
import AudioRecordingService from "../services/audio-recording.service";
import WhisperService from "../services/whisper.service";

export interface ServicesContextType {
  audioRecordingService : AudioRecordingService
  whisperService : WhisperService
}

const defaultContextValue: ServicesContextType = {
    audioRecordingService : new AudioRecordingService(),
    whisperService : new WhisperService()
}

export const ServicesContext = createContext<ServicesContextType>(defaultContextValue);

interface ServicesProviderProps {
  children: ReactNode;
  customServices?: Partial<ServicesContextType>;
}

export function ServicesProvider({ children, customServices }: ServicesProviderProps) {
  const contextValue: ServicesContextType = {
    ...defaultContextValue,
    ...customServices,
  };

  return (
    <ServicesContext.Provider value={contextValue}>
      {children}
    </ServicesContext.Provider>
  );
}