import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTopButton = ({ scrollRef }) => {
    const [visible, setVisible] = useState(false);
    const scrollToTop = () => {
        if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
        };
    };

    scrollRef?.current?.addEventListener("scroll", () => {
        const scrollTopValue = scrollRef?.current.scrollTop;
        if (scrollTopValue > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    });

    if(!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 z-[9999]"
            id="scrollToTopBtn"
        >
            <ArrowUp size={20} />
        </button>
    );
};

export default ScrollToTopButton;