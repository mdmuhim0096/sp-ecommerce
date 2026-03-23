
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, LogOut, ShoppingCart, Menu, X, ScrollText, House, User } from "lucide-react";
import { userStore } from "../store/user";
import { cartStore } from "../store/cart";
import { orderStore } from "../store/order";
import { changeGoogleLanguage, getCurrentGoogleLanguage } from "../lib/Translate";

const Navbar = () => {

    const { user, logout } = userStore();
    const { cart, getAllProduct } = cartStore();
    const { getCount, counter } = orderStore();

    const [isMenu, setIsMenu] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const [selectedLanguage, setSelectedLanguage] = useState("en");

    const languages = [
        { name: "Afrikaans", code: "af" },
        { name: "Albanian", code: "sq" },
        { name: "Amharic", code: "am" },
        { name: "Arabic", code: "ar" },
        { name: "Armenian", code: "hy" },
        { name: "Azerbaijani", code: "az" },
        { name: "Basque", code: "eu" },
        { name: "Belarusian", code: "be" },
        { name: "Bengali", code: "bn" },
        { name: "Bosnian", code: "bs" },
        { name: "Bulgarian", code: "bg" },
        { name: "Catalan", code: "ca" },
        { name: "Cebuano", code: "ceb" },
        { name: "Chinese (Simplified)", code: "zh-CN" },
        { name: "Chinese (Traditional)", code: "zh-TW" },
        { name: "Corsican", code: "co" },
        { name: "Croatian", code: "hr" },
        { name: "Czech", code: "cs" },
        { name: "Danish", code: "da" },
        { name: "Dutch", code: "nl" },
        { name: "English", code: "en" },
        { name: "Esperanto", code: "eo" },
        { name: "Estonian", code: "et" },
        { name: "Finnish", code: "fi" },
        { name: "French", code: "fr" },
        { name: "Frisian", code: "fy" },
        { name: "Galician", code: "gl" },
        { name: "Georgian", code: "ka" },
        { name: "German", code: "de" },
        { name: "Greek", code: "el" },
        { name: "Gujarati", code: "gu" },
        { name: "Haitian Creole", code: "ht" },
        { name: "Hausa", code: "ha" },
        { name: "Hawaiian", code: "haw" },
        { name: "Hebrew", code: "he" },
        { name: "Hindi", code: "hi" },
        { name: "Hmong", code: "hmn" },
        { name: "Hungarian", code: "hu" },
        { name: "Icelandic", code: "is" },
        { name: "Igbo", code: "ig" },
        { name: "Indonesian", code: "id" },
        { name: "Irish", code: "ga" },
        { name: "Italian", code: "it" },
        { name: "Japanese", code: "ja" },
        { name: "Javanese", code: "jv" },
        { name: "Kannada", code: "kn" },
        { name: "Kazakh", code: "kk" },
        { name: "Khmer", code: "km" },
        { name: "Kinyarwanda", code: "rw" },
        { name: "Korean", code: "ko" },
        { name: "Kurdish (Kurmanji)", code: "ku" },
        { name: "Kyrgyz", code: "ky" },
        { name: "Lao", code: "lo" },
        { name: "Latin", code: "la" },
        { name: "Latvian", code: "lv" },
        { name: "Lithuanian", code: "lt" },
        { name: "Luxembourgish", code: "lb" },
        { name: "Macedonian", code: "mk" },
        { name: "Malagasy", code: "mg" },
        { name: "Malay", code: "ms" },
        { name: "Malayalam", code: "ml" },
        { name: "Maltese", code: "mt" },
        { name: "Maori", code: "mi" },
        { name: "Marathi", code: "mr" },
        { name: "Mongolian", code: "mn" },
        { name: "Myanmar (Burmese)", code: "my" },
        { name: "Nepali", code: "ne" },
        { name: "Norwegian", code: "no" },
        { name: "Nyanja", code: "ny" },
        { name: "Odia (Oriya)", code: "or" },
        { name: "Pashto", code: "ps" },
        { name: "Persian", code: "fa" },
        { name: "Polish", code: "pl" },
        { name: "Portuguese", code: "pt" },
        { name: "Punjabi", code: "pa" },
        { name: "Romanian", code: "ro" },
        { name: "Russian", code: "ru" },
        { name: "Samoan", code: "sm" },
        { name: "Scots Gaelic", code: "gd" },
        { name: "Serbian", code: "sr" },
        { name: "Sesotho", code: "st" },
        { name: "Shona", code: "sn" },
        { name: "Sindhi", code: "sd" },
        { name: "Sinhala", code: "si" },
        { name: "Slovak", code: "sk" },
        { name: "Slovenian", code: "sl" },
        { name: "Somali", code: "so" },
        { name: "Spanish", code: "es" },
        { name: "Sundanese", code: "su" },
        { name: "Swahili", code: "sw" },
        { name: "Swedish", code: "sv" },
        { name: "Tagalog (Filipino)", code: "tl" },
        { name: "Tajik", code: "tg" },
        { name: "Tamil", code: "ta" },
        { name: "Tatar", code: "tt" },
        { name: "Telugu", code: "te" },
        { name: "Thai", code: "th" },
        { name: "Turkish", code: "tr" },
        { name: "Turkmen", code: "tk" },
        { name: "Ukrainian", code: "uk" },
        { name: "Urdu", code: "ur" },
        { name: "Uyghur", code: "ug" },
        { name: "Uzbek", code: "uz" },
        { name: "Vietnamese", code: "vi" },
        { name: "Welsh", code: "cy" },
        { name: "Xhosa", code: "xh" },
        { name: "Yiddish", code: "yi" },
        { name: "Yoruba", code: "yo" },
        { name: "Zulu", code: "zu" },
    ];

    useEffect(() => {
        getAllProduct();
        getCount();
        setSelectedLanguage(getCurrentGoogleLanguage());
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (width >= 768) setIsMenu(false);
    }, [width]);


    return (
        <div className="flex justify-between items-center py-2 bg-zinc-900 border-b
         border-zinc-800 sticky top-0 left-0 z-50">
            <Link to={"/"}>
                <h1 className="font-bold text-2xl text-white">Shopora</h1>
            </Link>

            <nav
                className={`flex ${width < 768
                    ? `flex-col gap-2 absolute w-full h-screen top-12
                     bg-zinc-900 py-5 ${isMenu ? "" : "hidden"
                    }`
                    : "flex-row items-center justify-between gap-3 static"
                    } text-gray-300`}
            >
                <Link
                    to={"/"}
                    className="p-1 flex items-center sm:justify-between gap-3 
                        sm:gap-1 hover:text-white 
            transition-all duration-150 border border-zinc-800 px-2 py-[3px]
             rounded-md hover:border-zinc-700"
                >
                    <House className="inline" size={19} color="#fff" />
                    <span>Home</span>
                </Link>
                <Link
                    to={"/profilepage"}
                    state={{ user }}
                    className="p-1 flex items-center sm:justify-between gap-3 
                        sm:gap-1 hover:text-white 
            transition-all duration-150 border border-zinc-800 px-2 py-[3px]
             rounded-md hover:border-zinc-700"
                >
                    <User className="inline" size={19} color="#fff" />
                    <span>Profile</span>
                </Link>
                <select
                    value={selectedLanguage}
                    onChange={(e) => {
                        const lang = e.target.value;
                        setSelectedLanguage(lang);
                        changeGoogleLanguage(lang);
                    }}
                    className="bg-zinc-800 text-white px-2 py-1 rounded notranslate"
                >
                    {languages.map((lang, index) => (
                        <option
                            key={index}
                            value={lang.code}
                            className="notranslate"
                        >
                            {lang.name}
                        </option>
                    ))}
                </select>

                <Link
                    to={"/cart"}
                    className="flex items-center sm:justify-between  gap-3 sm:gap-1 hover:text-white transition-all duration-150 border border-zinc-800 px-2 py-[3px] rounded-md hover:border-zinc-700 relative"
                >
                    <ShoppingCart className="inline" size={19} color="#fff" />
                    <span>Cart</span>
                    {cart?.length >= 1 && (<h6
                        style={{ textShadow: "2px 2px 20px rgba(255, 255, 255, 0.3), 2px 2px 30px rgba(255, 255, 255, 0.4)" }}>{cart?.length}</h6>)}
                </Link>

                {user?.isAdmin === true && (
                    <>
                        <Link
                            to={"/dashboard"}
                            className="p-1 flex items-center sm:justify-between gap-3 
                        sm:gap-1 hover:text-white 
            transition-all duration-150 border border-zinc-800 px-2 py-[3px]
             rounded-md hover:border-zinc-700"
                        >
                            <Lock className="inline" size={19} color="#fff" />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            to={"/order"}
                            className="p-1 flex items-center sm:justify-between gap-3 
                        sm:gap-1 hover:text-white 
            transition-all duration-150 border border-zinc-800 px-2 py-[3px]
             rounded-md hover:border-zinc-700"
                        >
                            <ScrollText className="inline" size={19} color="#fff" />
                            <span>Order</span>
                            {counter >= 1 && (<h6
                                style={{ textShadow: "2px 2px 20px rgba(255, 255, 255, 0.3), 2px 2px 30px rgba(255, 255, 255, 0.4)" }}>{counter}</h6>)}
                        </Link>
                    </>
                )}

                <Link
                    to={"/"}
                    onClick={() => logout()}
                    className="flex items-center sm:justify-between gap-3 
                    sm:gap-1 hover:text-white 
          transition-all duration-150 border border-zinc-800 
          px-2 py-[3px] rounded-md hover:border-zinc-700"
                >
                    <span>Logout</span>
                    <LogOut className="inline" size={19} color="#fff" />
                </Link>
            </nav>

            <div
                className="flex items-center justify-center md:hidden text-white"
                onClick={() => setIsMenu((prev) => !prev)}
            >
                {isMenu ? <X /> : <Menu />}
            </div>
        </div>
    );
};

export default Navbar;
