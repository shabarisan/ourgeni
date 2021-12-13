import axios from 'axios';
export interface IServices{
            "id":number,
            "service_name": string,
            "service_display_name": string,
            "service_url":string,
            "no_of_services":number,
            "service_img_url": string
}
export default async function FetchCategory(url,formData){
    
    return await axios.get(url,formData)
    .then(res => 
        res.data.data
    )
    .catch(err => {
        // Handle Error Here
        console.error(err); 
    });
}