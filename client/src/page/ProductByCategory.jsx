import { useParams } from "react-router-dom"
import { productStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import { ChevronLeft } from "lucide-react";
import Footer from "../components/Footer";

const ProductByCategory = () => {
    const { getProductByCategory, product } = productStore();
    const { category } = useParams();

    useEffect(() => {
        getProductByCategory(category);
    }, [category]);

    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full h-20 sm:h-48 flex justify-center items-center relative">
                <ChevronLeft className="absolute left-[0.5%] top-[50.5%] w-6 h-6 text-zinc-300 hover:text-white cursor-pointer" onClick={() => window.history.back()} />
                <h1
                    style={{ textShadow: "2px 2px 20px rgba(255, 255, 255, 0.3), 2px 2px 30px rgba(255, 255, 255, 0.4)" }}
                    className="text-center text-3xl sm:text-4xl text-zinc-300 font-bold my-2 mt-7 capitalize">
                    {category}
                </h1>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-10 md:mt-0" >
                {
                    product?.map((data, index) => (
                        <ProductCard product={data} key={index} />
                    ))
                }
            </div>
            <Footer />
        </div>
    )
}

export default ProductByCategory