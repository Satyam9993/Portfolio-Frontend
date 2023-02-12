import axiosInstance from "../Axiosinstance";

export const editAboutme = async (body, id) => {
    const res = await axiosInstance.post(`/about/edit/${id}`, body);
    return res;
};

export const editProfilePhoto = async (body, id) => {
    const res = await axiosInstance.post(`/about/editprofilephoto/${id}`, body);
    return res;
};