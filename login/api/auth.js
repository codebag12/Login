import { baseURL } from "./config"

export const login = async() => {
    const request = await fetch(baseURL+"/users") 
    const json = await request.json();
    console.log(json);
}