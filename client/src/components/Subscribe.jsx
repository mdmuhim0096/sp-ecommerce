import React from 'react'

const Subscribe = () => {
    return (
        <div className='w-full h-auto'>
            <h1
                style={{
                    textShadow:
                        "2px 2px 20px rgba(255, 255, 255, 0.3), 2px 2px 30px rgba(255, 255, 255, 0.4)",
                }}
                className="w-full text-center text-3xl sm:text-4xl md:text-5xl text-zinc-300 font-bold my-2 mt-7"
            >
                Subscribe to get update about
            </h1>
            <h1
                style={{
                    textShadow:
                        "2px 2px 20px rgba(255, 255, 255, 0.3), 2px 2px 30px rgba(255, 255, 255, 0.4)",
                }}
                className="w-full text-center text-3xl sm:text-4xl md:text-5xl text-zinc-300 font-bold my-2 mt-7"
            >
                for new products and offers!
            </h1>
            <div className='w-full h-52 flex flex-col md:flex-row items-center justify-center mt-16'>
                <h1 className='text-white w-[40%] text-center text-xl' >To subscribe by email</h1>
                <div className='w-full md:w-[60%] h-full flex justify-between md:justify-start items-center md:gap-2 gap-1 p-5'>
                    <input
                        type="text"
                        className='w-full md:w-[50%] outline-none p-1 md:p-2 rounded-s-md md:rounded-s-xl placeholder:text-sm md:placeholder:text-base pl-2'
                        placeholder='Email'
                    />
                    <button className='text-white w-[30%] outline-none p-1 md:p-2 rounded-e-md md:rounded-e-xl bg-rose-500 text-base notranslate'>subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default Subscribe