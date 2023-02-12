import axiosInstance from "../Axiosinstance";

export const AddEducationInfo = async (body) => {
    const res = await axiosInstance.post(`/education/add`, body);
    return res;
};

export const EditEducationInfo = async (body, id) => {
    const res = await axiosInstance.post(`/education/edit/${id}`, body);
    return res;
};

export const RemoveEducation = async (id) => {
    const res = await axiosInstance.delete(`/education/remove/${id}`);
    return res;
};