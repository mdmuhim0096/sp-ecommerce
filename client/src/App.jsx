import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import HomePage from "./page/HomePage";
import CartPage from "./page/CartPage";
import PurchaseSuccess from "./page/PurchaseSuccess";
import PurchaseCancel from "./page/PurchaseCancel";
import ProductByCategory from "./page/ProductByCategory";
import AdminPage from "./page/AdminPage";
import OrderPage from "./page/OrderPage";

import { userStore } from "./store/user";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useRef } from "react";

import { loadGoogleTranslate } from "./lib/Translate";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ProductDetails from "./page/ProductDetails";
import ProfilePage from "./page/ProfilePage";
import ProductViewByLink from "./page/ProductViewByLink";
import ContactPage from "./page/ContactPage";
import Categorys from "./page/Categorys";
import Shope from "./page/Shope";
import Policy from "./page/Policy";
import TermsOfService from "./page/TermsOfService";
import TrackOrder from "./page/TrackOrder";

const App = () => {
  const { user, getUser } = userStore();
  const navigate = useNavigate();
  const appRef = useRef(null);

  // Initial Load
  useEffect(() => {
    getUser();
    loadGoogleTranslate();
  }, []);

  // JWT Expiry Check
  useEffect(() => {
    if (!user) return;

    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiryTime = payload.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expiryTime) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 3000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  return (
    <div
      ref={appRef}
      className="h-screen flex flex-col items-center gap-12 overflow-y-auto px-2 bg-zinc-900"
    >
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/category/:category" element={<ProductByCategory />} />
        <Route path="/productViewByIdLink/:productId" element={<ProductViewByLink />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<AdminPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/purchase-success" element={<PurchaseSuccess />} />
        <Route path="/purchase-cancel" element={<PurchaseCancel />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/categorys" element={<Categorys />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/shope" element={<Shope />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/termsofservice" element={<TermsOfService />} />
        <Route path="/trackorder/:id" element={<TrackOrder />} />
        <Route path="/*" element={<h1>Coming soon...!</h1>} />
      </Routes>

      <ScrollToTopButton scrollRef={appRef} />
      {/* {user && <Footer />} */}
      <div
        id="google_translate_element"
        style={{ position: "absolute", left: "-9999px", top: 0 }}
      />

    </div>
  );
};

export default App;