
import { useEffect } from "react";
import { productStore } from "../store/product";
import { Star, Trash } from "lucide-react";

const AdminProduct = () => {

  const { allProducts, toggleFeatured, deleteProduct, product } =
    productStore();

  useEffect(() => {
    allProducts();
  }, []);

  async function toggleFeaturedHandel(id) {
    await toggleFeatured(id);
  }

  async function deleteProductHandel(id) {
    await deleteProduct(id);
  }

  return (
    <div className="w-full md:px-6 lg:px-10 py-6">

      {/* Container */}
      <div className="bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="hidden md:grid grid-cols-6 text-xs sm:text-sm md:text-base font-semibold text-zinc-400 bg-zinc-800/60 px-4 py-4 uppercase tracking-wide">
          <div className="text-left">Product</div>
          <div className="text-center">Price</div>
          <div className="text-center">Category</div>
          <div className="text-center">Featured</div>
          <div className="text-center">Delete</div>
          <div className="text-center">ID</div>
        </div>

        {/* Products */}
        {Array.isArray(product) &&
          product.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 md:grid-cols-6 items-center gap-2 px-4 py-4 text-xs sm:text-sm md:text-base border-t border-zinc-800 hover:bg-zinc-800/40 transition-all duration-300"
            >
              {/* Product Info */}
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover border border-zinc-700"
                />
                <div className="truncate">
                  <p className="font-medium text-white truncate">
                    {item?.name}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="text-center font-medium text-emerald-400">
                ${item?.price}
              </div>

              {/* Category */}
              <div className="text-center text-zinc-300 truncate">
                {item?.category}
              </div>

              {/* Featured */}
              <div className="flex justify-center">
                <button
                  onClick={() => toggleFeaturedHandel(item?._id)}
                  className={`p-2 rounded-full transition-all duration-300 ${item?.isFeatured
                    ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                    : "bg-zinc-700 text-zinc-400 hover:bg-zinc-600"
                    }`}
                >
                  <Star
                    size={18}
                    className={item?.isFeatured ? "fill-yellow-400" : ""}
                  />
                </button>
              </div>

              {/* Delete */}
              <div className="flex justify-center">
                <button
                  onClick={() => deleteProductHandel(item?._id)}
                  className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300"
                >
                  <Trash size={18} />
                </button>
              </div>

              {/* ID (hidden on small screens) */}
              <div className="hidden md:block text-center text-zinc-500 text-xs truncate">
                {item?._id}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminProduct;
