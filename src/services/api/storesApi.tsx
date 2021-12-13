import axios from 'axios';
import configData from '../../constants.json';

export function fetchStoreCategory()
{
    return axios.post(configData.allpApiUrl +'estores' )
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}

export function fetchProductList()
{
    return axios.get(configData.allpApiUrl + `estore-finder` )
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}


export function fetchProductsDetails(id,productName)
{
    return axios.get(configData.allpApiUrl + `estore-finder/${productName}/${id}` )
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}


export function fetchFilterProductList(obj , id)
{
    return axios.get(configData.allpApiUrl + 'estore-finder',{ params: {
        cat_id:obj?.catID,
        brand_id:obj?.brandID,
        overall_rating:obj?.overall_rating,

      }})   
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}

