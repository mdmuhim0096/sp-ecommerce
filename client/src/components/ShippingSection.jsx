import { Truck, ShieldCheck, RefreshCcw, Headphones } from "lucide-react";

const ShippingSection = () => {
    
    const items = [
        {
            icon: <Truck size={32} />,
            title: "Free Shipping",
            desc: "Free shipping on all orders over $50",
        },
        {
            icon: <ShieldCheck size={32} />,
            title: "Secure Payment",
            desc: "Your payment information is safe with us",
        },
        {
            icon: <RefreshCcw size={32} />,
            title: "Easy Returns",
            desc: "30 days return policy for all products",
        },
        {
            icon: <Headphones size={32} />,
            title: "24/7 Support",
            desc: "Our team is here to help anytime",
        },
    ];

    return (
        <section className="w-full py-12 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1
                        style={{
                            textShadow:
                                "2px 2px 20px rgba(255,255,255,0.3), 2px 2px 30px rgba(255,255,255,0.4)",
                        }}
                        className="w-10/12 sm:w-7/12 text-center text-3xl sm:text-4xl md:text-5xl text-zinc-300 font-bold my-10 mt-7 mx-auto "
                    >
                        Why Shop With Us
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Fast delivery, secure payment and best support
                    </p>
                </div>

                {/* Grid */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="bg-zinc-800 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
                        >
                            <div className="text-indigo-300 mb-4">{item.icon}</div>

                            <h3 className="text-lg font-semibold text-gray-400">
                                {item.title}
                            </h3>

                            <p className="text-sm text-blue-500 mt-2">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ShippingSection;
