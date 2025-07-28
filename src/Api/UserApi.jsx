const API_URL = import.meta.env.VITE_API_URL;

import axiosInstance from "./axiosinstance";


export const GetPassportApi = async () => {
    try {
        const passport = await axiosInstance.get(`${API_URL}/api/passport_data`,);
        return passport.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const GetStudyDirectionApi = async (study_form_id) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/api/application/study_direction`, {
            params: {study_form_id}
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return [];
        }
        throw error;
    }
};

export const GetStudyTypeApi = async () => {
    try {
        const study_type = await axiosInstance.get(`${API_URL}/api/application/study_type`,);
        return study_type.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const GetStudyFormApi = async () => {
    try {
        const study_form = await axiosInstance.get(`${API_URL}/api/application/study_form`,);
        return study_form.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const GetStudyLanguageApi = async () => {
    try {
        const study_language = await axiosInstance.get(`${API_URL}/api/application/study_language`,);
        return study_language.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const GetEducationTypeApi = async () => {
    try {
        const education_type = await axiosInstance.get(`${API_URL}/api/application/education_type`,);
        return education_type.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const CreateApplicationApi = async (studentData) => {
    try {
        console.log(studentData)
        const response = await axiosInstance.post(
            `${API_URL}/api/application/create`,
            {

                study_form_id: studentData.study_form_id,
                study_direction_id: studentData.study_direction_id,
                study_type_id: studentData.study_type_id,
                education_type_id: studentData.education_type_id,
                graduate_year: studentData.graduate_year,
                study_language_id: studentData.study_language_id,
                certificate_path: studentData.certificate_path,
                dtm_sheet: studentData.dtm_sheet,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return await response.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail);
    }
};

export const GetApplicationApi = async () => {
    try {
        const application = await axiosInstance.get(`${API_URL}/api/application`,);
        return application.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const downloadApplicationTwoPdf = async () => {
    try {
        const response = await axiosInstance.get(
            `${API_URL}/api/contract/download/two_side`,
            {
                responseType: "blob", // blob kerak, chunki bu fayl
            }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `application_two.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Faylni yuklab olishda xatolik:", error);
        alert("Faylni yuklab bo‘lmadi.");
    }
};

export const downloadApplicationThreePdf = async () => {
    try {
        const response = await axiosInstance.get(
            `${API_URL}/api/contract/download/three_side`,
            {
                responseType: "blob", // blob kerak, chunki bu fayl
            }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `application_three.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Faylni yuklab olishda xatolik:", error);
        alert("Faylni yuklab bo‘lmadi.");
    }
};

export const GetStatusConfirmApi = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/api/contract/get_status`,);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

