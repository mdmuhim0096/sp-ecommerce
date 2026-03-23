import { useEffect } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import Navbar from "../components/Navbar";
import ProductHub from "../components/ProductHub";
import ShippingSection from "../components/ShippingSection"
import TestimonialsSection from "../components/TestimonialsSection";
import { useCategoryStore } from "../store/category";
import Footer from "../components/Footer";

const HomePage = () => {
    const { getCatgory } = useCategoryStore();

    const getData = async () => {
        await getCatgory();
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="w-full h-auto" >
            <Navbar />
            <ProductHub />
            <FeaturedProducts />
            <ShippingSection />
            <TestimonialsSection />
            <Footer />
        </div>
    )
};

export default HomePage;