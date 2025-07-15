import {useEffect, useState} from "react";
import {
    Card,
    Input,
    Checkbox,
    // Button,
    Typography,
} from "@material-tailwind/react";
import {IMaskInput} from 'react-imask';
import {useNavigate, Link} from "react-router-dom";
import toast from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {replace, useFormik} from "formik";
import * as Yup from "yup";
import {LoginApi, PassportApi} from "../Api/LoginApi";
import {LogIn} from 'lucide-react'
import {GrHide} from "react-icons/gr";
import {BiShow} from "react-icons/bi";
import {FaArrowRightLong} from "react-icons/fa6";

import Logo from "../assets/images/logo.png";
import Sharq from "../assets/images/sharq.jpg";

export default function PassportPage() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };
    const passportMutation = useMutation({
        mutationKey: ["passport-user"],
        mutationFn: PassportApi,
        onSuccess: (data) => {
            toast.success(data.message || "Successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const isSuccess = passportMutation.isSuccess;

    useEffect(() => {
        if (isSuccess) {
            navigate("/profile");
            window.location.reload();
        }
    }, [navigate, isSuccess]);
    const formik = useFormik({
        initialValues: {
            passport_series_number: "",
            jshshir: "",
        },
        validationSchema: Yup.object({
            passport_series_number: Yup.string().required("Passport seriyani kiritish shart"),
            jshshir: Yup.string().required("JSHIR kiritish shart"),
        }),
        onSubmit: (values) => {
            const passportData = {
                passport_series_number: values.passport_series_number,
                jshshir: values.jshshir,
            };
            passportMutation.mutate(passportData);
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
                        Passport ma'lumotlarni kiritish
                    </h2>


                    <form onSubmit={formik.handleSubmit}>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Passport seriya va raqami
                            </label>
                            <div className="relative">
                                <input
                                    placeholder="AD1234567"
                                    type={"text" }
                                    name="passport_series_number"
                                    {...formik.getFieldProps("passport_series_number")}
                                    className=" w-full  px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    required
                                />

                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                JSHIRni kiriting
                            </label>
                            <div className="relative">
                                <input
                                    placeholder="31025489778941"
                                    type={"text" }
                                    name="jshshir"
                                    {...formik.getFieldProps("jshshir")}
                                    className=" w-full  px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    required
                                />

                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 font-semibold"
                        >
                            Kirish
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <Link to="/login" className="flex justify-center items-center font-semibold text-gray-500 hover:underline pl-3">
                            Loginga o'tish o'tish <FaArrowRightLong className="ml-2 text-blue-500"/>
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
