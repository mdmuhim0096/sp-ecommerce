// import { useEffect, useState } from "react";
// import axios from "../lib/axios";
// import ReadMore from "./ReadMore";

// const TestimonialsSection = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             await axios.get("/testimonials")
//                 .then(res => {
//                     setData(res.data);
//                 })
//         }
//         fetchData();
//     }, []);

//     const StarRating = ({ rating }) => {
//         return (
//             <div className="flex gap-1">
//                 {[...Array(5)].map((_, index) => (
//                     <svg
//                         key={index}
//                         className={`w-5 h-5 ${index < rating ? "text-yellow-400" : "text-gray-300"
//                             }`}
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                 ))}
//             </div>
//         );
//     };

//     return (
//         <section className="py-16 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="text-center mb-12">
//                     <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
//                         Testimonials
//                     </span>
//                     <h1
//                         style={{
//                             textShadow:
//                                 "2px 2px 20px rgba(255, 255, 255, 0.3), 2px 2px 30px rgba(255, 255, 255, 0.4)",
//                         }}
//                         className="w-full text-center text-3xl sm:text-4xl md:text-5xl text-zinc-300 font-bold my-2 mt-7"
//                     >
//                         What Our Customers Say
//                     </h1>
//                     <p className="text-gray-500 max-w-2xl mx-auto text-lg mt-8">
//                         Don't just take our word for it. Here's what our satisfied customers
//                         have to say about their shopping experience.
//                     </p>
//                 </div>

//                 {/* Stats Bar */}
//                 <div className="flex flex-wrap justify-center gap-8 mb-12 p-6 bg-zinc-800/50 rounded-2xl shadow-sm border border-gray-600">
//                     <div className="text-center">
//                         <div className="text-3xl font-bold text-indigo-600">50K+</div>
//                         <div className="text-gray-500 text-sm">Happy Customers</div>
//                     </div>
//                     <div className="hidden sm:block w-px bg-gray-200"></div>
//                     <div className="text-center">
//                         <div className="text-3xl font-bold text-indigo-600">4.9</div>
//                         <div className="text-gray-500 text-sm">Average Rating</div>
//                     </div>
//                     <div className="hidden sm:block w-px bg-gray-200"></div>
//                     <div className="text-center">
//                         <div className="text-3xl font-bold text-indigo-600">99%</div>
//                         <div className="text-gray-500 text-sm">Satisfaction Rate</div>
//                     </div>
//                 </div>

//                 {/* Testimonials Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {data.map((testimonial) => (
//                         <div
//                             key={testimonial._id}
//                             className=" rounded-2xl p-6 shadow-sm border border-gray-100/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-zinc-800/40"
//                         >
//                             {/* Quote Icon */}
//                             <div className="mb-4">
//                                 <svg
//                                     className="w-8 h-8 text-indigo-200"
//                                     fill="currentColor"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
//                                 </svg>
//                             </div>

//                             {/* Rating */}
//                             <StarRating rating={testimonial.rating} />

//                             {/* Testimonial Text */}
//                             <p className="mt-4 text-gray-500 leading-relaxed">
//                                 "{
//                                     <ReadMore text={testimonial.feedbackText} limit={70} />
//                                 }"
//                             </p>

//                             {/* Product Badge */}
//                             <div className="mt-4">
//                                 <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
//                                     <svg
//                                         className="w-3 h-3 mr-1"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth={2}
//                                             d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                                         />
//                                     </svg>
//                                     {testimonial.productName}
//                                 </span>
//                             </div>

//                             {/* Author */}
//                             <div className="mt-6 flex items-center gap-4 pt-4 border-t border-gray-500">
//                                 <img
//                                     src={testimonial?.user?.image}
//                                     alt={testimonial?.user?.name}
//                                     className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-50"
//                                 />
//                                 <div>
//                                     <h4 className="font-semibold text-white">
//                                         {testimonial?.user?.name}
//                                     </h4>
//                                     <div className="flex items-center gap-1 text-sm text-gray-500">
//                                         <svg
//                                             className="w-4 h-4 text-green-500"
//                                             fill="currentColor"
//                                             viewBox="0 0 20 20"
//                                         >
//                                             <path
//                                                 fillRule="evenodd"
//                                                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                                                 clipRule="evenodd"
//                                             />
//                                         </svg>
//                                         Verified Buyer
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* CTA Section */}
//                 <div className="mt-12 text-center">
//                     <p className="text-gray-500 mb-4">
//                         Join thousands of happy customers today!
//                     </p>
//                     <a
//                         href="#productHub"
//                         className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-200 ">
//                         Start Shopping
//                         <svg
//                             className="w-5 h-5"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M17 8l4 4m0 0l-4 4m4-4H3"
//                             />
//                         </svg>
//                     </a>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default TestimonialsSection;



import { useEffect, useState } from "react";
import axios from "../lib/axios";
import ReadMore from "./ReadMore";

const TestimonialsSection = () => {
    const [data, setData] = useState([]);
    const [slice, setSlice] = useState(6);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/testimonials");
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleSlice = () => {
        setSlice(prev => {
            const next = prev + 3;
            return next >= data.length ? data.length : next;
        });
    };

    const StarRating = ({ rating }) => {
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                    <svg
                        key={index}
                        className={`w-5 h-5 ${index < rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full flex justify-center">
                <h4 className="px-2 rounded-lg text-indigo-600 inline-block my-14 bg-white">Testimonials</h4>
            </div>
            <div className="max-w-7xl mx-auto">

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.slice(0, slice).map((testimonial) => (
                        <div
                            key={testimonial._id}
                            className="rounded-2xl p-6 shadow-sm border border-gray-100/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-zinc-800/40"
                        >
                            {console.log(data)}
                            {/* Quote SVG */}
                            <div className="mb-4">
                                <svg
                                    className="w-8 h-8 text-indigo-200"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                            </div>

                            {/* Rating */}
                            <StarRating rating={testimonial.rating} />

                            {/* Feedback */}
                            <p className="mt-4 text-gray-500 leading-relaxed">
                                "<ReadMore text={testimonial.feedbackText} limit={70} />"
                            </p>

                            {/* Product */}
                            <div className="mt-4">
                                <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                    {testimonial.productName}
                                </span>
                            </div>

                            {/* Author */}
                            <div className="mt-6 flex items-center gap-4 pt-4 border-t border-gray-500">
                                <img
                                    src={testimonial?.user?.image}
                                    alt={testimonial?.user?.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />

                                <div>
                                    <h4 className="font-semibold text-white">
                                        {testimonial?.user?.name}
                                    </h4>

                                    {/* Verified Buyer */}
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <svg
                                            className="w-4 h-4 text-green-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        Verified Buyer
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                {slice < data.length && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handleSlice}
                            className="text-white px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TestimonialsSection;