import  { useState } from 'react'
import Board from './Board';

function Game({channel}) {
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
      {/* Chat */}
      {/* Leave game button */}
    </div>
  )
}

export default Game