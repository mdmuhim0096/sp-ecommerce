import { useEffect, useState } from "react";
import { productStore } from "../store/product";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { getFeaturedProducts, featuredProducts } = productStore();
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(3);
      } else {
        setItemsPerSlide(4);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  useEffect(() => {
    getFeaturedProducts();
  }, [getFeaturedProducts]);

  const groupedProducts = [];
  for (let i = 0; i < featuredProducts.length; i += itemsPerSlide) {
    groupedProducts.push(featuredProducts.slice(i, i + itemsPerSlide));
  }
  if (featuredProducts.length === 0) return;
  return (
    <div className="w-full mx-auto px-3 my-40">
      <h1
        style={{
          textShadow:
            "2px 2px 20px rgba(255, 255, 255, 0.3), 2px 2px 30px rgba(255, 255, 255, 0.4)",
        }}
        className="w-full text-center text-3xl sm:text-4xl md:text-5xl text-zinc-300 font-bold my-20 mt-7"
      >
        Featured Products
      </h1>

      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showStatus={false}
        swipeable
        emulateTouch
        className="h-auto"
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              title={label}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition"
            >
              <ChevronLeft size={28} />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              title={label}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition"
            >
              <ChevronRight size={28} />
            </button>
          )
        }
      >
        {groupedProducts.map((group, index) => (
          <div
            key={index}
            className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
          >
            {group.map((item) => (
              <div
                key={item._id}
                className="border-2 border-zinc-700 rounded-xl shadow hover:shadow-lg transition flex flex-col"
              >
                <div className="w-full relative h-[100%] p-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-72 w-full rounded-xl object-fill"
                  />
                  <Star
                    className="absolute top-2 right-2 text-yellow-400 bg-emerald-600 rounded-full p-1 cursor-pointer hover:scale-110 transition"
                    size={30}
                  />
                </div>

                <div className="p-1 text-center h-[12%] flex items-center justify-between text-white">
                  <h3 className="truncate text-zinc-400">{item.name}</h3>
                  <Link
                    className="px-3 rounded-md bg-blue-500"
                    to={`/category/${item.category}`}
                  >
                    view
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
