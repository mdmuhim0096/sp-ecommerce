import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <section className="w-full h-auto">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-16">

                {/* Title */}
                <div className="text-center mb-12">
                    <h1 style={{
                        textShadow:
                            "2px 2px 20px rgba(255,255,255,0.3), 2px 2px 30px rgba(255,255,255,0.4)",
                    }}
                        className="w-10/12 sm:w-7/12 text-center text-3xl sm:text-4xl md:text-5xl text-zinc-300 font-bold my-10 mt-7 mx-auto ">Contact Us</h1>
                    <p className="text-gray-400 mt-2">
                        We'd love to hear from you. Send us a message anytime.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">

                    {/* Contact Info */}
                    <div className="space-y-6">

                        <div className="flex items-start gap-4">
                            <MapPin className="text-indigo-600" size={28} />
                            <div>
                                <h3 className="font-semibold text-lg text-white">Address</h3>
                                <p className="text-gray-400">
                                    123 E-commerce Street, Dhaka, Bangladesh
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="text-indigo-600" size={28} />
                            <div>
                                <h3 className="font-semibold text-lg text-white">Phone</h3>
                                <p className="text-gray-400">+880 1234 567 890</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Mail className="text-indigo-600" size={28} />
                            <div>
                                <h3 className="font-semibold text-lg text-white">Email</h3>
                                <p className="text-gray-400">support@shop.com</p>
                            </div>
                        </div>

                    </div>

                    {/* Contact Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-zinc-800 shadow-sm rounded-xl p-8 space-y-6"
                    >

                        <div>
                            <label className="block text-sm font-medium mb-2 text-white">
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border-2 border-zinc-700 bg-transparent rounded-lg px-4 py-3 focus:outline-none  focus:border-indigo-500"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-white">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border-2 border-zinc-700 bg-transparent rounded-lg px-4 py-3 focus:outline-none  focus:border-indigo-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-white">
                                Message
                            </label>
                            <textarea
                                rows="5"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                className="w-full border-2 border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 bg-transparent"
                                placeholder="Write your message"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
                        >
                            <Send size={18} />
                            Send Message
                        </button>

                    </form>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default ContactPage;
