import { useEffect } from 'react'
import { orderStore } from "../store/order";
import Navbar from "../components/Navbar";
import { ListCollapse, Clock, CalendarCheck, OctagonX, Waves, Pickaxe, CircleDollarSign, MapPinHouse, ChevronDown, ListMinus, CloudCheck, ShoppingBasket, Banknote, Building2, House, Warehouse, PhoneCall, LineSquiggle, PackageSearch, ArrowDown, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from '../components/Footer';

const OrderPage = () => {
    const { getOrder, order, rejectOrder, deleteOrder, makeApproved } = orderStore();

    useEffect(() => {
        getOrder();
    }, [getOrder, deleteOrder]);

    const currentOrder = Array.isArray(order) && order.length > 0 ? order : null;

    function formatDate(isoString) {
        const date = new Date(isoString);

        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }).format(date).replace(",", "");
    }

    function openbox(boxId, id) {
        const slider = document.getElementById(boxId);
        slider.classList.contains('h-12') ? slider.classList.replace('h-12', 'h-auto') : slider.classList.replace('h-auto', 'h-12');
        const chevron = document.getElementById(id);
        chevron.classList.toggle('rotate-180');
    };

    const handelApprovedOrder = (id) => {
        makeApproved(id);
    }

    return (
        <div className="w-full mx-auto text-white">
            <Navbar />
            <h1
                style={{ textShadow: "2px 2px 20px rgba(255, 255, 255, 0.3), 2px 2px 30px rgba(255, 255, 255, 0.4)" }}
                className="w-full text-center text-3xl sm:text-4xl md:text-5xl text-zinc-300 font-bold my-2 mt-7 ">Order Page</h1>
            {!currentOrder ? <div className='w-full h-96 flex flex-col gap-3 items-center justify-center'>
                <h1 className='text-white text-xl'>There are no orders here</h1>
                <Link to="/" className='bg-emerald-600 px-3 py-1 rounded-md'>Go Home</Link>
            </div> : <>
                {Array.isArray(currentOrder) && currentOrder.map((orderItem, index) => (
                    <div key={index}>
                        <div className='flex gap-10'>
                            <h1 className='pl-4'>Order No:= {index + 1}</h1>
                            <h1 className='pl-4 font-bold'><span className='text-blue-500'>Status</span> :- <span className={`capitalize ${orderItem?.status === "pending" ? "text-yellow-300" : orderItem?.status === "shipping" ? "text-lime-400" : orderItem?.status === "deliverd" ? "text-emerald-400" : "text-red-600"}`}>{orderItem?.status}</span></h1>
                        </div>
                        <div
                            className='grid sm:grid-cols-2 md:grid-cols-3 gap-4 py-2 px-4 mb-10'
                        >

                            <div
                                className='border border-zinc-700 rounded-md h-12 overflow-hidden'
                                id={`orderId-box-${orderItem._id}-${index}`}
                            >
                                <div
                                    className='flex items-center justify-between p-3 cursor-pointer'
                                    onClick={() => {
                                        openbox(`orderId-box-${orderItem._id}-${index}`, `orderId-${orderItem._id}-${index}`)
                                    }}
                                >
                                    <div className='flex items-center gap-3'>
                                        <ListCollapse />
                                        <span>Order Id</span>
                                    </div>
                                    <ChevronDown id={`orderId-${orderItem._id}-${index}`} />
                                </div>
                                <div className='p-3 flex items-center gap-3'>
                                    <ListMinus size={18} />
                                    <span className='ml-2 text-sm text-emerald-500'>{orderItem._id}</span>
                                </div>
                            </div>
                            <div className='border border-zinc-700 rounded-md h-12 overflow-hidden'
                                id={`createdAt-box-${orderItem.createdAt}-${index}`}
                            >
                                <div
                                    className='flex items-center justify-between p-3 cursor-pointer'
                                    onClick={() => {
                                        openbox(`createdAt-box-${orderItem.createdAt}-${index}`, `createdAt-${orderItem.createdAt}-${index}`)
                                    }}
                                >
                                    <div className='flex items-center gap-3'>
                                        <Clock />
                                        <span>Created At</span>
                                    </div>
                                    <ChevronDown id={`createdAt-${orderItem.createdAt}-${index}`} />
                                </div>
                                <div className='p-3 flex items-center gap-3'>
                                    <CloudCheck size={18} />
                                    <span className='ml-2 text-sm text-emerald-500'>{formatDate(orderItem.createdAt)}</span>
                                </div>

                            </div>

                            <div
                                className='border border-zinc-700 rounded-md h-12 overflow-hidden'
                                id={`Total-Product-&-Quantity-box-${orderItem.products?.length + orderItem.user}-${index}`}
                            >
                                <div
                                    className='flex items-center justify-between p-3 cursor-pointer'
                                    onClick={() => {
                                        openbox(`Total-Product-&-Quantity-box-${orderItem.products?.length + orderItem.user}-${index}`, `Total-Product-&-Quantity-${orderItem.products?.length + orderItem.user}-${index}`)
                                    }}
                                >
                                    <div className='flex items-center gap-3'>
                                        <Waves />
                                        <span>Total Product & Quantity</span>
                                    </div>
                                    <ChevronDown id={`Total-Product-&-Quantity-${orderItem.products?.length + orderItem.user}-${index}`} />
                                </div>
                                <div className='p-3 flex items-center gap-3'>
                                    <ShoppingBasket size={18} />
                                    <span className='ml-2 text-sm'><span>{orderItem.products?.length}</span> Items</span>
                                </div>
                                <div className='max-h-64 overflow-y-auto p-3'>
                                    <div className='flex items-center gap-3'>
                                        <PackageSearch size={18} />
                                        <span>Product information</span>
                                        <ArrowDown size={18} />
                                    </div>
                                    <div>
                                        {orderItem.products?.map((product, prodIndex) => (
                                            <div
                                                key={prodIndex}
                                                className='my-2 rounded-md bg-zinc-800 px-2 py-1 flex justify-between items-center'
                                            >
                                                <div>
                                                    <h4 className='text-sm my-1'>Name: <span>{product.product?.name}</span></h4>
                                                    <h4 className='text-sm my-1'>Price: <span>${product?.price}</span></h4>
                                                    <h4 className='text-sm my-1'>Qty: <span>{product?.quantity}</span></h4>
                                                </div>
                                                <img
                                                    src={product.product?.image}
                                                    className='w-20 h-16 rounded-lg'
                                                    alt={product.product?.name} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='border border-zinc-700 rounded-md h-12 overflow-hidden'
                                id={`price-box-${orderItem.totalAmount + orderItem._id}-${index}`}
                            >
                                <div
                                    className='flex items-center justify-between p-3 cursor-pointer'
                                    onClick={() => {
                                        openbox(`price-box-${orderItem.totalAmount + orderItem._id}-${index}`, `price-${orderItem.totalAmount + orderItem._id}-${index}`)
                                    }}
                                >
                                    <div className='flex items-center gap-3'>
                                        <CircleDollarSign />
                                        <span>Price</span>
                                    </div>
                                    <ChevronDown id={`price-${orderItem.totalAmount + orderItem._id}-${index}`} />
                                </div>
                                <div className='flex items-center gap-3 p-3'>
                                    <Banknote size={18} />
                                    <span className='ml-2 text-sm text-emerald-500'>${orderItem.totalAmount}</span>
                                </div>
                            </div>
                            <div
                                className='border border-zinc-700 rounded-md h-12 overflow-hidden'
                                id={`address-box-${orderItem.address?.phone}-${index}`}
                            >
                                <div
                                    className='flex items-center justify-between p-3 cursor-pointer'
                                    onClick={() => {
                                        openbox(`address-box-${orderItem.address?.phone}-${index}`, `address-${orderItem.address?.phone}-${index}`);
                                    }}
                                >
                                    <div className='flex items-center gap-3'>
                                        <MapPinHouse />
                                        <span>Address</span>
                                    </div>
                                    <ChevronDown id={`address-${orderItem.address?.phone}-${index}`} />
                                </div>
                                <div className='p-3'>
                                    <div className='flex items-center gap-3'>
                                        <Building2 size={18} />
                                        <span className='ml-2 text-sm text-emerald-500'>{orderItem.address?.city}</span>
                                    </div>
                                    <div className='my-2 flex items-center gap-3'>
                                        <House size={18} />
                                        <span className='ml-2 text-sm text-emerald-500'>{orderItem.address?.home}</span>
                                    </div>
                                    <div className='my-2 flex items-center gap-3'>
                                        <Warehouse size={18} />
                                        <span className='ml-2 text-sm text-emerald-500'>{orderItem.address?.house}</span>
                                    </div>
                                    <div className='my-2 flex items-center gap-3'>
                                        <LineSquiggle size={18} />
                                        <span className='ml-2 text-sm text-emerald-500'>{orderItem.address?.street}</span>
                                    </div>
                                    <div className='my-2 flex items-center gap-3'>
                                        <PhoneCall size={18} />
                                        <span className='ml-2 text-sm text-emerald-500'>{orderItem.address?.phone}</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className='border border-zinc-700 rounded-md h-12 overflow-hidden'
                                id={`action-box-${orderItem._id}-${index}`}
                            >
                                <div className='flex items-center justify-between p-3 cursor-pointer'
                                    onClick={() => {
                                        openbox(`action-box-${orderItem._id}-${index}`, `action-${orderItem._id}-${index}`);
                                    }}
                                >
                                    <div className='flex items-center gap-3'>
                                        <Pickaxe />
                                        <span>Action</span>
                                    </div>
                                    <ChevronDown id={`action-${orderItem._id}-${index}`} />
                                </div>
                                <div className='p-3'>
                                    <div className='my-2 flex items-center justify-center gap-4 p-2 cursor-pointer rounded-lg bg-green-700'
                                        onClick={() => { handelApprovedOrder(orderItem._id) }}
                                    >
                                        {orderItem?.isApproved && <CalendarCheck size={20} className='text-green-200' />}
                                        <span className='ml-2 text-sm text-green-200'> Approved</span>
                                    </div>

                                    <div
                                        className='my-2 flex items-center justify-center gap-4 p-2 cursor-pointer rounded-lg bg-red-500'
                                        onClick={async () => {
                                            await rejectOrder(orderItem._id);
                                        }}
                                    >
                                        {orderItem?.isRejected && <OctagonX size={20} className='text-red-200' />}
                                        <span className='ml-2 text-sm font-medium text-red-200'>Rejected</span>
                                    </div>

                                    <div
                                        className='my-2 flex items-center justify-center gap-4 p-2 cursor-pointer rounded-lg bg-red-700'
                                        onClick={async () => {
                                            await deleteOrder(orderItem._id);
                                        }}
                                    >
                                        <Trash size={20} className='text-red-200' />
                                        <span className='ml-2 text-sm font-medium text-red-200'>Delete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </>}

            <div className='w-full h-auto rounded-md bg-emerald-700 flex '>

            </div>
            <Footer />
        </div>
    )
}

export default OrderPage;
