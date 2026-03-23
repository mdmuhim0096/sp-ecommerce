import { Loader } from "lucide-react";
import { useEffect } from "react";

const Proccess = () => {
    let counter = 0, isInternetError = false;

    let interval = setInterval(() => {
        counter++;
    }, 1000);


    useEffect(() => {
        if (counter >= 120) {
            clearInterval(interval);
            isInternetError = true;
        }
    }, [counter]);
    return (
        <div className='w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center bganimate'>
            {!isInternetError ? <h1>
                <Loader className="inline-block mx-3 spin-animate" />
                <span>processing...</span>
            </h1> : <h1>
                <span>Internet Error</span>
            </h1>}
        </div>
    )
}

export default Proccess