// import React from "react";
// import {useQuery} from "@tanstack/react-query";
// import {UserMe} from "../Api/UserApi.jsx";
//
// function RatingBook() {
//     const {isError, isSuccess, isLoading, data, error, refetch} = useQuery({
//         queryKey: ['userMe'],
//         queryFn: UserMe,
//     })
//
//
//     return (
//         <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800">Reyting daftarcha</h2>
//
//
//             <div className="bg-white rounded-lg shadow">
//                 <div className="p-4 border-b bg-gray-50">
//                     <h3 className="text-lg font-semibold text-gray-800">
//                         {data?.level}
//                     </h3>
//                 </div>
//                 <div className="p-4 overflow-x-auto">
//                     <table className="w-full min-w-[800px]">
//                         <thead>
//                         <tr className="text-left">
//                             <th className="p-3 text-gray-600">Fan nomi</th>
//
//                             <th className="p-3 text-gray-600">Baho</th>
//                             <th className="p-3 text-gray-600">semestr</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {data?.subjects?.map((item, index) => (
//                             <tr key={index} className="border-t">
//                                 <td className="px-4 py-2">{item?.subject}</td>
//                                 <td className="px-4 py-2 font-medium">{item?.gade}</td>
//                                 <td className="px-4 py-2 font-medium">{item?.subjec_code - 10}</td>
//                             </tr>
//                         ))}
//
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="p-4 border-t bg-gray-50">
//                     <div className="flex justify-between text-sm">
//                         <span>O'rtacha ball: {data?.gpa*16}</span>
//                         <span>GPA: {data?.gpa}</span>
//                     </div>
//                 </div>
//             </div>
//
//         </div>
//     );
// }
//
// export default RatingBook;
