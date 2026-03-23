import { MoveRight, ShoppingCart } from "lucide-react";
import { cartStore } from '../store/cart';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import CartItem from "../components/CartItem";
import OrederSummry from "../components/OrderSummry";
import CuponCard from "../components/CuponCard";
import { useEffect } from "react";
import Footer from '../components/Footer';

const CartPage = () => {
    
    const { cart, cupon, useCupon, getCupon } = cartStore();

    useEffect(() => { getCupon(); }, []);

    return (
        <div className='text-white w-full relative'>
            <Navbar />
            {
                cart?.length == 0 ? <div className='flex flex-col justify-center items-center w-full h-[90vh]'>
                    <div className='flex items-center'>
                        <ShoppingCart size={40} />
                        <span
                            style={{ textShadow: "2px 2px 20px rgba(255, 255, 255, 0.3), 2px 2px 30px rgba(255, 255, 255, 0.4)" }}
                            className='text-3xl mx-2 font-semibold'
                        >Cart is Empty</span>
                    </div>
                    <Link to={"/"}
                        className='my-5 flex items-center justify-center gap-1'
                    >
                        <h4>Continue Shopping</h4>
                        <MoveRight size={24} className='mt-[0.4rem]' />
                    </Link>
                </div> : <div className="flex flex-col md:flex-row justify-between gap-3">
                    <div className="w-full md:w-7/12">
                        {
                            cart?.map((product, index) => (
                                <CartItem key={index} product={product} />
                            ))
                        }
                    </div>
                    <div className="w-full md:w-5/12">
                        <div className="md:sticky top-[4.3rem]">
                            <OrederSummry />
                            <CuponCard code={cupon} useCupon={useCupon} />
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </div>
    )
}

export default CartPage;