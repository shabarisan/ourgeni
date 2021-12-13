import axios from 'axios';
export default async function logUser(datas:any){
    axios.post('https://demo.smartstorez.com/ourgeniedemo/tempapi/user-login/',datas).
    then(res => console.log(res.data))
    .catch(err =>{
        console.log(err)
    });
    // return await axios.post("",)
    // .then(res => res.data.services
    // ).catch(err => {
    //     // Handle Error Here
    //     console.error(err); 
    // });
}