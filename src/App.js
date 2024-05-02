import { useState } from "react";
import io from "socket.io-client";
import Chat from "./pages/Chat";

//setting the socket backend server for connection
const socket = io.connect("http://localhost:5000");

function App() {

  const [userName, setUserName] = useState("")
  const [room, setRoom] = useState("");
   const [showChat, setShowChat] = useState(false);
   const [message, setMessage] = useState("");

  //join room
  const joinRoom = () => {
    if (room !== "" && userName !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
      setMessage(`${userName} just joined this chatroom-${room}`)
    }
  };


//hide chat if not joined chat
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} message={message} setMessage = {setMessage} />
      )}
    </div>
  );
}

export default App;
