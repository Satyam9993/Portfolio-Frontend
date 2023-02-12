import axiosInstance from "../Axiosinstance";

export const AddProjects = async (body) => {
    const res = await axiosInstance.post(`/project/add`, body);
    return res;
};

export const EditSkills = async (body, id) => {
    const res = await axiosInstance.post(`/project/edit/${id}`, body);
    return res;
};

export const RemoveProject = async (id) => {
    const res = await axiosInstance.delete(`/project/remove/${id}`);
    return res;
};