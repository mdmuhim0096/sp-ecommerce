
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Navbar from "../components/Navbar";
import axios from "../lib/axios";
import { Star, X, MessageCircleMore, Loader, ShoppingCart } from "lucide-react";
import { productStore } from "../store/product";
import { cartStore } from "../store/cart";
import { toast } from "react-hot-toast";
import ReadMore from "../components/ReadMore";
import Footer from "../components/Footer";

const ProductDetails = () => {
    const location = useLocation();
    const productData = location.state?.product;
    const { addToCart } = cartStore();
    const { rating, review, loading: loadingState } = productStore();
    const [product, setProduct] = useState(productData);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [itemsToShow, setItemsToShow] = useState(3);
    const [expanded, setExpanded] = useState(false);

    // ---------------- Responsive Items ----------------
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsToShow(1);
            } else if (window.innerWidth < 1024) {
                setItemsToShow(2);
            } else {
                setItemsToShow(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ---------------- Sync Product ----------------
    useEffect(() => {
        if (productData) {
            setProduct(productData);
        }
    }, [productData]);

    // ---------------- Fetch Related ----------------
    useEffect(() => {
        if (!product?._id || !product?.category) return;

        setLoading(true);

        axios
            .get("/product/getproductbycategory/" + product.category)
            .then((res) => {
                const unique = [];
                const seen = new Set();

                res.data.forEach((p) => {
                    if (p._id !== product._id && !seen.has(p._id)) {
                        seen.add(p._id);
                        unique.push(p);
                    }
                });

                setRelatedProducts(unique);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });

        setExpanded(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [product?._id, product?.category]);


    // ---------------- Description ----------------
    const description = product.description || "No description available.";
    const isLong = description.length > 300;
    const displayedText = expanded
        ? description
        : description.slice(0, 300);

    // ---------------- Rating ----------------
    const ratingValue = Math.round(product?.averageRating || 0);
    const totalStars = 5;

    const groupedProducts = [];
    for (let i = 0; i < relatedProducts.length; i += itemsToShow) {
        groupedProducts.push(
            relatedProducts.slice(i, i + itemsToShow)
        );
    }

    const enableLoop = groupedProducts.length > 1;
    const [ratingPertition, setPertition] = useState(5);
    const [isHover, setIsHover] = useState(false);

    const handelRating = async () => {
        await rating({ id: product?._id, rating: ratingPertition });
    }

    const [isOpenComment, setOpenComment] = useState(false);
    const [totalRating, setTotalRating] = useState(0);
    const [text, setText] = useState("");

    const handelReview = async () => {
        if (totalRating === 0) {
            return toast.error("you have to select rating")
        }
        if (!text.trim()) {
            return toast.error("you have to write description");
        }
        await review({ text, rating: totalRating, id: product?._id });
        setText("");
        setTotalRating(0);
        setOpenComment(false);
    }

    function addproduct() {
        addToCart(product._id);
    }


    return (
        <div className="text-white w-full bg-black h-auto">
            <Navbar />

            <div
                className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto"
                onScroll={e => { console.log("scrolling....") }}
            >

                {/* ---------------- Product Section ---------------- */}
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full max-w-sm sm:max-w-md md:max-w-lg object-cover rounded-2xl shadow-lg"
                        />
                    </div>

                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                            {product.name}
                        </h2>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-2 justify-center md:justify-start">
                            {[...Array(totalStars)].map((_, index) => (
                                <Star
                                    key={index}
                                    size={20}
                                    className={
                                        index < ratingValue
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-600"
                                    }
                                />
                            ))}
                            <span className="ml-2 text-sm text-gray-400">
                                ({Math.round(product?.averageRating) || 0})
                            </span>
                        </div>

                        {/* Description */}
                        <p className="mt-4 text-gray-300 whitespace-pre-line">
                            {displayedText}
                            {isLong && !expanded && "..."}
                        </p>

                        {isLong && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="mt-2 text-blue-400 hover:underline"
                            >
                                {expanded ? "See Less" : "See More"}
                            </button>
                        )}

                        <p className="mt-4 text-lg sm:text-xl font-semibold text-green-400">
                            ${product.price}
                        </p>
                        <div className="w-full h-auto my-10">
                            <h2 className="mb-3">Give rating us</h2>
                            <div
                                className="flex gap-2 h-7"
                                onMouseLeave={() => { setPertition(5); setIsHover(false) }}
                            >
                                {Array(5).fill(0).slice(0, ratingPertition).map((__, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-3 flex-row-reverse"
                                    >   {isHover && index + 1 === ratingPertition && <h4>{ratingPertition} star rating {ratingPertition === 1 ? "😥" : ratingPertition === 2 ? "😐" : ratingPertition === 3 ? "🤨" : ratingPertition === 4 ? "😍" : "🥰"}</h4>}
                                        <Star
                                            className={`cursor-pointer ${isHover && 'text-yellow-500'}`}
                                            onMouseOver={() => { setPertition(index + 1); setIsHover(true) }}
                                            onClick={() => { handelRating() }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => { addproduct() }}
                            className="px-3 py-2 rounded-lg bg-emerald-500 text-white flex justify-center items-center gap-3"
                        >
                            <ShoppingCart />
                            <span>Add In Cart</span>
                        </button>
                    </div>
                </div>

                {/* ---------------- Related Section ---------------- */}
                <div className="mt-16">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-6">
                        Related Products
                    </h3>

                    {loading ? (
                        <p>Loading...</p>
                    ) : relatedProducts.length > 0 ? (
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            infiniteLoop={enableLoop}
                            autoPlay={enableLoop}
                            interval={3000}
                            swipeable
                            emulateTouch
                            stopOnHover
                        >
                            {groupedProducts.map((group, index) => (
                                <div
                                    key={index}
                                    className="grid gap-4 px-2"
                                    style={{
                                        gridTemplateColumns: `repeat(${group.length}, minmax(0, 1fr))`,
                                    }}
                                >
                                    {group.map((p) => (
                                        <div
                                            key={p._id}
                                            onClick={() => setProduct(p)}
                                            className="cursor-pointer bg-gray-900 rounded-xl p-3 shadow hover:shadow-xl transition hover:scale-105"
                                        >
                                            <img
                                                src={p.image}
                                                alt={p.name}
                                                className="h-40 sm:h-48 w-full object-cover rounded-lg"
                                            />
                                            <p className="mt-3 text-sm sm:text-base font-medium truncate">
                                                {p.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <p>No related products found.</p>
                    )}
                </div>

                <div className="w-full mt-20">
                    <h3>Customer review</h3>
                    {product?.comments?.map((item, index) => (
                        <div
                            key={index}
                            className="my-5"
                        >
                            <div className="flex gap-4 items-center">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={item?.user?.image} alt={"user image"} />
                                <h5>{item?.user?.name}</h5>
                            </div>
                            <div className="ml-14">
                                <h4 className="my-1">
                                    <ReadMore text={item.text} limit={170} />
                                </h4>
                                <div className="flex gap-2 my-2">
                                    {Array(item.rating).fill(0).map((_, index) => (
                                        <Star
                                            key={index}
                                            fill="yellow"
                                            color="yellow"
                                            size={15}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div
                onClick={() => { setOpenComment(true); }}
                className="w-12 h-12 bg-blue-500 fixed bottom-6 right-20 z-40 rounded-full flex justify-center items-center cursor-pointer">
                <MessageCircleMore />
            </div>
            <div className={`w-full h-screen fixed z-[45] top-0 left-0 flex justify-center items-center ${!isOpenComment && "hidden"}`}>
                <div className="w-[95%] sm:w-full md:w-11/12 h-96 md:h-80 bg-zinc-800 p-2 rounded-lg">
                    <X
                        onClick={() => { setOpenComment(false) }}
                        className="float-end transition-all duration-200 hover:text-red-500 cursor-pointer"
                    />
                    <div className="w-full h-full">
                        <div>
                            <div>
                                <textarea
                                    onChange={e => setText(e.target.value)}
                                    className="w-full resize-none h-[220px] bg-transparent outline-none"
                                    placeholder="write description"
                                    value={text}
                                ></textarea>
                                <div className="flex flex-col justify-between md:flex-row gap-7 mt-5">
                                    <div className="flex justify-between w-full">
                                        <div
                                            onMouseLeave={() => { setPertition(5); setIsHover(false) }}
                                            className="flex gap-4 md:gap-3 w-full"
                                        >
                                            {Array(5).fill(0).slice(0, ratingPertition).map((__, index) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-3 flex-row-reverse"
                                                >   {isHover && index + 1 === ratingPertition && <h4 className="hidden md:block">
                                                    {ratingPertition} star rating {ratingPertition === 1 ? "😥" : ratingPertition === 2 ? "😐" : ratingPertition === 3 ? "🤨" : ratingPertition === 4 ? "😍" : "🥰"}</h4>}
                                                    <Star
                                                        className={`cursor-pointer ${isHover && 'text-yellow-500'}`}
                                                        onMouseOver={() => { setPertition(index + 1); setIsHover(true) }}
                                                        onClick={() => { setTotalRating(ratingPertition) }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-3 text-white">
                                            <Star
                                                fill={totalRating > 0 ? "yellow" : ""}
                                                color={totalRating > 0 ? "yellow" : "white"}
                                            />
                                            <span>{totalRating}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { handelReview() }}
                                        className="w-full md:w-40 p-[2px] bg-blue-600 rounded-lg flex justify-center"
                                    >
                                        {loadingState ? <Loader color={"#fff"} className="animate-spin" /> : "Send"}
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetails;