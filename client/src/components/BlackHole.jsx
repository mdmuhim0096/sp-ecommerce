import { useEffect, useState } from "react"

const BlackHole = ({ children }) => {

    const [device, setDevice] = useState({
        isMobile: false,
        isTablet: false,
        isPc: false
    });

    useEffect(() => {
        const handelDevice = () => {
            const width = window.innerWidth;
            if (width > 1023) {
                setDevice({ isPc: true });
            } else if (width > 767 && width < 1024) {
                setDevice({ isTablet: true });
            } else {
                setDevice({ isMobile: true });
            }
        }
        window.addEventListener("resize", handelDevice);

        return () => window.removeEventListener("resize", handelDevice)
    }, [])
    
    return (
        <div className={`rounded-lg shadow-md w-full max-w-md flex justify-center items-center py-[0.2%] relative overflow-hidden`}>
            <div id='spinlight' className='w-full h-full absolute flex justify-center items-center'>
                <div className='fan w-3/12 h-full rotate-90 bg-red-500 absolute scale-150'></div>
                <div className='fan fan2 w-3/12 h-full bg-blue-500 absolute scale-150' ></div>
            </div>
            <div className='w-[98.6%] relative z-30'>
                {children}
            </div>
        </div>
    )
}

export default BlackHole