import { useState } from 'react'
import Cookies from 'universal-cookie';
import Axios from "axios"

function Login({setIsAuth}) {
    const [userName , setUserName] = useState("");
    const [password , setPassword] = useState("");
    
    const cookies = new Cookies();

    const login = () =>{
        Axios.post("http://localhost:3001/login", {userName,password})
        .then(res => {
            console.log("Response Data:", res.data);
          const { token, userId, firstName, lastName, username } = res.data;
  
          cookies.set("token", token);
          cookies.set("userId", userId);
          cookies.set("firstName", firstName);
          cookies.set("lastName", lastName);
          cookies.set("username", username);
          setIsAuth(true);
        })
        .catch(error => {
          console.error("There was an error signing up!", error);
        });
    };

    return (
        <div className='login'>
            <label>Log In</label>
             <input placeholder='Username' onChange={(e) =>{
                console.log(userName)
                setUserName(e.target.value);
            }}/>
             <input placeholder='Password' type="password" onChange={(e) =>{
                setPassword(e.target.value);
            }}/>
    
            <button onClick={login}>Log In</button>
        </div>
      )
}

export default Login