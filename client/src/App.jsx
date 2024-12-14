import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import {StreamChat} from "stream-chat"
import Cookies from "universal-cookie"
import { useState } from 'react'

function App() { 
  const api_key = "4bkt5wj5q5w5";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [isAuth , setIsAuth] = useState(false);
  const client = StreamChat.getInstance(api_key);

  const logOut = () =>{
    cookies.remove("token");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("username");
    cookies.remove("userId");
    cookies.remove("hashedPassword");
    client.disconnectUser();
    setIsAuth(false);
  };

  if(token)
  {
    client.connectUser({
      id : cookies.get("userId"),
      name : cookies.get("username"),
      firstName : cookies.get("firstName"),
      lastName : cookies.get("lastName"),
      hashedPassword :cookies.get("hashedPassword"),
    },token).then((user) =>{
      setIsAuth(true);
    });
  }

  return (
    <>
      <div>
        {isAuth ?(<button onClick={logOut}> Log Out </button>): (<>
          <Signup setIsAuth={setIsAuth}/>
          <Login setIsAuth={setIsAuth}/>
        </>)}
      </div>
    </>
  )
}

export default App
