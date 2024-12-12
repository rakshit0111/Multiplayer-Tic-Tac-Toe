import { useState } from 'react'

function Login() {
    const [userName , setUserName] = useState("");
    const [password , setPassword] = useState("");

    const login = () =>{

    };

    return (
        <div className='login'>
            <label>Log In</label>
             <input placeholder='Username' onChange={(e) =>{
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