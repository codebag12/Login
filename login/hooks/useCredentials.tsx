import { useContext, useRef, useState } from "react";
import  {UserContext} from "../context/UserContext";

export const useCredentials = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const users = useContext(UserContext);
    const user123 =useRef();
    const pass123 =useRef();

    return {username, setUsername,password, setPassword,users,user123,pass123}

}