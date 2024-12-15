import  { useState } from 'react'
import {useChatContext} from 'stream-chat-react'

function JoinGame() {
  const [rivalUsername,setRivalUsername] = useState("");
  const {client} = useChatContext();
  const [channel,setChannel] = useState(null);

  const createChannel = async ()=>{
    const response = await client.queryUsers({name : { $eq : rivalUsername}});
    if(response.users.length === 0)
    {
      alert("User Not Found");
      return;
    }

    const newChannel = await client.channel("messaging",{
      members : [client.userID,response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  }
  return (
    <>{channel ? (<h1>Game Started</h1>) :
    (<div className='joinGame'>
      <h4>Create Game</h4>
      <input placeholder='Enter the name of your opponent' onChange={(e) =>{
        setRivalUsername(e.target.value);
      }}/>

      <button onClick={createChannel}>Join/Start Game</button>
      </div>)
    }
    </>
  )
}

export default JoinGame