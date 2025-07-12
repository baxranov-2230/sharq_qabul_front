import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;

import axiosInstance from "./axiosinstance";

export const saveTokens = (accessToken) => {
    localStorage.setItem(
        "token",
        JSON.stringify({access_token: accessToken})
    );
};

export const RegisterSMSApi = async (registerData) => {
    console.log(registerData)
    try {
        const response = await axios.post(
            `${API_URL}/api/sms/send-verification`,
            {
                phone_number: registerData.phone_number,
                // password: registerData.password,
                // verification_code: registerData.verification_code,
            },
            {
                headers: {
                    "Content-Type": "application/json", // 🔐 juda muhim!
                },
            }
        );

        return await response.data;
    } catch (error) {
        console.log(error.response.data)
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail);
    }
};

export const RegisterApi = async (registerData) => {

    try {
        const response = await axios.post(
            `${API_URL}/api/sms/register`,
            {
                phone_number: registerData.phone_number,
                password: registerData.password,
                verification_code: registerData.verification_code,
            },
            {
                headers: {
                    "Content-Type": "application/json", // 🔐 juda muhim!
                },
            }
        );
        if (response.data.access_token) {
            const {access_token} = response.data;
            saveTokens(access_token);
            // localStorage.setItem("token", JSON.stringify(response.data));
        }
        return await response.data;
    } catch (error) {
        console.log(error.response.data)
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail);
    }
};

export const PassportApi = async (passportData) => {

    try {
        const response = await axiosInstance.post(
            `${API_URL}/api/passport_data/create`,
            {
                passport_series_number: passportData.passport_series_number,
                jshshir: passportData.jshshir,
            },
            {
                headers: {
                    "Content-Type": "application/json", // 🔐 juda muhim!
                },
            }
        );
        return await response.data;
    } catch (error) {
        console.log(error.response.data)
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail);
    }
};

export const LoginApi = async (loginData) => {
    const response = await axios.post(
        `${API_URL}/api/auth/login`,
        new URLSearchParams({
            username: loginData.username,
            password: loginData.password,
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    if (response.data.access_token) {
        const {access_token} = response.data;
        saveTokens(access_token);
        // localStorage.setItem("token", JSON.stringify(response.data));
    }

    return response.data;
};
// export const logout = async () => {
//     const token = JSON.parse(localStorage.getItem("token"));
//
//     try {
//         const response = axiosInstance.put(
//             `${API_URL}/user/logout`,
//             {}, // Agar kerak bo'lsa, payloadni bo'sh obyekt sifatida yuboring
//             {
//                 headers: {
//                     Authorization: `Bearer ${token.access_token}`, // Authorization headerni yuborish
//                 },
//             }
//         );
//
//         localStorage.removeItem("token");
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : new Error("Xatolik yuz berdi");
//     }
// };
