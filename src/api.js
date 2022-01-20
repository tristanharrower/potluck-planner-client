import axios from "axios";


const request = axios.create({
    baseURL:"https://lambda-build-week.herokuapp.com",
})

export default request;