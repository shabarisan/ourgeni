import axios from 'axios';
import configData from '../../constants.json';


export function fetchProductCategory()
{
    return axios.post(configData.allpApiUrl +'households' )
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}
export function fetchProductList(id)
{
    return axios.get(configData.allpApiUrl + `household/${id}` )
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}

export function fetchProductsDetails(id,productName)
{
    return axios.get(configData.allpApiUrl + `estore/${productName}/${id}` )
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}


export function fetchFilterProductList(obj , id)
{
    console.log("fetchFilterProductList",id , obj)
    return axios.get(configData.allpApiUrl + `household/${id}`,{ params: {
        cat_id:obj?.catID,
        brand_id:obj?.brandID,
        overall_rating:obj?.overall_rating,

      }})   
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}