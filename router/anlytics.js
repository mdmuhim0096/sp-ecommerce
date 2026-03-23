const User = require("../schemas/user");
const Order = require("../schemas/order");
const Product = require("../schemas/product");
const route = require("express").Router();

// ✅ Analytics route
route.get("/", async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData();

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 7); // last 7 days

        const dailySalesData = await getDailySalesData(startDate, endDate);

        res.json({ analyticsData, dailySalesData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error in analytics router" });
    }
});

// ✅ Helper: Daily Sales Data
async function getDailySalesData(startDate, endDate) {
    try {
        const dailySalesData = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    sales: { $sum: 1 },
                    revenue: { $sum: "$totalAmount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);


        // fill in missing days
        const dateArray = getDatesInRange(startDate, endDate);

        return dateArray.map(date => {
            const found = dailySalesData.find(item => item._id === date);
            return {
                date,
                sales: found?.sales || 0,
                revenue: found?.revenue || 0
            };
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// ✅ Helper: Generate all dates between range
function getDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

// ✅ Helper: Total analytics
async function getAnalyticsData() {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();

        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: 1 },
                    totalRevenue: { $sum: "$totalAmount" }
                }
            }
        ]);

        const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 };

        return {
            users: totalUsers,
            products: totalProducts,
            totalSales,
            totalRevenue
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = route;
