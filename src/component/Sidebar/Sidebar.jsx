import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets"; // importing assest object

import { Context } from "../../context/context";

const Sidebar = () => {
  // side bar on off functionality ----> 1
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPropmt,newChat} = useContext(Context);
  const loadPrompt = async (prompt) =>{
    setRecentPropmt(prompt)
    await onSent(prompt)
  }

console.log('prevPrompts',prevPrompts)
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={() =>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}{" "}
          {/* this is to hide the text using state  */}
        </div>

        {extended ? (
          <div className="recent">
            <p className="recent-titel">Recent</p>
            {prevPrompts.map((item,index) =>(
                    <div onClick={()=>loadPrompt(item)} className="recent-entry">
                      <img src={assets.message_icon} alt="" />
                      <p>{item.slice(0,18)} ...</p>
                    </div>
                  )
                  
                )}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}{" "}
          {/* this is to hide the text using state  */}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}{" "}
          {/* this is to hide the text using state  */}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Setting</p> : null}{" "}
          {/* this is to hide the text using state  */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
