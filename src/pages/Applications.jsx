// import {Plus, X} from 'lucide-react'
// import React, {useEffect, useState} from 'react'
// import toast from 'react-hot-toast'
// import {useMutation, useQuery} from "@tanstack/react-query";
// import {
//     CreateApplicationApi,
//     downloadApplicationPdf, downloadApplicationResponsePdf,
//     GetApplications,
//     GetUserApplications,
//     UserMe
// } from "../Api/UserApi.jsx";
// import {useFormik} from "formik";
// import * as Yup from "yup";
// import {Link, useNavigate} from "react-router-dom";
// import {FaDownload} from "react-icons/fa";
//
// function Applications() {
//     const [values, setValues] = useState()
//     const navigate = useNavigate();
//     const [modalOpen, setModalOpen] = useState(false)
//     const {data: applications} = useQuery({
//         queryKey: ['application'],
//         queryFn: GetUserApplications,
//     })
//     const {isError, isSuccess, isLoading, data: student, error, refetch} = useQuery({
//         queryKey: ['userMe'],
//         queryFn: UserMe,
//     })
//     useEffect(() => {
//         if (student) {
//             formik.setValues({
//                 full_name: student.full_name || "",
//                 student_id_number: student.student_id_number || "",
//                 gpa: student.gpa || "",
//                 faculty: student.faculty || "",
//                 group: student.group || "",
//                 user_id: student.id || "",
//                 image_path: student.image_path || "",
//             });
//         }
//     }, [student]);
//     const applicationMutation = useMutation({
//         mutationKey: ["create-application"], mutationFn: CreateApplicationApi, onSuccess: (data) => {
//             toast.success(data.message || "Ariza muvaffaqiyatli yaratildi");
//             // window.location.reload();
//             setModalOpen(false);
//         }, onError: (error) => {
//             toast.error(error.message || "Xatolik yuz berdi");
//             setModalOpen(false);
//         },
//     });
//     const formik = useFormik({
//         initialValues: {
//             full_name: "", student_id_number: "", gpa: "", faculty: "", group: "", user_id: "", image_path: "",
//         }, validationSchema: Yup.object({
//             full_name: Yup.string().required("!!! To'ldirish shart"),
//             student_id_number: Yup.string().required("!!! To'ldirish shart"),
//             gpa: Yup.string().required("!!! To'ldirish shart"),
//             faculty: Yup.string().required("!!! To'ldirish shart"),
//             group: Yup.string().required("!!! To'ldirish shart"),
//             user_id: Yup.string().required("!!! To'ldirish shart"),
//             image_path: Yup.string().required("!!! To'ldirish shart"),
//         }), onSubmit: (values) => {
//             applicationMutation.mutate(values);
//         },
//     });
//     return (
//         <div className="relative">
//             <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                     <h2 className="text-2xl font-bold text-gray-800">Arizalar</h2>
//                     <button
//                         className="btn-primary flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                         onClick={() => setModalOpen(true)}
//                     >
//                         <Plus className="h-5 w-5"/>
//                         <span>Yangi ariza</span>
//                     </button>
//                 </div>
//
//                 <div className="bg-white rounded-lg shadow overflow-x-auto">
//                     <div className="p-4 overflow-auto">
//                         <table className="w-full min-w-[700px]">
//                             <thead>
//                             <tr className="text-left bg-gray-50 ">
//                                 <th className="p-3 text-gray-600">Ariza ID</th>
//                                 <th className="p-3 text-gray-600">Fakultet</th>
//                                 <th className="p-3 text-gray-600">Guruh</th>
//                                 <th className="p-3 text-gray-600">GPA</th>
//                                 <th className="p-3 text-gray-600 flex justify-center">Ariza</th>
//                                 <th className="p-3 text-gray-600 ">Arizaga javob</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {applications?.map((application, index) => (
//                                 <tr key={index} className="border-t">
//                                     <td className="p-3 font-medium">{application.id}</td>
//                                     <td className="p-3">{application.faculty}</td>
//                                     <td className="p-3">{application.group}</td>
//                                     <td className="p-3">{application.gpa}</td>
//                                     <td className="p-3 flex justify-center items-center">
//                                         <button
//                                             onClick={() => downloadApplicationPdf(application.id)}
//                                             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
//                                         >
//                                             <FaDownload/>
//                                         </button>
//                                     </td>
//                                     <td className="p-3 ">
//                                         <button
//                                             onClick={() => downloadApplicationResponsePdf(application.id)}
//                                             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
//                                         >
//                                             <FaDownload/>
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//             {/* Modal */}
//             {modalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
//                         <button
//                             className="absolute top-2 right-2 text-gray-500 hover:text-black"
//                             onClick={() => setModalOpen(false)}
//                         >
//                             <X/>
//                         </button>
//                         <h3 className="text-xl font-semibold mb-4">Yangi ariza</h3>
//                         <form onSubmit={formik.handleSubmit} className="space-y-4">
//                             <div>
//                                 <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
//                                     Ism Familiya
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="full_name"
//                                     name="full_name"
//                                     {...formik.getFieldProps("full_name")}
//                                     value={student.full_name}
//                                     disabled
//                                     className="w-full mt-1 p-2 border border-gray-300 rounded"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="student_id_number" className="block text-sm font-medium text-gray-700">
//                                     ID
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="student_id_number"
//                                     name="student_id_number"
//                                     {...formik.getFieldProps("student_id_number")}
//                                     value={student.student_id_number}
//                                     disabled
//                                     className="w-full mt-1 p-2 border border-gray-300 rounded"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="gpa" className="block text-sm font-medium text-gray-700">
//                                     GPA
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="gpa"
//                                     name="gpa"
//                                     {...formik.getFieldProps("gpa")}
//                                     value={student.gpa}
//                                     disabled
//                                     className="w-full mt-1 p-2 border border-gray-300 rounded"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="faculty" className="block text-sm font-medium text-gray-700">
//                                     Fakultet
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="faculty"
//                                     name="faculty"
//                                     {...formik.getFieldProps("faculty")}
//                                     value={student.faculty}
//                                     disabled
//                                     className="w-full mt-1 p-2 border border-gray-300 rounded"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="group" className="block text-sm font-medium text-gray-700">
//                                     Guruh
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="group"
//                                     name="group"
//                                     {...formik.getFieldProps("group")}
//                                     value={student.group}
//                                     disabled
//                                     className="w-full mt-1 p-2 border border-gray-300 rounded"
//                                 />
//                             </div>
//                             <div>
//                                 <input
//                                     type="text"
//                                     id="image_path"
//                                     name="image_path"
//                                     {...formik.getFieldProps("image_path")}
//                                     value={student.image_path}
//                                     disabled
//                                     className="hidden w-full mt-1 p-2 border border-gray-300 rounded"
//                                 />
//                             </div>
//                             <div>
//
//                                 <input
//                                     type="text"
//                                     id="user_id"
//                                     name="user_id"
//                                     {...formik.getFieldProps("user_id")}
//                                     value={student.id}
//                                     disabled
//                                     className="hidden w-full mt-1 p-2 border border-gray-300 rounded"
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//                             >
//                                 Yuborish
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }
//
// export default Applications
