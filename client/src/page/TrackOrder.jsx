import { useEffect, useState } from "react";
import { orderStore } from "../store/order";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BookText, ShoppingBasket, Loader, BookA } from "lucide-react";

const TrackOrder = () => {
  const { makeDeliverd, getOrderById, order, loading } = orderStore();
  const { id } = useParams();

  useEffect(() => { getOrderById(id) }, []);

  const handelConfirmDaliverd = (id) => {
    makeDeliverd(id);
  }

  const status = order?.status;

  return (
    <div>
      <Navbar />

      <h1
        style={{ textShadow: "2px 2px 20px rgba(255, 255, 255, 0.3), 2px 2px 30px rgba(255, 255, 255, 0.4)" }}
        className='text-3xl mx-2 font-semibold text-white my-10 text-center'
      >My Order</h1>

      <h3 className="w-full md:w-6/12 lg:w-4/12 mx-auto my-4 text-white font-bold px-4 py-2 rounded-lg border border-zinc-700 text-center"><span className="text-blue-500">STATUS</span> : <span className={status === "shipping" ? "text-yellow-300" : "text-emerald-500"}>{status?.toUpperCase()}</span></h3>

      <div className="md:mt-10">
        <h3 className="text-white">
          <BookText className="inline mr-2" />
          <span className="font-bold text-xl text-blue-300">Information</span>
        </h3>
        <div className="md:flex gap-3">
          <div className="w-full md:w-6/12 text-gray-300 p-4 my-4 border rounded-lg border-zinc-700">
            <img src={order?.user?.image} alt="user image" className="rounded-lg mb-3" />
            <h2>{order?.user?.name}</h2>
          </div>
          <div className="w-full flex flex-col justify-center md:w-6/12 md:gap-2 text-gray-300 my-4 border p-4 rounded-lg border-zinc-700 lg:justify-center lg:items-center lg:gap-5">
            <h1 className="mb-2 md:mb-0">
              <BookA color="#fff" className="inline-block mr-2" />
              <span>Address</span></h1>
            <h3>City:- {order?.address?.city}.</h3>
            <h3>Street:- {order?.address?.street}.</h3>
            <h3>House:- {order?.address?.house}.</h3>
            <h3>Home:- {order?.address?.home}.</h3>
            <h3>Phone:- {order?.address?.phone}.</h3>
            <h3>Email:- {order?.user?.email}.</h3>
          </div>
        </div>
      </div>

      <h3 className="text-white text-lg mt-7 md:ml-1">
        <ShoppingBasket className="inline mr-2" />
        <span className="font-bold text-xl text-green-300">Products</span>
      </h3>
      <h3 className="text-white mb-4 md:my-0 md:mb-2 lg:mb-3 md:ml-1">Item Qty: {order?.products?.length}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-7">
        {order?.products?.map((item, index) => (
          <div key={index}
            className="w-full h-auto p-4 border border-zinc-700 rounded-lg my-2" >
            <h4 className="text-gray-400">Name: <span>{item?.name}</span></h4>
            <h4 className="text-gray-400">Qty: <span>{item?.quantity}</span></h4>
            <h4 className="text-gray-400">Price: <span>${item?.price}</span></h4>
            <h4 className="text-gray-400">Product Id: <span className="text-sm">{item?.product}</span></h4>
            <img
              src={item?.image}
              alt="product image"
              className="mt-4 rounded-lg h-72 w-full"
            />
          </div>
        ))}
      </div>
      {order?.status !== "deliverd" && <button
        onClick={() => { handelConfirmDaliverd(id); }}
        className="px-3 py-2 rounded-lg bg-emerald-600 text-center text-white font-bold mx-auto block my-8"
      >{loading ? <Loader color="#fff" className="animate-spin mx-auto" /> : "Confirm Deliverd"}</button>}
      <Footer />
    </div>
  );

}

export default TrackOrder;