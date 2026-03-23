import { Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'


const CuponCard = ({ code, useCupon }) => {
    const [cupon, setCupon] = useState();

    const handelCupon = () => {
        if (typeof useCupon === "function") {
            useCupon(code?.code);
        }
    }

    useEffect(() => {
        if (code?.code) {
            setCupon(code?.code);
        }
    }, [code])

    return (
        <div className='w-full h-auto rounded-lg bg-zinc-800 my-5 p-4'>
            <h1
                style={{
                    textShadow:
                        "2px 2px 20px rgba(255, 255, 255, 0.3), 2px 2px 30px rgba(255, 255, 255, 0.4)"
                }}
                className="text-center my-3 font-bold text-xl"
            >
                Cupon Code
            </h1>
            <h1>
                <span>Code: {code?.code}</span>
                <Copy
                    className='inline cursor-pointer mx-4'
                    size={19}
                    onClick={() => {
                        navigator.clipboard.writeText(code?.code);
                        toast.success("copied");
                    }}
                />
            </h1>
            <input
                type="text"
                value={cupon}
                onChange={e => setCupon(e.target.value)}
                className='rounded-sm bg-transparent focus:outline-none border border-zinc-700 px-2 my-3'
            />

            <h1>
                <span>Discount: {code?.discountPercentage}%</span>
            </h1>

            <button
                className="px-2 py-1 rounded-md w-full bg-emerald-600 my-3"
                onClick={() => { handelCupon() }}
            >
                Use cupon
            </button>

        </div>
    )
}

export default CuponCard;