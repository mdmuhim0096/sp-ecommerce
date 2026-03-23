import axios from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const cartStore = create((set, get) => ({
    cart: [],
    cupon: null,
    total: 0,
    subtotal: 0,
    isCouponApplied: false,

    addToCart: async (productId) => {
        try {
            await axios.post("/cart/addtocart", { productId })
                .then(res => {
                    toast.success("product added");
                    console.log(res.data);
                    set({ cart: res.data });
                    get().totalSum();
                })
        } catch (error) {
            console.log(error);
            toast.error(error.message || "fail to add");
        }
    },

    getAllProduct: async () => {
        try {
            await axios.get("/cart/getAllProduct")
                .then(res => {
                    set({ cart: res.data || [] })
                })
        } catch (error) {
            console.log(error.message || "function's problem")
        }
    },

    updateQuantity: async (productId, quantity, type) => {
        try {
            await axios.put("/cart/updatequantity", { quantity, productId, type })
                .then(res => {
                    toast.success(`${type === "increament" ? "added" : quantity === 1 && type === "decreament" ? "delete" : "remove"} another one`);
                });
        } catch (error) {
            console.log(error.message || "function's problem")
        }
    },

    getCupon: async () => {
        try {
            await axios.get("/cupon/getcupon")
                .then(res => {
                    set({ cupon: res.data });
                })
        } catch (error) {
            console.log(error.response.data.message || error.message);
        }
    },

    useCupon: async (code) => {
        try {
            await axios.post("/cupon/validatecupon", { code })
                .then(res => {
                    set({ cupon: res.data });
                    get().totalSum();
                });

        } catch (error) {
            console.log(error.response.data.message || error.message);
        }
    },

    totalSum: () => {
        const { cupon, cart } = get();
        const subtotal = cart?.reduce((sum, item) => +sum + +item?.price * +item?.quantity, 0);
        let total = +subtotal;
        if (cupon) {
            const discount = +subtotal * (+cupon.discountPercentage / 100);
            total = +subtotal - +discount;
        }
        set({ total: +total.toFixed(2), subtotal: +subtotal });
    },

    clearCart: async () => {
        try {
            await axios.delete("/cart/cleanuseritems")
                .then(res => {
                    toast.success(res.data.message);
                    set({ cart: res.data.items || [] })
                })
        } catch (error) {
            console.log(error.response.data.message || error.message);
        }
    }

}));