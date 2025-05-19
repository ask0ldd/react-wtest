import { useLayoutMode } from "../hooks/useLayoutMode";

export default function Input(props : React.InputHTMLAttributes<HTMLInputElement> & { voiceActivator : string, ref : React.Ref<HTMLInputElement> }){
    const { voiceActivator, ref, ...rest } = props
    const { layoutModeActive } = useLayoutMode()
    
    return(
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
            <input ref={ref} {...rest} type="text"
                className={
                    rest.className +
                    " transition-all duration-500 " +
                    (layoutModeActive
                        ? "translate-x-12 opacity-0 w-0 h-0"
                        : "translate-x-0 opacity-100 w-full")
                }
            />
        </div>
    )
}