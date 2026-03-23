import { useEffect, useState, useCallback } from "react";
import { cartStore } from "../store/cart";
import { userStore } from "../store/user";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

// ✅ Stripe init (KEEP THIS)
const stripePromise = loadStripe(
  "pk_test_51RuYLAEjJK6lYSvf6DQBxxdXlTSMnHfO032DsdexDTPRJSPhNU6Of2hU3nyjpFxWzrywWtAToQt9rZl5AgzWJRsb00wNX3lcXa"
);

const INITIAL_ADDRESS = {
  street: "",
  city: "",
  home: "",
  house: "",
  phone: "",
};

const OrderSummry = () => {
  const cart = cartStore((s) => s.cart);
  const subtotal = cartStore((s) => s.subtotal);
  const total = cartStore((s) => s.total);
  const cupon = cartStore((s) => s.cupon);
  const getCupon = cartStore((s) => s.getCupon);

  const user = userStore((s) => s.user);
  const getUser = userStore((s) => s.getUser);

  const [address, setAddress] = useState(INITIAL_ADDRESS);

  // ✅ Load data
  useEffect(() => {
    getUser();
    getCupon();
  }, [getUser, getCupon]);

  // ✅ FIXED: clean auto-filled data
  useEffect(() => {
    if (user?.address) {
      const a = user.address;

      setAddress({
        street: String(a.street || "").trim(),
        city: String(a.city || "").trim(),
        home: String(a.home || "").trim(),
        house: String(a.house || "").trim(),
        phone: String(a.phone || "").trim(),
      });
    }
  }, [user]);

  const handleInputChange = useCallback((key, value) => {
    setAddress((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // ✅ Validation
  const validateForm = () => {
    const cleaned = Object.fromEntries(
      Object.entries(address).map(([k, v]) => [k, String(v).trim()])
    );

    const { street, city, home, house, phone } = cleaned;

    if (![street, city, home, house, phone].every((v) => v)) {
      toast.error("Please fill all fields");
      return false;
    }

    // ✅ BD-friendly phone
    if (!/^(\+?\d{10,15})$/.test(phone)) {
      toast.error("Invalid phone number");
      return false;
    }

    return true;
  };

  // ✅ PAYMENT HANDLER (fixed)
  const handelpayment = useCallback(async () => {
    try {
      if (!validateForm()) return;

      const stripe = await stripePromise;

      // ✅ Clean before sending
      const cleanedAddress = Object.fromEntries(
        Object.entries(address).map(([k, v]) => [k, String(v).trim()])
      );

      const res = await axios.post("/payment/createCheckoutSession", {
        products: cart,
        cuponCode: cupon?.code || null,
        address: cleanedAddress,
      });

      const session = res.data;

      // ✅ Hosted checkout
      if (session?.url) {
        window.location.href = session.url;
        return;
      }

      // ✅ Embedded checkout
      if (session?.client_secret) {
        const checkout = await stripe.initEmbeddedCheckout({
          clientSecret: session.client_secret,
        });

        checkout.mount("#checkout");
        return;
      }

      toast.error("Invalid payment session");
    } catch (error) {
      console.error("Payment error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast.error(message);
    }
  }, [address, cart, cupon]);

  return (
    <div className="w-full h-auto bg-zinc-800 rounded-lg px-4 py-3">
      <h1 className="text-center my-3 font-bold text-xl">
        Order Summary
      </h1>

      <h1 className="my-2">Subtotal Amount: ${subtotal}</h1>
      <h1 className="my-2">Total Amount: ${total}</h1>

      <div>
        {Object.keys(address).map((key) => (
          <input
            key={key}
            required
            value={address[key]}
            onChange={(e) => handleInputChange(key, e.target.value)}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            type={key === "phone" ? "tel" : "text"}
            className="p-2 border rounded bg-transparent text-white 
            focus:outline-none border-zinc-800 
            focus:border-zinc-700 my-2 w-full"
          />
        ))}
      </div>

      <button
        className="px-2 py-2 rounded-md w-full bg-emerald-600 my-3"
        onClick={handelpayment}
      >
        Proceed to Checkout
      </button>

      <div className="w-full text-center">
        <Link to={"/"}>
          Continue Shopping <MoveRight className="inline" />
        </Link>
      </div>

      {/* ✅ Required for embedded checkout */}
      <div id="checkout"></div>
    </div>
  );
};

export default OrderSummry;