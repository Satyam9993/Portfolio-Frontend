import axiosInstance from "../Axiosinstance";

export const AddExperience = async (body, id) => {
    const res = await axiosInstance.post(`/experience/add/${id}`, body);
    return res;
};

export const editExperience = async (body, expId) => {
    const res = await axiosInstance.post(`/experience/edit/${expId}`, body);
    return res;
};

export const removeExperience = async (expId) => {
    const res = await axiosInstance.delete(`/experience/remove/${expId}`);
    return res;
};