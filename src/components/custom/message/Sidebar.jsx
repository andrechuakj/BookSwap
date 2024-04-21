import React, { useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import Search from "./Search";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebase";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), async (doc) => {
        const data = await doc.data();
        console.log(data);
        setChats(data);
      });

      return () => {
        unsub();
      };
    };

    getChats();
  }, [user.uid]);

  return (
    <>
      <div style={{ overflow: "scroll", height: "calc(100vh - 120px)" }}>
        <Search />
        {chats && Object.entries(chats)
          .sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <SidebarProfile key={chat[0]} data={chat} />
          ))}
      </div>
    </>
  );
};

export default Sidebar;
