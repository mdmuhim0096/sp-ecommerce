import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const productStore = create((set, get) => ({
    loading: false,
    product: [],
    featuredProducts: [],

    createProduct: async (data) => {
        try {
            set({ loading: true });
            const fd = new FormData();
            fd.append("name", data.name);
            fd.append("description", data.description);
            fd.append("category", data.category);
            fd.append("price", data.price);
            fd.append("image", data.image);

            await axios.post("/product/create", fd, {
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(res => {
                    toast.success(res.data?.message || "Product created successfully!");
                    set({ loading: false });
                }).catch(err => {
                    set({ loading: false });
                    toast.error(err.response?.data?.message || "server error");
                })

        } catch (err) {
            console.error(err.response?.data || err);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    },

    getProductByCategory: async (category) => {
        try {
            await axios.get(`/product/getproductbycategory/${category}`)
                .then(res => {
                    set({ product: res.data });
                })
        } catch (error) {
            toast.error(error.message || "fail to fetch product");
        }
    },

    allProducts: async () => {
        try {
            await axios.get("/product/allproduct")
                .then(res => {
                    set({ product: res.data || [] });
                })
        } catch (error) {
            console.log(error.response.data.message || error.message);
        }
    },

    getFeaturedProducts: async () => {
        try {
            axios.get("/product/featured_products")
                .then(res => {
                    set({ featuredProducts: res.data || [] });
                });
        } catch (error) {
            console.log(error.response.data.message || error.message);
        }
    },

    toggleFeatured: async (id) => {
        try {
            axios.put(`/product/isFeatured/${id}`)
                .then(res => {
                    set({ featuredProducts: res.date || [] });
                    get().allProducts();
                })
        } catch (error) {
            console.log(error.response.data.message || error.message);
        }
    },

    deleteProduct: async (id) => {
        try {
            axios.delete(`/product/delete/${id}`)
                .then(res => {
                    toast.success(res.data.message);
                    get().allProducts();
                })
        } catch (error) {
            console.log(error.response.data.message || error.message);
        }
    },

    rating: async (data) => {
        try {
            set({ loading: true });
            axios.put('/product/rating', data)
                .then(res => {
                    toast.success(res.data.message);
                    get().allProducts();
                    set({ loading: false });
                })
        } catch (error) {
            set({ loading: false });
            console.log(error.response.data.message || error.message);
        }
    },

    review: async (data) => {
        try {
          
            set({ loading: true });

            axios.put('/product/review', data)
                .then(res => {
                    toast.success(res.data.message);
                    get().allProducts();
                    set({ loading: false });
                });

        } catch (error) {
            set({ loading: false });
            console.log(error.response.data.message || error.message);
        }
    }

}))