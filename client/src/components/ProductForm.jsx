import { useRef, useState } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import BlackHole from "./BlackHole";
import { useCategoryStore } from "../store/category";
import { productStore } from "../store/product";
import { Loader } from "lucide-react";

const ProductForm = () => {
    const { createProduct, loading } = productStore();
    const { category: categories } = useCategoryStore();
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
    });

    const fileRef = useRef();
    const [preview, setPreview] = useState(null);

    // 🟢 Submit Product
    const submit = async (e) => {
        e.preventDefault();
        await createProduct(data);
        setData({ name: "", description: "", price: "", category: "", image: null });
        fileRef.current.value = null;
        setPreview(null);
    };

    return (
        <BlackHole>
            <form
                onSubmit={submit}
                className="bg-zinc-900 p-6 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold text-gray-700 text-center">Create Product</h2>

                {/* Name */}
                <input
                    type="text"
                    placeholder="Product Name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="p-2 border rounded bg-transparent text-white focus:outline-none border-zinc-800 transition-all duration-200 focus:border-zinc-700"
                    required
                />

                {/* Description */}
                <input
                    type="text"
                    placeholder="Description"
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                    className="p-2 border rounded bg-transparent text-white focus:outline-none border-zinc-800 transition-all duration-200 focus:border-zinc-700"
                    required
                />

                {/* Category */}
                <select
                    value={data.category}
                    onChange={(e) => setData({ ...data, category: e.target.value })}
                    className="p-2 border rounded bg-transparent text-white focus:outline-none border-zinc-800 transition-all duration-200 focus:border-zinc-700"
                    required
                >
                    <option value="" className="text-white bg-zinc-900">Select Category</option>
                    {categories.map((cat) => (
                        <option
                            key={cat.name}
                            value={cat.name}
                            className="text-white bg-zinc-900"
                        >
                            {cat.name}
                        </option>
                    ))}
                </select>

                {/* Price */}
                <input
                    type="number"
                    placeholder="Price"
                    value={data.price}
                    onChange={(e) => setData({ ...data, price: e.target.value })}
                    className="p-2 border rounded bg-transparent text-white focus:outline-none border-zinc-800 transition-all duration-200 focus:border-zinc-700"
                    required
                />

                {/* Image Upload */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        setData({ ...data, image: file });
                        if (file) setPreview(URL.createObjectURL(file));
                    }}
                    className="p-2 border rounded"
                    required
                    ref={fileRef}
                />

                {/* Preview */}
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded mt-2 self-center"
                    />
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition flex justify-center items-center"
                >
                    {loading ? <Loader
                        color={"#fff"}
                        className="animate-spin" /> : "Create"}
                </button>

            </form>
        </BlackHole>
    );
};

export default ProductForm;
