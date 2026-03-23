import { useState } from 'react';
import BlackHole from './BlackHole';
import { useCategoryStore } from "../store/category";
import { Loader } from "lucide-react";

const CategoryForm = () => {
    const { createCategory, loading } = useCategoryStore();
    const [data, setData] = useState({
        name: "",
        image: null
    });

    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData((prev) => ({
                ...prev,
                image: file,
            }));

            // Preview image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handelCategory = async () => {
        await createCategory(data);
    }

    return (
        <BlackHole >
            <form
                className="bg-zinc-900 p-6 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4 "
            >
                <h2 className="text-2xl font-bold text-gray-700 text-center">Create Category</h2>
                <input
                    type="text"
                    placeholder='category name'
                    value={data.name}
                    onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="p-2 border rounded bg-transparent text-white focus:outline-none border-zinc-800 transition-all duration-200 focus:border-zinc-700 w-full"
                />
                <input
                    type="file"
                    accept='image/*'
                    required
                    onChange={handleImageChange}
                />
                <div>
                    {preview && <img src={preview} />}
                </div>
                {/* Submit Button */}
                <button
                    onClick={() => { handelCategory() }}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition flex justify-center items-center"
                >
                    {loading ? <Loader
                        color={"#fff"}
                        className="animate-spin" /> : "Create"}
                </button>

            </form>
        </BlackHole >
    )
}

export default CategoryForm;