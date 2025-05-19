import { useEffect } from "react";
import { Link, type LinkProps } from "react-router";
import AudioNavService from "../services/audio-nav.service";
import { useLayoutMode } from "../hooks/useLayoutMode";

export default function AudioLink(props : IAudioLink){

    const { audioTriggers, voiceActivator, ...rest } = props;
    const { layoutModeActive }= useLayoutMode()

    useEffect(() => {
        if(audioTriggers) AudioNavService.addNavDirective(audioTriggers, props.to as string)
    })

    return(
        <Link {...rest}>
            <div className="flex flex-row overflow-hidden">
                <span
                    className={
                        "transition-all duration-500 " +
                        (layoutModeActive
                            ? "translate-x-0 opacity-100 w-fit"
                            : "-translate-x-12 opacity-0 w-0 h-0")
                    }
                >
                    🎤 "{voiceActivator}"
                </span>
                
                <span
                    className={
                        "transition-all duration-500 " +
                        (layoutModeActive
                            ? "translate-x-12 opacity-0 w-0 h-0"
                            : "translate-x-0 opacity-100 w-fit")
                    }
                >
                    {rest.children}
                </span>
            </div>
        </Link>
    )
}

type IAudioLink = LinkProps & React.RefAttributes<HTMLAnchorElement> & { audioTriggers : string[], voiceActivator : string }