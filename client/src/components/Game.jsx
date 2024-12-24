import  { useState } from 'react'
import Board from './Board';
import {Window,MessageList,MessageInput} from "stream-chat-react";
import "./Chat.css"

function Game({channel,setChannel}) {
    const [playersJoined,setPlayersJoined] = useState(channel.state.watcher_count === 2)
    const [result,setResult] = useState({winner : "none" , state : "none"})

    channel.on("users.watching.start",(e) =>{
        setPlayersJoined(e.watcher_count === 2)
    })
   if(!playersJoined)
    {
        return (<div>
            Waiting for other player...
        </div>);
    } 

  return (
    <div className='gameContainer'>
      <Board result={result} setResult={setResult}/>
      <Window>
        <MessageList disableDateSeparator closeReactionSelectorOnClick messageActions={["react"]} hideDeletedMessages/>
        <MessageInput noFiles/>
      </Window>
      <button onClick={async () =>{
        await channel.stopWatching();
        setChannel(null);
      }}>Leave</button>

      {result.state === "won" && <h1>Winner :{result.winner}</h1>}
      {result.state === "tie" && <h1>Tied</h1>}
    </div>
  )
}

export default Game