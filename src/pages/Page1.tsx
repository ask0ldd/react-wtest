import Header from "../components/Header";

export default function Page1(){
    return(
        <div className='flex flex-col w-full'>
            <Header/>
            <main className='flex flex-col w-full justify-center mt-[2rem]'>
                Page 1
            </main>
        </div>
    )
}