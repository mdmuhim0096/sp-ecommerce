import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Shield, FileText, ShoppingBag, CreditCard, Send, Home, Store, Grid, ShoppingCart, Headphones, Link as LinkIcon, Info } from "lucide-react";
import { toast } from "react-hot-toast"
import { useState } from "react";
import axios from "../lib/axios";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {

        if (!email) toast.error("Please enter a valid email");
        axios.post("/subscribe", { email })
            .then((res) => {
                toast.success(res.data.message);
                setEmail("");
            })
            .catch((err) => {
                const message = err.response?.data?.message;
                toast.error(message);
            });
    };

    return (
        <footer className="w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-gray-300 pt-16 pb-8 px-6 relative">

            <div className="max-w-7xl mx-auto">

                {/* Top Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                    {/* Brand Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <ShoppingBag size={30} className="text-blue-500" />
                            <h1 className="text-3xl font-bold text-white">Shopora</h1>
                        </div>

                        <p className="text-sm text-gray-400 leading-relaxed">
                            Your trusted marketplace delivering premium products with secure
                            payment and fast shipping worldwide.
                        </p>

                        {/* Social */}
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram].map((Icon, index) => (
                                <a
                                    key={index}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-blue-600 transition duration-300 cursor-pointer"
                                    href={index === 0 ? "https://www.facebook.com/md.muhim.islam.414663" : ""}
                                    target="_blank"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <LinkIcon size={18} className="text-blue-500" />
                            Quick Links
                        </h4>

                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link to="/" className="flex items-center gap-2 hover:text-blue-500 transition">
                                    <Home size={16} /> Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/shope" className="flex items-center gap-2 hover:text-blue-500 transition">
                                    <Store size={16} /> Shop
                                </Link>
                            </li>
                            <li>
                                <Link to="/categorys" className="flex items-center gap-2 hover:text-blue-500 transition">
                                    <Grid size={16} /> Categories
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="flex items-center gap-2 hover:text-blue-500 transition">
                                    <ShoppingCart size={16} /> Cart
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="flex items-center gap-2 hover:text-blue-500 transition">
                                    <Headphones size={16} /> Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Info size={18} className="text-blue-500" />
                            Support
                        </h4>

                        <ul className="space-y-4 text-sm">
                            <Link to={"/policy"} className="flex items-center gap-2 hover:text-blue-500 transition">
                                <Shield size={16} /> Privacy Policy
                            </Link>
                            <Link to={"/termsofservice"} className="flex items-center gap-2 hover:text-blue-500 transition">
                                <FileText size={16} /> Terms of Service
                            </Link>
                            <li className="flex items-center gap-2">
                                <Phone size={16} /> +002 123 456 789
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} /> shopora@email.com
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin size={16} /> Dhaka, Bangladesh
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Send size={18} className="text-blue-500" />
                            Newsletter
                        </h4>

                        <p className="text-sm text-gray-400 mb-4">
                            Subscribe to get latest offers & updates.
                        </p>

                        <div className="flex bg-zinc-800 rounded-lg overflow-hidden">
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="bg-transparent px-4 py-2 w-full outline-none text-sm"
                            />
                            <button
                                className="bg-blue-600 hover:bg-blue-700 px-4 flex items-center justify-center transition"
                                onClick={() => { handleSubscribe(); }}
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-zinc-800 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Payment */}
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                        <CreditCard size={18} />
                        <span>Visa</span>
                        <span>Mastercard</span>
                        <span>Stripe</span>
                    </div>

                    {/* Copyright */}
                    <div className="text-sm text-gray-500 text-center">
                        © 2026 <span className="text-white font-medium">Shopora</span>. All rights reserved.
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;