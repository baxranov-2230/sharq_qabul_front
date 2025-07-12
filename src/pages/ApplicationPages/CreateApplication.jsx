import React, {useEffect} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {FormControl, FormControlLabel,  FormLabel, InputLabel, Radio,  RadioGroup, Select} from "@mui/material";

// import {CreateCategoryApi} from "../../Api/CategoryApi.jsx";

function CreateStudyLanguage() {
    const navigate = useNavigate();
    // const categoryMutation = useMutation({
    //     mutationKey: ["create-category"], mutationFn: CreateCategoryApi, onSuccess: (data) => {
    //         toast.success(data.message || "Categoriya muvaffaqiyatli yaratildi");
    //     }, onError: (error) => {
    //         toast.error(error.message || "Xatolik yuz berdi");
    //     },
    // });
    // const formik = useFormik({
    //     initialValues: {
    //         name_uz: "", name_ru: "", name_en: "",
    //     }, validationSchema: Yup.object({
    //         name_uz: Yup.string().required("!!! To'ldirish shart"),
    //         name_ru: Yup.string().required("!!! To'ldirish shart"),
    //         name_en: Yup.string().required("!!! To'ldirish shart"),
    //     }), onSubmit: (values) => {
    //         // setFormData(values);
    //         const categoryDate = {
    //             name_uz: values.name_uz,
    //             name_ru: values.name_ru,
    //             name_en: values.name_en,
    //         };
    //         categoryMutation.mutate(categoryDate);
    //     },
    // });
    // const isSuccess = categoryMutation.isSuccess;
    // useEffect(() => {
    //     if (isSuccess) {
    //         navigate("/list-category");
    //     }
    // }, [navigate, isSuccess]);


    return (<div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Kategoriya qo'shish</h2>


        <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b bg-gray-50  ">
                <form>

                    <div className="grid md:grid-cols-2 gap-3">
                        {/*<div className="w-full">*/}
                        {/*    <label htmlFor="name_uz"*/}
                        {/*           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*/}
                        {/*        Uzbekcha*/}
                        {/*    </label>*/}


                        {/*    <input type="text"*/}
                        {/*           id="name_uz"*/}
                        {/*           name="name_uz"*/}

                        {/*           className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>*/}

                        {/*</div>*/}
                        <div className="w-full">
                            <p className="mb-2 text-md font-medium text-gray-900 dark:text-white">O'qish turini tanlang</p>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">O'qish turini tanlang</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={formik.values.facultyId}
                                    label="Fakultet"
                                    name="facultyId"
                                    // onChange={formik.handleChange}
                                >
                                    {/*{isLoading ? (*/}
                                    {/*    <MenuItem disabled>Loading...</MenuItem>*/}
                                    {/*) : (*/}
                                    {/*    data?.map((faculty) => (*/}
                                    {/*        <MenuItem key={faculty?.faculty_id} value={faculty?.faculty_id}>*/}
                                    {/*            {faculty?.faculty_name_uz}*/}
                                    {/*        </MenuItem>*/}
                                    {/*    ))*/}
                                    {/*)}*/}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="w-full">
                            <p className="mb-2 text-md font-medium text-gray-900 dark:text-white">Tugatgan ta'lim muassasa turini tanlang</p>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tugatgan ta'lim muassasa turini tanlang</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={formik.values.facultyId}
                                    label="Fakultet"
                                    name="facultyId"
                                    // onChange={formik.handleChange}
                                >
                                    {/*{isLoading ? (*/}
                                    {/*    <MenuItem disabled>Loading...</MenuItem>*/}
                                    {/*) : (*/}
                                    {/*    data?.map((faculty) => (*/}
                                    {/*        <MenuItem key={faculty?.faculty_id} value={faculty?.faculty_id}>*/}
                                    {/*            {faculty?.faculty_name_uz}*/}
                                    {/*        </MenuItem>*/}
                                    {/*    ))*/}
                                    {/*)}*/}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="w-full">
                            <label htmlFor="name_uz"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Bitirgan yilingizni kiriting
                            </label>


                            <input type="number"
                                   id="name_uz"
                                   name="name_uz"
                                   placeholder="2020"
                                   className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>

                        <div className="w-full">
                            <p className="mb-2 text-md font-medium text-gray-900 dark:text-white">Ta'lim shaklini tanlang</p>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Ta'lim shaklini tanlang</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={formik.values.facultyId}
                                    label="Fakultet"
                                    name="facultyId"
                                    // onChange={formik.handleChange}
                                >
                                    {/*{isLoading ? (*/}
                                    {/*    <MenuItem disabled>Loading...</MenuItem>*/}
                                    {/*) : (*/}
                                    {/*    data?.map((faculty) => (*/}
                                    {/*        <MenuItem key={faculty?.faculty_id} value={faculty?.faculty_id}>*/}
                                    {/*            {faculty?.faculty_name_uz}*/}
                                    {/*        </MenuItem>*/}
                                    {/*    ))*/}
                                    {/*)}*/}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="w-full">
                            <p className="mb-2 text-md font-medium text-gray-900 dark:text-white">Ta'lim tilini tanlang</p>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Ta'lim tilini tanlang</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={formik.values.facultyId}
                                    label="Fakultet"
                                    name="facultyId"
                                    // onChange={formik.handleChange}
                                >
                                    {/*{isLoading ? (*/}
                                    {/*    <MenuItem disabled>Loading...</MenuItem>*/}
                                    {/*) : (*/}
                                    {/*    data?.map((faculty) => (*/}
                                    {/*        <MenuItem key={faculty?.faculty_id} value={faculty?.faculty_id}>*/}
                                    {/*            {faculty?.faculty_name_uz}*/}
                                    {/*        </MenuItem>*/}
                                    {/*    ))*/}
                                    {/*)}*/}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="w-full">
                            <p className="mb-2 text-md font-medium text-gray-900 dark:text-white">Ta'lim yo'nalishini tanlang</p>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Ta'lim yo'nalishini tanlang</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={formik.values.facultyId}
                                    label="Fakultet"
                                    name="facultyId"
                                    // onChange={formik.handleChange}
                                >
                                    {/*{isLoading ? (*/}
                                    {/*    <MenuItem disabled>Loading...</MenuItem>*/}
                                    {/*) : (*/}
                                    {/*    data?.map((faculty) => (*/}
                                    {/*        <MenuItem key={faculty?.faculty_id} value={faculty?.faculty_id}>*/}
                                    {/*            {faculty?.faculty_name_uz}*/}
                                    {/*        </MenuItem>*/}
                                    {/*    ))*/}
                                    {/*)}*/}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="w-full">
                            <FormControl>
                                <p className="mb-2 text-md font-medium text-gray-900 dark:text-white">Sertifikatingiz bormi?</p>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />

                                </RadioGroup>
                            </FormControl>
                        </div>


                    </div>
                    <button type="submit"
                            className="mt-4 focus:outline-none w-full text-white bg-[#154576] hover:bg-[#0361B9]  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                        Yuborish
                    </button>
                </form>
            </div>
        </div>
    </div>);
}

export default CreateStudyLanguage;
