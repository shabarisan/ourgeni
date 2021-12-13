import axios from 'axios';
import configData from '../../constants.json';

export async function fetchDeliveryAddres()
{
    return axios.get(configData.allpApiUrl +'getdeliveryaddress/' + localStorage.getItem('UserId'))
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}

export async function addDeliveryAddress(PostData) 
{
    return  axios.post(configData.deliveryAddressApiUrl, PostData)
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}

export async function updateDeliveryAddress(PostData)
{
    return axios.post(configData.allpApiUrl + 'update-my-address', PostData)
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}

export async function removeDeliveryAddress(id) 
{
    return axios.get(configData.removeDeliveryAddessApiUrl + localStorage.getItem('UserId') + '/' + id)
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}

