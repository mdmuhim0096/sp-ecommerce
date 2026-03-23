import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const orderStore = create((set, get) => ({
    order: [],
    counter: 0,
    loading: false,

    getOrder: async () => {
        try {
            await axios.get("/order/").then(res => {
                set({ order: res.data || [] });
            });
        } catch (error) {
            toast.error(error.response.data.message || error.message);
        }
    },

    getCount: async () => {
        try {
            await axios.get("/order/counter").then(res => {
                set({ counter: res.data || 0 });
            });
        } catch (error) {
            toast.error(error.response.data.message || error.message);
        }
    },

    rejectOrder: async (id) => {
        try {
            await axios.put(`/order/reject/${id}`).then(() => {
                get().getOrder();
                toast.success("Order rejected successfully");
            });
        } catch (error) {
            toast.error(error.response.data.message || error.message);
        }
    },

    deleteOrder: async (id) => {
        try {
            await axios.delete(`/order/${id}`).then(() => {
                const updatedOrders = get().order.filter(order => order._id !== id);
                set({ order: updatedOrders });
                toast.success("Order rejected successfully");
            });
        } catch (error) {
            toast.error(error.response.data.message || error.message);
        }
    },

    makeApproved: async (id) => {
        try {
            await axios.put(`/order/approved/${id}`).then(() => {
                get().getOrder();
                toast.success("Order Approved successfully");
            });
        } catch (error) {
            toast.error(error.response.data.message || error.message);
        }
    },

    makeDeliverd: async (id) => {
        try {
            set({ loading: true });
            await axios.put(`/order/isdeliverd/${id}`).then(() => {
                get().getOrderById(id);
                toast.success("Order Deliverd successfully");
                set({ loading: false });
            }).catch(e => {
                set({ loading: false });
                toast.error(e.response.data.message || "faild to confirm");
            })
        } catch (error) {
            toast.error(error.response.data.message || error.message);
        }
    },

    getOrderById: async (id) => {
        try {
            await axios.get(`/order/getOrderById/${id}`).then(res => {
                set({ order: res.data });
            });
        } catch (error) {
            toast.error(error.response.data.message || error.message);
        }
    },

}))