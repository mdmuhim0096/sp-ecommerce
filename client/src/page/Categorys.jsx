import { useState } from 'react';
import { useCategoryStore } from "../store/category";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Categorys = () => {
    const { category } = useCategoryStore();

    const [slice, setSlice] = useState(6);

    function handelSlice() {
        const nextSlice = slice + 3;

        if (nextSlice >= category?.length) {
            setSlice(category?.length);
        } else {
            setSlice(nextSlice);
        }
    }
    return (
        <div className="h-auto flex flex-col" id="productHub">
            <Navbar />
            <div className="w-full h-64 sm:h-80 flex justify-center items-center">
                <h1
                    style={{
                        textShadow:
                            "2px 2px 20px rgba(255,255,255,0.3), 2px 2px 30px rgba(255,255,255,0.4)",
                    }}
                    className="w-10/12 sm:w-7/12 text-center text-3xl sm:text-4xl md:text-5xl text-zinc-300 font-bold"
                >
                    Categorys
                </h1>
            </div>

            <div className="w-full flex flex-wrap gap-4 justify-center">
                {category?.slice(0, slice).map((data, index) => (
                    <Link
                        to={"/category/" + data?.name.toLowerCase()}
                        key={index}
                        className="w-full h-80 sm:w-[48%] lg:w-[32%] overflow-hidden rounded-md relative transition-all duration-300 opacity-65 hover:opacity-100"
                    >
                        <img
                            src={data.image}
                            alt="category image"
                            className="w-full h-full transition-all duration-300 hover:scale-125"
                        />
                        <h1 className="absolute bottom-5 left-3 text-white text-2xl font-bold">
                            {data.name}
                        </h1>
                    </Link>
                ))}
            </div>

            {slice < category?.length && (
                <button
                    onClick={handelSlice}
                    className="mx-auto text-white px-3 py-1 rounded-lg my-5 bg-emerald-600"
                >
                    Load more
                </button>
            )}
            <div className='mt-20'>
                <Footer />
            </div>
        </div>
    )
}

export default Categorys