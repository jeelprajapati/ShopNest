import toast from "react-hot-toast";
import makeRequesInstance from "../makeRequest";

export const getStripeToken = async (token,cart,callback) => {
  try {
    const makeRequest = makeRequesInstance(token);
    const res = await makeRequest.post("/payment", {
      ...cart
    });

    if(res.status===200){
      callback(res.data.sessionId)
    }
    
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const updatePaymentStatus=async(token,query,callback)=>{
  try {
    const makeRequest=makeRequesInstance(token);
    const res=await makeRequest.put(`/payment/session_status?${query}`);
    if(res.status===201){
      callback();
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}