const API_URL = import.meta.env.VITE_API_URL;

import axiosInstance from "./axiosinstance";


export const GetPassportApi = async () => {
    try {
        const passport = await axiosInstance.get(`${API_URL}/api/passport_data`);
        return passport.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null; // ❗️Passport topilmadi — null qaytaramiz
        }
        throw error; // boshqa xatoliklarda fallback
    }
};