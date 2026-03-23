import axios from "../lib/axios";
import { create } from "zustand";

export const analyticsStore = create((set, get) => ({
    products: 0,
    totalSales: 0,
    users: 0,
    totalRevenue: 0,
    dailySalesData: null,

    getTotalProduct: async () => {
        try {
            await axios.get("/anlytics/")
                .then(res => {
                    const { users, products, totalRevenue, totalSales } = res.data?.analyticsData;
                    set({ totalRevenue, totalSales, users, products, dailySalesData: res.data?.dailySalesData });
                })
        } catch (error) {
            console.log(error.response.data.message || error.message)
        }
    }

}));