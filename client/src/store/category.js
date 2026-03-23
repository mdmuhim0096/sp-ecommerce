import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCategoryStore = create((set, get) => ({
    loading: false,
    category: [],

    createCategory: async (data) => {
        try {
            set({ loading: true });

            const fd = new FormData();
            fd.append("image", data.image);
            fd.append("name", data.name);

            await axios.post("/category/create", fd, { headers: { "Content-Type": "multipart/form-data" } })
                .then(res => {
                    set({ loading: false, category: res.data?.category });
                    toast.success("created");
                }).catch(err => {
                    set({ loading: false });
                    toast.error("server error");
                    console.log(err);
                })
        } catch (error) {
            set({ loading: false });
            console.log(error);
             toast.error(error.message);
        }
    },

    getCatgory: async () => {
        try {
            set({ loading: true });
            await axios.get("/category/get")
                .then(res => {
                    set({ loading: false, category: res.data });
                }).catch(err => {
                    set({ loading: false });
                })
        } catch (error) {
            set({ loading: false });
            console.log(error)
        }
    }

}));