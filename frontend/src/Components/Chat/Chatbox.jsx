/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useRef } from "react";
import "./ChatBox.css";
// import { format } from "timeago.js";
// import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";
import { VideoCall } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
//   const token = useSelector((state) => state.token);
//   const loggedId = useSelector((state) => state.user._id);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

//   useEffect(() => {
//     if (receivedMessage !== null && receivedMessage.chatId === chat?._id) {
//       setMessages([...messages, receivedMessage]);
//     }
//   }, [receivedMessage]);

//   useEffect(() => {
//     const userId = chat?.members?.find((id) => id !== currentUser);
//     const getUserData = async () => {
//       try {
//         const data = await getUser(userId, token);
//         setUserData(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     if (chat !== null) getUserData();
//   }, [chat, currentUser]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const data = await getMessages(token, chat._id);
//         setMessages(data.messages);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     if (chat !== null) fetchMessages();
//   }, [chat]);

//   useEffect(() => {
//     scroll.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    // if (!newMessage.trim()) {
    //   return;
    // }

    const message = {
      senderId: currentUser,
      message: e.message ? e.message : newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
    try {
      const data = await addMessage(token, message);
      setMessages([...messages, data.messages]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  const scroll = useRef();
  // const imageRef = useRef();

  

  return (
    <>
      <div className='ChatBox-container' style={{ height: "70vh" }}>
        {chat ? (
          <>
            <div className='chat-header'>
              <div className='follower'>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <UserImage image size='55px' />
                  <Box>
                    <Typography
                      variant='h5'
                      fontWeight='500'
                      sx={{ padding: "1rem" }}
                    >
                      {/* {userData?.userName} */}
                    </Typography>
                    <VideoCall
                      onClick={handleVideoCall}
                      sx={{ fontSize: "25px" }}
                    />
                  </Box>
                  <Box></Box>
                </div>
                <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
              </div>
            </div>
            <div className='chat-body'>
              {messages.map((message) => (
                <div
                  ref={scroll}
                 
                  key={message.id}
                >
                  {message.message.startsWith("Join this room to video") ? (
                    <>
                      {message.message.match(/https?:\/\/\S+/) ? (
                        <span
                          onClick={() =>
                            navigate(
                              `/room/${
                                message.message.match(/\/room\/(\w+)/)[1]
                              }`
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {message.message}
                        </span>
                      ) : (
                        <span>{message.message}</span>
                      )}
                      <span>{format(message.createdAt)}</span>
                    </>
                  ) : (
                    <>
                      <span>{message.message}</span>
                      <span>{format(message.createdAt)}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className='chat-sender'>
              <div></div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <button
                className={`send-button button ${
                  !newMessage.trim() ? "disabled" : ""
                }`}
                disabled={!newMessage.trim()}
                onClick={handleSend}
              >
                Send
              </button>
            </div>{" "}
          </>
        ) : (
          <span className='chatbox-empty-message'>Tap a chat to start</span>
        )}
      </div>
    </>
  );
};

export default ChatBox;