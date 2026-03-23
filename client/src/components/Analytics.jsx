import React, { useEffect } from 'react';
import { analyticsStore } from '../store/analytics';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const Analytics = () => {
    const { getTotalProduct, products, totalRevenue, totalSales, users, dailySalesData } = analyticsStore();

    useEffect(() => {
        getTotalProduct();
    }, [getTotalProduct]);

    // ✅ Tabs data
    const tabs = [
        { title: "products", value: products ?? 0, color: "border-green-500" },
        { title: "sales", value: totalSales ?? 0, color: "border-rose-500" },
        { title: "revenue", value: totalRevenue ?? 0, color: "border-sky-500" },
        { title: "users", value: users ?? 0, color: "border-violet-600" },
    ];

    // ✅ Ensure dailySalesData is a valid array
    const chartData = Array.isArray(dailySalesData)
        ? dailySalesData.map(item => ({
            date: item.date || "Unknown",
            sales: Number(item.sales) || 0,
            revenue: Number(item.revenue) || 0,
        }))
        : [];

    console.log(chartData);

    return (
        <div className='text-white w-full'>
            {/* Summary Tabs */}
            <div className='w-full sm:w-7/12 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4'>
                {tabs.map((data, index) => (
                    <div
                        key={index}
                        className={`h-auto w-full flex flex-col items-center justify-center border-s-4 ${data.color} rounded-md bg-zinc-800 py-2`}
                    >
                        <span className='capitalize text-sm sm:text-base'>{data.title}</span>
                        <span className='font-semibold'>{data.value}</span>
                    </div>
                ))}
            </div>

            {/* Sales & Revenue Chart */}
            <div className="w-full h-[400px] mt-5">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} className='w-full p-0'>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" stroke="#D1D5DB" tick={{ fontSize: 12 }} />
                        <YAxis yAxisId="left" stroke="#10B981" />
                        <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#111827", border: "none" }}
                            labelStyle={{ color: "#D1D5DB" }}
                        />
                        <Legend />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="sales"
                            stroke="#10B981"
                            activeDot={{ r: 8 }}
                            name="Sales"
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3B82F6"
                            activeDot={{ r: 8 }}
                            name="Revenue"
                        />
                    </LineChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
};

export default Analytics;
