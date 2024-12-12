import {useState} from 'react'

function Signup() {
    const [user , setUser] = useState(null);

    const signUp = () =>{

    };

  return (
    <div className='signUp'>
        <label>Sign Up</label>
        <input placeholder='First Name' onChange={(e) =>{
            setUser({...user, firstName : e.target.value})
        }}/>
         <input placeholder='Last Name' onChange={(e) =>{
            setUser({...user, lastName : e.target.value})
        }}/>
         <input placeholder='Username' onChange={(e) =>{
            setUser({...user, username : e.target.value})
        }}/>
         <input placeholder='Password' type="password" onChange={(e) =>{
            setUser({...user, password : e.target.value})
        }}/>

        <button onClick={signUp}>SignUp</button>
    </div>
  )
}

export default Signup