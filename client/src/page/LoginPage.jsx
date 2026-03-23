import { useState } from 'react'
import { userStore } from "../store/user";
import { Link } from 'react-router-dom';
import BlackHole from '../components/BlackHole';
import { Loader } from "lucide-react";

const LoginPage = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const { login, loading } = userStore();

    // Login
    console.log("isLoading: ", loading);
    function loginHandel(e) {
        e.preventDefault();
        login(user.email, user.password);
    }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            {/* Login Form */}
            <BlackHole>
                <form
                    onSubmit={loginHandel}
                    className=" p-6 rounded-lg w-full flex flex-col gap-4 bg-zinc-900"
                >
                    <h2 className="text-xl font-bold text-gray-600">Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={e => setUser({ ...user, email: e.target.value })}
                        className="p-2 border rounded bg-transparent text-white focus:outline-none border-zinc-800 transition-all duration-200 focus:border-zinc-700 "
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={e => setUser({ ...user, password: e.target.value })}
                        className="p-2 border rounded bg-transparent text-white focus:outline-none border-zinc-800 transition-all duration-200 focus:border-zinc-700"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition flex justify-center items-center"
                    >
                        {loading === "true" || loading === true ? <Loader className='animate-spin' color='#fff' /> : "Login"}
                    </button>
                    <Link
                        to={"/signup"}
                        className='text-slate-600 transition-all duration-100 hover:text-zinc-500'
                    >if need to <span className='underline'>sign-up</span></Link>
                </form>
            </BlackHole>
        </div>
    )
}

export default LoginPage;