import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { userStore } from '../store/user';
import { Check, MapPinHouse, LineSquiggle, Building2, Home, Phone, Warehouse, Mail, Contact, Facebook, Twitter, Loader } from "lucide-react";
import Footer from "../components/Footer";


const ProfilePage = () => {
    const { user, getProfile, updateInfo, updateProfile, loading } = userStore();
    const [sewtech, setSewtech] = useState(true);
    const [address, setAddress] = useState({
        street: "",
        city: "",
        home: "",
        house: "",
        phone: ""
    });

    const [profile, setProfile] = useState({
        name: "",
        image: null,
        email: "",
        oldEmail: "",
        password: "",
        oldPassword: "",
        confirmPassword: "",
    });

    const [perview, setPreview] = useState(null);

    useEffect(() => {
        async function getData() {
            await getProfile()
        }
        getData();
        setAddress(user?.adress);
    }, []);

    const inputStyle =
        "w-full p-2 border rounded bg-transparent text-white focus:outline-none border-zinc-800 transition-all duration-200 focus:border-zinc-600";

    function handelUpdate() {
        updateInfo(address);
        setAddress({ home: "", house: "", phone: "", city: "", street: "" });
    }

    async function handelUpdateProfile() {
        setPreview(null);
        await updateProfile(profile);
        setProfile({ name: "", image: null, email: "", oldEmail: "", oldPassword: "", password: "", confirmPassword: "" });
    };

    return (
        <div className='w-full'>
            <Navbar />

            <div className='flex flex-col md:flex-row gap-3'>
                <div className='flex flex-col gap-4 mt-3 items-start w-full rounded-lg p-3 bg-zinc-950/50'>
                    {/* <User
                        color='#05edbf'
                        className='mx-auto'
                        size={40}
                    /> */}
                    {user?.image && (
                        <div className='relative mx-auto md:mx-0'>
                            <div className='absolute right-0 top-1 bg-zinc-800 w-5 h-5 flex justify-center items-center rounded-full ring-1 ring-green-600'>
                                <Check
                                    color='lime'
                                    strokeWidth={5}
                                    size={15}

                                />
                            </div>
                            <img
                                src={user.image}
                                className='w-16 h-16 rounded-full object-cover'
                                alt="profile"
                            />
                        </div>
                    )}
                    <div>
                        <div className='text-center md:text-left'>
                            <h3 className='text-white'>{user?.name}</h3>
                            <h3 className='text-white'>
                                role: {user?.isAdmin ? "Admin" : "User"}
                            </h3>
                        </div>
                        <p className='text-white mt-5'>you'r a  <span className={user?.isAdmin ? "text-emerald-500" : "text-orange-500"}>{user?.isAdmin ? "Admin" : "User"}</span> of Shopora E-Commerce System.</p>
                    </div>
                </div>

                <div className='w-full mt-3 rounded-lg p-3 bg-zinc-950/50' >
                    <MapPinHouse
                        color='#05edbf'
                        className='mx-auto mb-5'
                        size={40}
                    />
                    <div className='text-white'>
                        <div className='flex gap-3'>
                            <LineSquiggle />
                            <h1>{user?.address?.street}</h1>
                        </div>
                        <div className='flex gap-3 my-3'>
                            <Building2 />
                            <h1>{user?.address?.city}</h1>
                        </div>
                        <div className='flex gap-3 my-3'>
                            <Home />
                            <h1>{user?.address?.home}</h1>
                        </div>
                        <div className='flex gap-3 my-3'>
                            <Warehouse />
                            <h1>{user?.address?.house}</h1>
                        </div>
                    </div>
                </div>
                <div className='w-full mt-3 rounded-lg p-3 bg-zinc-950/50 text-white' >
                    <Contact
                        color='#0588ed'
                        className='mx-auto mb-5'
                        size={40}
                    />
                    <div className='flex gap-3 my-3'>
                        <Phone />
                        <h1>{user?.address?.phone}</h1>
                    </div>
                    <div className='flex gap-3 my-3'>
                        <Mail />
                        <h1>{user?.email}</h1>
                    </div>
                    <div className='flex gap-3 my-3'>
                        <Facebook />
                        <h1>facebook.com</h1>
                    </div>
                    <div className='flex gap-3 my-3'>
                        <Twitter />
                        <h1>twitter.com</h1>
                    </div>
                </div>
            </div>
            <div className='w-72 mx-auto h-10 my-5 rounded-2xl flex justify-between items-center border-zinc-800 border mt-32 notranslate'>
                <h6
                    onClick={() => { setSewtech(true) }}
                    className={`${sewtech ? "bg-blue-600 rounded-2xl h-full" : ""} cursor-pointer text-center w-full text-white flex items-center justify-center`}>Upate Address</h6>
                <h6
                    onClick={() => { setSewtech(false) }}
                    className={`${!sewtech ? "bg-blue-600 rounded-2xl h-full" : ""} cursor-pointer text-center w-full text-white flex items-center justify-center`}>Upate Profile</h6>
            </div>
            <div className='flex justify-center w-full '>
                {sewtech ? (<div className='flex flex-col gap-4 w-full md:w-6/12 px-5 md:px-10 pb-7 md:pb-14 border mt-14 rounded-xl border-zinc-800'>
                    <h2 className='text-white text-center my-3 text-2xl'>Upate Address</h2>
                    <input
                        type="text"
                        value={address?.street}
                        placeholder='Street'
                        onChange={e => setAddress(prev => ({ ...prev, street: e.target.value }))}
                        className={inputStyle}
                    />
                    <input
                        type="text"
                        value={address?.city}
                        placeholder='City'
                        onChange={e => setAddress(prev => ({ ...prev, city: e.target.value }))}
                        className={inputStyle}
                    />
                    <input
                        type="text"
                        value={address?.home}
                        placeholder='Home'
                        onChange={e => setAddress(prev => ({ ...prev, home: e.target.value }))}
                        className={inputStyle}
                    />
                    <input
                        type="text"
                        value={address?.house}
                        placeholder='House'
                        onChange={e => setAddress(prev => ({ ...prev, house: e.target.value }))}
                        className={inputStyle}
                    />
                    <input
                        type="text"
                        value={address?.phone}
                        placeholder='Phone'
                        onChange={e => setAddress(prev => ({ ...prev, phone: e.target.value }))}
                        className={inputStyle}
                    />
                    <button
                        className='text-white p-2 bg-emerald-600 rounded-lg flex justify-center items-center'
                        onClick={() => { handelUpdate(); }}
                    >{loading ?
                        <Loader
                            color='#fff'
                            className='animate-spin'
                        /> : "Update"}</button>
                </div>) :

                    (<div className='flex flex-col gap-4 w-full md:w-6/12 px-5 md:px-10 pb-7 md:pb-14 border mt-14 rounded-xl border-zinc-800'>
                        <h2 className='text-white text-center my-3 text-2xl'>Upate Profile</h2>
                        <input
                            type="text"
                            value={profile.name}
                            placeholder='name'
                            onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
                            className={inputStyle}
                        />
                        <input
                            type="email"
                            value={profile.oldEmail}
                            placeholder='previus email'
                            onChange={e => setProfile(prev => ({ ...prev, oldEmail: e.target.value }))}
                            className={inputStyle}
                        />
                        <input
                            type="text"
                            value={profile.email}
                            placeholder='email'
                            onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))}
                            className={inputStyle}
                        />
                        <input
                            type="password"
                            value={profile.oldPassword}
                            placeholder='previus password'
                            onChange={e => setProfile(prev => ({ ...prev, oldPassword: e.target.value }))}
                            className={inputStyle}
                        />
                        <input
                            type="password"
                            value={profile.password}
                            placeholder='new password'
                            onChange={e => setProfile(prev => ({ ...prev, password: e.target.value }))}
                            className={inputStyle}
                        />
                        <input
                            type="password"
                            value={profile.confirmPassword}
                            placeholder='confirm password'
                            onChange={e => setProfile(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className={inputStyle}
                        />
                        <input
                            type="file"
                            accept='image/*'
                            placeholder='confirm password'
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setProfile(prev => ({ ...prev, image: file }));
                                if (file) setPreview(URL.createObjectURL(file));
                            }}
                            className={inputStyle}
                        />
                        {perview && <img src={perview} className='w-20 h-20 rounded-full' />}
                        <button
                            className='text-white p-2 bg-emerald-600 rounded-lg flex justify-center items-center'
                            onClick={() => { handelUpdateProfile() }}
                        >{loading ?
                            <Loader
                                color='#fff'
                                className='animate-spin'
                            /> : "Update"}</button>
                    </div>)}

            </div>
            <Footer />
        </div>
    );
}

export default ProfilePage;