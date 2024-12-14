import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import {StreamChat} from "stream-chat"
import Cookies from "universal-cookie"

function App() { 
  const api_key = "4bkt5wj5q5w5";
  const cookies = new Cookies();
  const token = cookies.get("token");

  const client = StreamChat.getInstance(api_key);

  if(token)
  {
    client.connectUser({
      id : cookies.get("userId"),
      name : cookies.get("username"),
      firstName : cookies.get("firstName"),
      lastName : cookies.get("lastName"),
      hashedPassword :cookies.get("hashedPassword"),
    },token).then((user) =>{
      console.log(user);
    });
  }

  return (
    <>
      <div>
        <Signup/>
        <Login/>
      </div>
    </>
  )
}

export default App
