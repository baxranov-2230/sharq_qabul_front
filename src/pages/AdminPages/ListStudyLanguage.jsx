import React, {useState, forwardRef, useEffect} from "react";
import {useQuery, useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import {FaRegEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    Button,
    Dialog,
    Slide
} from '@mui/material';
import {MdCancel} from "react-icons/md";
import {GetAllStudyLanguageApi, DeleteStudyLanguageApi, CreateStudyLanguageApi} from "../../Api/AdminApi.jsx";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />; // direction `right` bo‘lsa — chapdan chiqadi
});



function ListStudyLanguage() {
    const [isModalOpen, setIsModalOpen] = useState(null);
    const [open, setOpen] = useState(false);


    const {isError, isSuccess, isLoading, data, error, refetch} = useQuery({
        queryKey: ["list-language"],
        queryFn: (languageId) => GetAllStudyLanguageApi(languageId),
    });

    const languageMutation = useMutation({
        mutationKey: ["delete-language"],
        mutationFn: DeleteStudyLanguageApi,
        onSuccess: (data) => {
            toast.success(data.message || "Til muvaffaqiyatli o'chirildi");
        }, onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });
    const languageCreateMutation = useMutation({
        mutationKey: ["create-language"],
        mutationFn: CreateStudyLanguageApi,
        onSuccess: (data) => {
            toast.success(data.message || "Til muvaffaqiyatli yaratildi");
            handleClose();
            formik.resetForm(); // 👈 input qiymatlarini tozalash
            refetch(); // malumotlarni yangilash
        }, onError: (error) => {
            toast.error(error.message || "Xatolik yuz berdi");
        },
    });
    const formik = useFormik({
        initialValues: {
            name: "",
        }, validationSchema: Yup.object({
            name: Yup.string().required("!!! To'ldirish shart"),
        }), onSubmit: (values) => {
            const studyLanguageDate = {
                name: values.name,
            };
            languageCreateMutation.mutate(studyLanguageDate);
        },
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDeleteClick = (languageId) => {
        setIsModalOpen(languageId); // Modalni ochish
    };
    const deleteHandler = async (languageId) => {
        languageMutation
            .mutateAsync(languageId)
            .then(() => {
                refetch();
            })
            .catch((e) => console.log(e));
    };
    const cancelDelete = () => {
        setIsModalOpen(null);
    };



    return (<div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Ta'lim tillari</h2>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Yangi qo'shish
            </Button>
        </div>
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            keepMounted
            // hideBackdrop // orqa fon qoraroq bo'ladi
            PaperProps={{
                sx: {
                    position: "fixed",
                    right: 15,
                    top: 20,
                    m: 0,
                    borderRadius: 2,
                    width: 500,
                    // height: "80vh",
                },
            }}
        >
            <div className="flex items-center justify-between p-4">
                <p className="text-2xl font-bold text-gray-800">Yangi til qo'shish</p>
                <button className="text-red-600 text-2xl" onClick={handleClose}><MdCancel/></button>
            </div>
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b bg-gray-100  ">
                    <form
                        onSubmit={formik.handleSubmit}
                        className="flex flex-col  gap-3"
                    >
                        <div className="w-full">
                            <label htmlFor="name"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Ta'lim tilini kiriting
                            </label>
                            <input type="text"
                                   id="name"
                                   name="name"
                                   {...formik.getFieldProps("name")}
                                   className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"/>

                        </div>
                        <button type="submit"
                                className="focus:outline-none w-fit  text-white bg-[#3697A5] hover:bg-[#369796]  font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                            Qo'shish
                        </button>
                    </form>
                </div>
            </div>


        </Dialog>

        <div className="bg-white rounded-lg shadow">
            <div className="p-4">
                <table className="w-full">
                    <thead>
                    <tr className="text-left bg-gray-50">
                        <th className="p-3 text-gray-600">№</th>
                        <th className="p-3 text-gray-600">Ta'lim tili</th>
                        <th className="p-3 text-gray-600 text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.map((language, index) => {
                        return (<tr className="border-t" key={language?.id}>
                            <td className="p-3 ">{index + 1}</td>
                            <td className="p-3 ">{language?.name}</td>
                            <td className="p-3">
                                <div className="flex justify-center">
                                    {/*<Link*/}
                                    {/*    className=" flex items-center justify-start   pr-8"*/}
                                    {/*    to={`/update-category/${category?.category_id}`}*/}
                                    {/*>*/}
                                    {/*    <button><FaRegEdit className="text-2xl text-[#3697A5]"/></button>*/}
                                    {/*</Link>*/}
                                    <button
                                        className="flex items-center justify-start  "
                                        // onClick={() => deleteHandler(faculty?.id)}
                                        onClick={() => handleDeleteClick(language?.id)}
                                    >
                                        <MdDelete className="text-2xl text-red-600"/>
                                    </button>
                                    {isModalOpen === language?.id && (<div
                                        className="fixed inset-0 flex items-center justify-center bg-gray-500/50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg">
                                            <h2 className="text-lg font-semibold mb-4">
                                                Haqiqatan ham o‘chirmoqchimisiz?
                                            </h2>
                                            <p className="mb-6">
                                                            <span className="text-red-600">
                                                             {language?.name || "Bu element"}
                                                             </span>{" "}
                                                ni o‘chirishni tasdiqlaysizmi?
                                            </p>
                                            <div className="flex justify-end gap-4">
                                                <button
                                                    className="px-4 py-2 bg-gray-300 rounded "
                                                    onClick={cancelDelete}
                                                >
                                                    Bekor qilish
                                                </button>
                                                <button
                                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                                    onClick={() => deleteHandler(language?.id)}
                                                >
                                                    O‘chirish
                                                </button>

                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}

export default ListStudyLanguage;
