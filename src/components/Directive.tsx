import { useEffect } from "react";
import type IDirective from "../interfaces/IDirective";
import AudioNavService from "../services/audio-nav.service";
import { createPortal } from "react-dom";

export function Directive(directive : IDirective){

    useEffect(() => {
        AudioNavService.addGlobalDirective(directive)
    }, [])

    return(
        createPortal(
            <></>, 
            document.body
        )
    )
}