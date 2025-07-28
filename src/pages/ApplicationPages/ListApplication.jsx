import React, {useState, forwardRef, useEffect} from "react";
import {useQuery, useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";

import {MdDelete} from "react-icons/md";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    Button,
    Dialog,
    Slide
} from '@mui/material';
import {MdCancel} from "react-icons/md";
import {
    downloadApplicationThreePdf,
    downloadApplicationTwoPdf,
    GetApplicationApi,
    GetStatusConfirmApi
} from "../../Api/UserApi.jsx";
import {FaDownload} from "react-icons/fa";


// const Transition = forwardRef(function Transition(props, ref) {
//     return <Slide direction="left" ref={ref} {...props} />; // direction `right` bo‘lsa — chapdan chiqadi
// });


function ListApplication() {
    const [isModalOpen, setIsModalOpen] = useState(null);
    const [open, setOpen] = useState(false);


    const {isError, isSuccess, isLoading, data: applications, error, refetch} = useQuery({
        queryKey: ["list-application"],
        queryFn: GetApplicationApi,
    });

    const {data: statusConfirm, refetch: refetchConfirm} = useQuery({
        queryKey: ["status-application"],
        queryFn: GetStatusConfirmApi,
    });


    return (

        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-x-auto">

                <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Yuborilgan ariza</h2>
                    <table className="w-full min-w-[600px]">
                        <thead>
                        <tr className="text-left bg-gray-50">
                            <th className="p-3 text-gray-600">Ariza raqami</th>
                            <th className="p-3 text-gray-600">Ta'lim yunalishi</th>
                            <th className="p-3 text-gray-600 ">Ta'lim turi</th>
                            <th className="p-3 text-gray-600 ">Izoh</th>
                            <th className="p-3 text-gray-600 ">Ikki tamonlama shartnoma</th>
                            <th className="p-3 text-gray-600 ">Uch tamonlama shartnoma</th>
                            <th className="p-3 text-gray-600 ">Tavsiya</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{applications?.map((application, index) => {*/}
                        {applications && (
                            <tr className="border-t" key={applications?.id}>
                                <td className="p-3 ">{applications?.id}</td>
                                <td className="p-3 ">{applications?.study_direction?.name}</td>
                                <td className="p-3 ">{applications?.study_type?.name}</td>
                                <td className="p-3 "><span className="text-green-600">Arizangiz qabul qilindi.</span>
                                    <br/> Imtihon vaqti to'g'risida qabul
                                    komissiyasi tomonidan qo'shimcha ma'lumot beriladi
                                </td>
                                <td>
                                    {
                                        statusConfirm === true ? (
                                            <button
                                                onClick={() => downloadApplicationTwoPdf(applications?.id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2"
                                            >
                                                <FaDownload/>
                                            </button>
                                        ) : (
                                            <span className="text-yellow-600"> Jarayonda...</span>
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        statusConfirm === true ? (
                                            <button
                                                onClick={() => downloadApplicationThreePdf()}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2"
                                            >
                                                <FaDownload/>
                                            </button>
                                        ) : (
                                            <span className="text-yellow-600"> Jarayonda...</span>
                                        )
                                    }

                                </td>
                                <td>
                                    {
                                        statusConfirm === true ? (
                                            <span className="text-green-600">Siz talabalikka tavsiya etildingiz</span>
                                        ) : (
                                            <span className="text-yellow-600">Jarayonda...</span>
                                        )
                                    }

                                </td>

                            </tr>
                        )

                        }
                        {/*})}*/}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListApplication;
