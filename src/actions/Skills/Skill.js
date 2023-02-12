import axiosInstance from "../Axiosinstance";

export const AddSkills = async (body, id) => {
    const res = await axiosInstance.post(`/skill/add/${id}`, body);
    return res;
};

export const EditSkills = async (body, id) => {
    const res = await axiosInstance.post(`/skill/edit/${id}`, body);
    return res;
};

export const RemoveSkills = async (id) => {
    const res = await axiosInstance.delete(`/skill/remove/${id}`);
    return res;
};