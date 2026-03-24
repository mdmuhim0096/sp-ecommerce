import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { X, MoveRight } from "lucide-react";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { userStore } from "../store/user";
import { orderStore } from "../store/order";
import { cartStore } from "../store/cart";
import { useEffect } from "react";

const PurchaseCancel = () => {
    const { orderId, hasOrderId } = userStore();
    const { deleteOrder } = orderStore();
    const { clearCart } = cartStore();

    useEffect(() => {
        if (orderId !== null) {
            async function handelDeleteOrder(id) {
                await deleteOrder(id);
                await hasOrderId(false);
                await clearCart();
            };
            handelDeleteOrder(orderId);
        }
    }, [orderId]);

    return (
        <div>
            <Navbar />
            <div className='w-full h-screen flex flex-col justify-center items-center'>

                <motion.div
                    className='w-24 h-24 border-4 border-red-600 rounded-full flex justify-center items-center text-red-600'
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 4, type: "spring", stiffness: 300 }}
                >
                    <X size={50} />
                </motion.div>
                <h1
                    style={{
                        textShadow:
                            "2px 2px 20px rgba(255, 255, 255, 0.3), 2px 2px 30px rgba(255, 255, 255, 0.4)"
                    }}
                    className="text-center my-5 font-bold text-xl text-white"
                >
                    !Oops i think something's wrong
                </h1>
                <div className="w-full text-center transition-all duration-200 hover:text-emerald-300 text-emerald-500">
                    <Link to={"/"}>
                        Continue Shopping <MoveRight className="inline" />
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PurchaseCancel