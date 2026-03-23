import { useEffect } from 'react';
import { productStore } from "../store/product";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const Shope = () => {
    const { allProducts, product } = productStore();

    useEffect(() => {
        allProducts();
    }, []);

    const groupedByCategory = product?.reduce((acc, item) => {
        const category = item.category;

        if (!acc[category]) {
            acc[category] = [];
        }

        acc[category].push(item);

        return acc;
    }, {}) || {};

    const Product = () => {
        return Object.keys(groupedByCategory).map((category) => (
            <div key={category} className='px-4 mt-16'>
                <h2 className='text-white my-3 text-xl capitalize font-bold'>{category}</h2>
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-10 md:mt-0" >
                    {groupedByCategory[category].map((item) => (
                        <ProductCard key={item._id} product={item} />
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <div className='w-full'>
            <Navbar />

            {/* Title */}
            <div className="text-center mb-12">
                <h1
                    style={{
                        textShadow:
                            "2px 2px 20px rgba(255,255,255,0.3), 2px 2px 30px rgba(255,255,255,0.4)",
                    }}
                    className="w-10/12 sm:w-7/12 text-center text-3xl sm:text-4xl md:text-5xl text-zinc-300 font-bold my-10 mt-7 mx-auto"
                >
                    Shope
                </h1>

                <p className="text-gray-400">Here you can shopping various products together.</p>
            </div>

            <div>
                {<Product />}
            </div>

            <Footer />
        </div>
    );
};

export default Shope;