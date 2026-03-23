import { Minus, Plus } from "lucide-react";
import { cartStore } from "../store/cart";

const CartItem = ({ product }) => {
    const { updateQuantity, getAllProduct, totalSum } = cartStore();

    const updateQquantiry = (productId, quantity, type) => {
        getAllProduct();
        updateQuantity(productId, quantity, type);
        getAllProduct();
        setTimeout(() => {
            totalSum();
        }, 500);
    }

    return (
        <div className='w-full my-5'>
            <div className="w-full bg-zinc-800 h-auto flex flex-col md:flex-row md:justify-between md:items-satrt gap-3 rounded-lg p-4">
                <img
                    src={product?.image}
                    alt="product image"
                    className="w-full md:w-6/12 h-56 rounded-lg"
                />
                <div className="w-full relative">
                    <div className="w-full h-auto flex flex-col md:flex-row justify-between">
                        <div>
                            <h1
                                style={{ textShadow: "2px 2px 20px rgba(255, 255, 255, 0.3), 2px 2px 30px rgba(255, 255, 255, 0.4)" }}
                                className="text-3xl"
                            >{product?.name}</h1>
                            <h1>item{product?.quantity > 1 ? "s" : ""} {product?.quantity}</h1>
                            <strong>
                                <i>${product?.price}</i>
                            </strong>
                        </div>
                        <div className="w-3/12 flex flex-col gap-3 items-center">
                            <h5 className="text-white w-16 border border-zinc-600 rounded-md text-center">{product?.quantity}</h5>
                            <div className="flex justify-between gap-7">
                                <Plus
                                    size={18}
                                    className="cursor-pointer"
                                    onClick={() => { updateQquantiry(product?._id, product?.quantity, "increament") }}
                                />
                                <Minus
                                    size={18}
                                    className="cursor-pointer"
                                    onClick={() => { updateQquantiry(product?._id, product?.quantity, "decreament") }}
                                />
                            </div>
                        </div>
                    </div>
                    <p
                        className={`border-zinc-700 ${product?.description?.length < 201 ? "mt-4" : "md:absolute"} bottom-0 overflow-y-auto h-auto md:h-[120px]`}
                    >{product?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default CartItem;