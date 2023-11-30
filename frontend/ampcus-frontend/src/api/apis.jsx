import { axiosInstance } from "../utils/axiosInstance";



export const fetchMembers = async () => {
    const response = await axiosInstance.get('/member/2')
    console.log(response.data)

    return response.data
}

export const loanRequest = async (data) => {
    const response = await axiosInstance.post('/loans/', data)
    return response.data
}