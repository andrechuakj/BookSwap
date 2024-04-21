import React, { useContext, useRef, useEffect } from "react";
import { ChatContext } from "@/contexts/ChatProvider";
import { auth } from "@/firebase";

const Message = ({ message }) => {
  const user = auth.currentUser;
  const userPic = user.photoURL;
  const { data } = useContext(ChatContext);
  const ownMessage = message.senderId === user.uid;
  const ref = useRef();

  const ownMessageContainerStyle = {
    margin: "10px",
    display: "flex",
    flexDirection: "row-reverse",
  };

  const ownMessageContentStyle = {
    background: "lightblue",
    borderRadius: "10px",
    padding: "10px 20px",
    display: "flex",
    flexDirection: "column",
    maxWidth: "70%",
    overflowWrap: "break-word",
  };

  const otherMessageContainerStyle = {
    margin: "10px",
    display: "flex",
    flexDirection: "row",
    overflowWrap: "break-word",
  };

  const otherMessageContentStyle = {
    background: "lightgrey",
    borderRadius: "10px",
    padding: "10px 20px",
    display: "flex",
    flexDirection: "column",
    maxWidth: "70%",
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      style={ownMessage ? ownMessageContainerStyle : otherMessageContainerStyle}
      ref={ref}
    >
      <img
        src={ownMessage ? userPic : data.user?.photoURL}
        alt="Profile Pic"
        style={{
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          objectFit: "cover",
          margin: "0px 10px",
          flexDirection: "column",
        }}
      />
      <div
        style={ownMessage ? ownMessageContentStyle : otherMessageContentStyle}
      >
        {message.img && <img src={message.img} alt="Message" />}
        <p style={{ alignSelf: ownMessage ? "end" : "start" }}>
          {message.text}
        </p>
        <span
          style={{ color: "grey", alignSelf: ownMessage ? "end" : "start" }}
        >
          {message.date?.toDate().toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default Message;
