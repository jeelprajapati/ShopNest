import toast from "react-hot-toast";
import makeRequesInstance from "../makeRequest.js";

export const sendMessage=async(token,values,callback)=>{
    try {
        const makeRequest=makeRequesInstance(token);
        const res=await makeRequest.post("/message/send",{
            ...values
        })
        if(res.status===201){
            toast.success(res.data);
            callback()
        }
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
}