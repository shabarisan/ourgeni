import axios from 'axios';
import configData from '../../constants.json';

export function fetchServiceListing()
{
    return axios.post(configData.allpApiUrl + 'listing/service-providers')
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}

export function createAccessLog()
{
    const pathname = window.location.pathname;
    const segment = pathname.substring(pathname.lastIndexOf('/') + 1);
    const accessPayload = {
        requested_values : segment,
        url : pathname,
        page : 'service_listing',
        requested_from : 'desktop',
        browser_type : navigator.userAgent
    }
    
    return axios.post(configData.allpApiUrl + 'fron-end-access-logs',accessPayload)
    .then(res => 
        res.data
    ).catch(err => {
        console.log(err); 
    });
}

export function fetchServiceListingByService(ServiceId)
{
    const postData = {service_id : ServiceId};
    return axios.post(configData.allpApiUrl + 'listing/service-providers',postData)
    .then(res => 
        res.data
    ).catch(err => {
        console.log(err); 
    });
}

export function fetchServiceListingServiceList()
{
    return axios.get(configData.allpApiUrl + 'listing/service-providers/service-list')
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}

export function fetchServiceListingDetails(ServiceId)
{
    return axios.get(configData.allpApiUrl + 'listing/service-providers/' + ServiceId)
    .then(res => res.data
    ).catch(err =>err);
}

export function fetchAreasList()
{
    return axios.get(configData.allpApiUrl+'all-areas')
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}


export function fetchReview(formData)
{
    return axios.post(configData.allpApiUrl + 'review-lists',formData)
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}

export function fetchFilterProvidersList(name,city,obj)
{
    
    return axios.post(configData.allpApiUrl + 'listing/service-providers',null,{ params: {
        area_id:city?city.id:null,
        service_name_qry:name,
        service_id:obj?.serviceId,
        orderby:obj?.orderby

      }})   
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}