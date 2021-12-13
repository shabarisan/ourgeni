import axios from 'axios';
import configData from '../../constants.json';


export function fetchEducationProviderList()
{
    return axios.post(configData.allpApiUrl + 'listing/education-listing')
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}
export function fetchEducationServiceList()
{
    return axios.get(configData.allpApiUrl + 'listing/education-listing/service-list')
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}
export function fetchFilterProvidersList(name,city,obj)
{
    return axios.post(configData.allpApiUrl + 'listing/education-listing',null,{ params: {
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
export function fetchAreasList()
{
    return axios.get(configData.allpApiUrl+'all-areas')
    .then(res => res.data
    ).catch(err => {
        console.log(err); 
    });
}
export function fetchEducationListDetails(ServiceId)
{
    return axios.get(configData.allpApiUrl + 'listing/education-listing/' + ServiceId)
    .then(res => res.data
    ).catch(err =>err);
}