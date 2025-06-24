const API_URL = import.meta.env.VITE_API_URL
import axiosInstance from './axiosinstance'

export const UserMe = async () => {
    const userData = await axiosInstance.get(`${API_URL}/user/me`)
    return userData.data
}


export const CreateApplicationApi = async (applicationData) => {
    try {
        const response = await axiosInstance.post(
            `${API_URL}/user/application/create`,
            {
                full_name: applicationData.full_name,
                student_id_number: applicationData.student_id_number,
                gpa: applicationData.gpa,
                faculty: applicationData.faculty,
                group: applicationData.group,
                id: applicationData.id,
                image_path: applicationData.image_path,
            },
        );

        return await response.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail);
    }
};

export const GetApplications = async () => {
    const application = await axiosInstance.get(`${API_URL}/admin/applications/get_all`)
    return application.data
}
export const GetUserApplications = async () => {
    const application = await axiosInstance.get(`${API_URL}/user/application/get_all`)
    return application.data
}

export const downloadApplicationPdf = async (applicationId) => {
    try {
        const response = await axiosInstance.get(
            `${API_URL}/user/application/download/${applicationId}`,
            {
                responseType: "blob", // blob kerak, chunki bu fayl
            }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `application_${applicationId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Faylni yuklab olishda xatolik:", error);
        alert("Faylni yuklab bo‘lmadi.");
    }
};
export const downloadApplicationResponsePdf = async (applicationId) => {
    try {
        const response = await axiosInstance.get(
            `${API_URL}/user/application/download/response/${applicationId}`,
            {
                responseType: "blob", // blob kerak, chunki bu fayl
            }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `application_${applicationId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Faylni yuklab olishda xatolik:", error);
        alert("Faylni yuklab bo‘lmadi.");
    }
};

export const downloadApplicationAdminPdf = async (applicationId) => {
    try {
        const response = await axiosInstance.get(
            `${API_URL}/admin/applications/download/${applicationId}`,
            {
                responseType: "blob", // blob kerak, chunki bu fayl
            }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `application_${applicationId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Faylni yuklab olishda xatolik:", error);
        alert("Faylni yuklab bo‘lmadi.");
    }
};
