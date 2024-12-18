import  { useState } from 'react'

function Game({channel}) {
    const [playersJoined,setPlayersJoined] = useState(channel.state.watcher_count === 2)
  
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
    <div>Game</div>
  )
}

export default Game