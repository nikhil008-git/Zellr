
export default function Box({children} : {children: React.ReactNode}) {

    return (
        <div className="md:border md:border-white-100 h-60   md:w-[1152px] flex items-center justify-center mx-auto font-extrabold md:font-mono sm:font-mono md:text-4xl">   
           {children}
        </div> 
    )
}