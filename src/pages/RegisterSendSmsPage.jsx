import {useEffect, useState} from "react";
import {
    Card,
    Input,
    Checkbox,
    // Button,
    Typography,
} from "@material-tailwind/react";
import {IMaskInput} from 'react-imask';
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {replace, useFormik} from "formik";
import * as Yup from "yup";
import {LoginApi, RegisterSMSApi} from "../Api/LoginApi";
import {LogIn} from 'lucide-react'
import {GrHide} from "react-icons/gr";
import {BiShow} from "react-icons/bi";

import Logo from "../assets/images/logo.png";
import Sharq from "../assets/images/sharq.jpg";
import {FaArrowRightLong} from "react-icons/fa6";

export default function RegisterSendSmsPage() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };
    const registerMutation = useMutation({
        mutationKey: ["register-user"],
        mutationFn: RegisterSMSApi,
        onSuccess: (data) => {
            toast.success(data.message || "Successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const isSuccess = registerMutation.isSuccess;

    useEffect(() => {
        if (isSuccess) {
            navigate("/register");
            window.location.reload();
        }
    }, [navigate, isSuccess]);
    const formik = useFormik({
        initialValues: {
            phone_number: "",
            // password: "",
            // verification_code: "",
        },
        validationSchema: Yup.object({
            phone_number: Yup.string().required("Telefon raqami majburiy"),
            // password: Yup.string().required("password is required"),
            // verification_code: Yup.string().required("password is required"),
        }),
        onSubmit: (values) => {
            const registerData = {
                phone_number: values.phone_number,
                // password: values.password,
                // verification_code: values.verification_code,
            };
            registerMutation.mutate(registerData);
        },
    });
    return (
        <div className="bg-gray-100 w-full flex mt-[10%] min-h-[80%] justify-center items-center  overflow-hidden">
            <div
                className="bg-white rounded-lg shadow-lg w-full max-w-6xl h-[80%] md:h-[80%] flex flex-col md:flex-row overflow-hidden">
                {/* Chap qism */}
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="flex justify-center mb-6">
                        <img src={Logo} className="w-44"/>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Ro'yxatdan o'tish
                    </h2>


                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Telefon raqam
                            </label>
                            <IMaskInput
                                mask="+{998}-00-000-00-00"
                                name="phone_number"
                                value={formik.values.phone_number}
                                onChange={(e) => {
                                    const onlyDigits = e.target.value.replace(/\D/g, '');
                                    formik.setFieldValue("phone_number", onlyDigits);
                                }}
                                // onAccept={(value) => {
                                //     // const onlyDigits = e.target.value.replace(/\D/g, '');
                                //     formik.setFieldValue("phone_number", value); // To‘liq format bilan
                                // }}
                                onBlur={formik.handleBlur}
                                className="border rounded px-3 py-2 w-full"
                                placeholder="+998 (__) ___-__-__"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 font-semibold"
                        >
                            Ro'yxatdan o'tish
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <Link to="/login" className="flex justify-center items-center font-semibold text-gray-500 hover:underline pl-3">
                            Loginga o'tish <FaArrowRightLong className="ml-2 text-blue-500"/>
                        </Link>
                    </div>
                </div>

                {/* O‘ng qism */}
                <div className="relative  md:w-1/2 flex  justify-center items-center bg-[#1c4c84] rounded-lg">
                    <img src={Sharq} className="w-full h-full  object-coverv  rounded-tl-lg rounded-bl-lg"
                         alt=""/>
                    <div
                        className="absolute opacity-0 opacity-100 flex bottom-0 left-0 w-full bg-white/15 backdrop-blur-md px-4 py-6 justify-center border-t-2 rounded-bl-lg">
                        <h2 className="text-white text-4xl md:text-4xl font-bold">Sharq universiteti</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
