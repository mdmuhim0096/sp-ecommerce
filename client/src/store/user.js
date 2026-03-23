import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const userStore = create((set, get) => ({

    loading: false,
    user: null,

    login: async (email, password) => {
        try {
            set({ loading: true });
            await axios.post("/auth/login", { email, password })
                .then(res => {
                    toast.success(res.data.message || "login success");
                    set({ user: res.data.user, loading: false });
                    localStorage.setItem("token", res.data.user.token);
                    setTimeout(() => { window.location.href = "/"; }, 400);
                });

        } catch (error) {
            set({ loading: false, user: null });
            toast.error(error.response?.data?.message || error?.message || "login faild");
        }
    },

    logout: async () => {
        await axios.post("/auth/logout").then(res => {
            toast.success(res.data.message || "logout success");
            set({ user: null, loading: false });
            localStorage.removeItem("token");
            localStorage.removeItem("profileUser");
        })
    },

    signup: async (data = {}) => {
        try {
            set({ loading: true })
            const fd = new FormData();
            fd.append("name", data.name);
            fd.append("image", data.image);
            fd.append("email", data.email);
            fd.append("gender", data.gender);
            fd.append("password", data.password);
            await axios.post("/auth/signup", fd, {
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then(res => {
                    toast.success(res.data.message || "signup success");
                    set({ user: res.data.user, loading: false });
                    localStorage.setItem("token", res.data.user.token);
                    window.location.href = "/";
                });
        } catch (error) {
            set({ loading: false, user: null });
            toast.error(error.message || "signup faild");
        }
    },

    getUser: () => {

        try {

            const token = localStorage.getItem("token");
            if (!token) {
                set({ loading: false, user: null });
                return;
            }
            async function fetch_data() {
                const res = await axios.get("/auth/");
                set({ user: res.data, loading: false });
            }
            fetch_data();

        } catch (error) {
            set({ loading: false, user: null });
            localStorage.removeItem("token");
        }
    },

    getProfile: async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                set({ user: null });
                return;
            }
            const res = await axios.get("/auth/");
            set({ user: res.data });
        } catch (error) {
            set({ user: null });
            localStorage.removeItem("token");
        }
    },

    updateInfo: async (data) => {
        try {
            const _data_ = {};

            for (let info in data) {
                if (data[info]?.trim()) {
                    _data_[info] = data[info];
                }
            };

            if (JSON.stringify(_data_) === '{}') {
                return toast.error("please fill the app input");
            }

            set({ loading: true });
            await axios.put("/auth/update_address", _data_)
                .then(res => {
                    set({ user: res.data, loading: false });

                });

        } catch (error) {
            set({ user: null, lodading: false });
            localStorage.removeItem("token");
        }
    },

    updateProfile: async (data) => {
        try {
            const filteredData = {};

            for (let key in data) {
                if (data[key] !== "" && data[key] !== null && data[key] !== undefined) {
                    filteredData[key] = data[key];
                }
            }

            if (JSON.stringify(filteredData) === "{}") {
                return toast.error("please fill the app input");
            }

            // EMAIL VALIDATION
            if ("email" in filteredData && !("oldEmail" in filteredData)) {
                return toast.error("Old email is required to change email");
            }
            if (!("email" in filteredData) && "oldEmail" in filteredData) {
                return toast.error("Email is required");
            }
            if ("email" in filteredData && "oldEmail" in filteredData) {
                if (filteredData.email === filteredData.oldEmail) {
                    return toast.error("Old email and new email cannot be the same");
                }
            }

            // PASSWORD VALIDATION
            const hasPasswordField =
                "password" in filteredData ||
                "oldPassword" in filteredData ||
                "confirmPassword" in filteredData;

            if (hasPasswordField) {
                if (!("oldPassword" in filteredData)) return toast.error("Old password is required");
                if (!("password" in filteredData)) return toast.error("New password is required");
                if (!("confirmPassword" in filteredData)) return toast.error("Confirm password is required");
                if (filteredData.password !== filteredData.confirmPassword) {
                    return toast.error("Passwords do not match");
                }
            }

            delete filteredData.oldEmail;
            delete filteredData.confirmPassword;

            // Convert to FormData
            const fd = new FormData();
            for (let key in filteredData) {
                fd.append(key, filteredData[key]);
            }
            set({ loading: true });
            await axios.put("/auth/update_profile", fd, {
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then(res => {
                    set({ loading: false, user: res.data });
                });

            toast.success("Profile updated successfully");

        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Something went wrong");
            console.log(error);
        }
    }

}));