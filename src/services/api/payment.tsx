import axios from 'axios';
import { useHistory } from "react-router-dom";

export const PaymentRequest = async (url,paymentInfo) => {
    const formData = new FormData();
    for( const key in paymentInfo){
        let keys = key;
        let value = paymentInfo[key];
       formData.append(keys,value)
    }
    try {
        const resp = await axios.post('https://sandboxsecure.payu.in/_payment', formData);
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
       
    }
};