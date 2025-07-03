// import React, {useState} from "react";
// import {useQuery, useMutation} from "@tanstack/react-query";
//
// 5
// import toast from "react-hot-toast";
// import {Link} from "react-router-dom";
// import {FaDownload, FaRegEdit} from "react-icons/fa";
//
// import {MdDelete} from "react-icons/md";
// import {
//     downloadApplicationAdminPdf,
//     downloadApplicationPdf,
//     GetApplications,
//     GetTotalApplications
// } from "../Api/UserApi.jsx";
//
// function ListApplication() {
//     const [limit, setLimit] = useState(25);
//     const [offset, setOffset] = useState(0);
//     const [isModalOpen, setIsModalOpen] = useState(null);
//
//     const {isError, isSuccess, isLoading, data: application, error, refetch} = useQuery({
//         queryKey: ["list-application", limit, offset, 3.5],
//         queryFn: () => GetApplications({limit, offset, min_gpa: 3.5 }),
//     });
//     const {data: total} = useQuery({
//         queryKey: ["total-application"],
//         queryFn: () => GetTotalApplications(),
//     });
//
//     const totalApplications = total?.high || 0;
//     const totalPages = Math.ceil(totalApplications / limit);
//     const currentPage = Math.floor(offset / limit) + 1;
//
//     const nextPage = () => {
//         if (offset + limit < totalApplications) setOffset(prev => prev + limit);
//     };
//
//     const prevPage = () => {
//         if (offset > 0) setOffset(prev => Math.max(prev - limit, 0));
//     };
//
//
//     return (
//         <div className="space-y-6">
//            <div className="flex justify-between">
//                <h2 className="text-2xl font-bold text-gray-800">Arizalar ro'yxati</h2>
//                <h2 className="text-2xl text-gray-800 pr-20">Barcha arizalar soni: <span className="font-bold text-green-500">{totalApplications}</span></h2>
//            </div>
//             <div className="bg-white rounded-lg shadow overflow-x-auto">
//                 <div className="p-4">
//                     <table className="w-full min-w-[700px]">
//                         <thead>
//                         <tr className="text-left bg-gray-50">
//                             <th className="p-3 text-gray-600">№</th>
//                             <th className="p-3 text-gray-600">Talaba ism familyasi</th>
//                             <th className="p-3 text-gray-600">Fakultet</th>
//                             <th className="p-3 text-gray-600">Guruh</th>
//                             <th className="p-3 text-gray-600">GPA</th>
//                             <th className="p-3 text-gray-600">Akademik o'zlashtirish</th>
//                             <th className="p-3 text-gray-600 flex justify-center">Ariza</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {application?.map((student, index) => (
//                             <tr className="border-t" key={student.id}>
//                                 <td className="p-3">{offset + index + 1}</td>
//                                 <td className="p-3">{student.full_name}</td>
//                                 <td className="p-3">{student.faculty}</td>
//                                 <td className="p-3">{student.group}</td>
//                                 <td className="p-3">{student.gpa}</td>
//                                 <td className="p-3">{student.gpa * 16}</td>
//                                 <td className="p-3 flex justify-center items-center">
//                                     <button
//                                         onClick={() => downloadApplicationAdminPdf(student.id)}
//                                         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
//                                     >
//                                         <FaDownload/>
//                                     </button>
//                                 </td>
//                             </tr>
//
//                         ))}
//                         </tbody>
//                     </table>
//                 </div>
//
//                 {/* Pagination controls */}
//                 <div className="flex justify-between items-center px-20 pb-4">
//                     <button
//                         onClick={prevPage}
//                         disabled={offset === 0}
//                         className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
//                     >
//                         Oldingi
//                     </button>
//
//                     <span className="text-sm text-gray-600">
//                         Sahifa: {currentPage} / {totalPages || 1}
//                     </span>
//
//                     <button
//                         onClick={nextPage}
//                         disabled={offset + limit >= totalApplications}
//                         className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
//                     >
//                         Keyingi
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default ListApplication;
