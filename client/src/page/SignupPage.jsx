import { useState } from "react";
import { userStore } from "../store/user";
import { Link } from "react-router-dom";
import BlackHole from "../components/BlackHole";
import { ChevronLeft, Loader } from "lucide-react";

const SignupPage = () => {
  const { signup, loading } = userStore();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Handle all text + radio inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prev) => ({
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

  // Signup
  const signupHandel = async (e) => {
    e.preventDefault();
    await signup(user);
  };

  // Common input style (same for all inputs)
  const inputStyle =
    "w-full p-2 border rounded bg-transparent text-white focus:outline-none border-zinc-800 transition-all duration-200 focus:border-zinc-600";

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <BlackHole>
        <form
          onSubmit={signupHandel}
          className="p-6 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4 mx-auto bg-zinc-900"
        >
          <h2 className="text-xl font-bold text-gray-400 text-center">
            Signup
          </h2>

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            className={inputStyle}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className={inputStyle}
            required
          />

          {/* Gender */}
          <div className="flex gap-6 text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                onChange={handleChange}
              />
              Female
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                onChange={handleChange}
              />
              Male
            </label>
          </div>

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={inputStyle}
          />

          {/* Image Preview */}
          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full border border-zinc-700"
              />
            </div>
          )}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className={inputStyle}
            required
          />

          {/* Submit */}
          <button
            type="submit"
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition flex justify-center items-center"
          >
            {loading ? <Loader className='animate-spin' color='#fff' /> : "Signup"}
          </button>

          {/* Back */}
          <Link
            to={"/"}
            className="text-slate-600 transition-all duration-100 hover:text-zinc-500 flex items-center gap-1 hover:gap-2"
          >
            <ChevronLeft size={18} />
            Back
          </Link>
        </form>
      </BlackHole>
    </div>
  );
};

export default SignupPage;