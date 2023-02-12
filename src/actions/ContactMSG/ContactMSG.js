import axiosInstance from "../Axiosinstance";

export const AddContactMSG = async (body) => {
    const res = await axiosInstance.post(`/contact/add`, body);
    return res;
};

export const RemoveContactMSG = async (id) => {
    const res = await axiosInstance.delete(`/contact/remove/${id}`);
    return res;
};