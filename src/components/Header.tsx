import AudioLink from "./AudioLink";

export default function Header(){
    return(
        <header className='flex flex-row w-full'>
            <nav className='flex flex-row w-full'>
                <ul className='flex flex-row gap-x-[1rem]'>
                    <AudioLink to={'/'} audioTriggers={["home"]} voiceActivator="Home" ><li>Home</li></AudioLink>
                    <AudioLink to={'/page1'} audioTriggers={["page one", "page 1"]} voiceActivator="Page One" ><li>Page 1</li></AudioLink>
                    <AudioLink to={'/page2'} audioTriggers={page2words} voiceActivator="Page Two" ><li>Page 2</li></AudioLink>
                </ul>
            </nav>
        </header>
    )
}

const page2words = [
"page two",
"page 2",
"page too",
"page to",
"page tu",
"page II",
"page twoo",
"page, too",
"page, to",
"page, two",
"page number two",
"page number 2",
"page no two",
"page no 2",
"page second",
"second page",
"2nd page",
]