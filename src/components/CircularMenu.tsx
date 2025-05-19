import { createPortal } from "react-dom";

export default function CircularMenu() {
  return createPortal(
    <div className="absolute flex justify-center items-center left-[50vw] top-[50vh] translate-[-50%] w-[300px] h-[300px] rounded-full bg-neutral-300">
      Menu
    </div>,
    document.body
  );
}