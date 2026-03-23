import { ShoppingCart } from "lucide-react";
import { cartStore } from "../store/cart";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const { addToCart } = cartStore();
    const navigate = useNavigate();

    function addproduct() {
        addToCart(product._id);
    }

    function viewDetails() {
        navigate("/product-details", { state: { product } });
    }

    const width = window.innerWidth;
    return (
        <div
            title="click to see details"
            className='w-[48.5%] md:w-[32%] lg:w-[23%] h-auto rounded-md p-[2.3px] relative flex justify-center items-center overflow-hidden cursor-pointer'>
            <div className="bg-gradient-to-b from-violet-800 to-emerald-800 w-full h-full absolute "></div>
            <div className="w-full p-1 sm:p-3 rounded-md relative z-20 bg-zinc-900">
                <img
                    src={product.image}
                    alt="product image"
                    className='w-full h-[125px] sm:h-[200px] rounded-sm'
                    onClick={() => { viewDetails(); }}
                />
                <div className=''>
                    <div className='flex justify-between text-zinc-300 text-sm sm:text-[18px] mt-2'>
                        <h5>{product.name}</h5>
                        <h6>${product.price}</h6>
                    </div>
                    <button className="w-full mt-3 sm:mt-4 flex justify-center gap-2 items-center border border-zinc-800 mx-auto rounded-sm text-zinc-400 sm:py-1 hover:text-zinc-200 hover:bg-zinc-800"
                        onClick={() => { addproduct() }}
                    >
                        <ShoppingCart size={width < 425 ? 16 : width >= 425 && width < 768 ? 19 : 23} />
                        <span>Add to cart</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;