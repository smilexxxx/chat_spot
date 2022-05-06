import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { LogoutOutlined } from "@ant-design/icons";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "ef095d5d-7679-4411-af80-f48e0682e65b",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        axios
          .post("https://api.chatengine.io/users/", formdata, {
            headers: { "private-key": "b5e43a53-41c4-478d-b0ef-10fe4b83d1c3" },
          })
          .then(() => setLoading(false))
          .catch((err) => err);
      });
  }, [user, navigate]);

  const LogoutHandler = async () => {
    await auth.signOut();
    navigate("/");
  };

  if (!user || loading) return "Loading ...";

  return (
    <div className="chat-page">
      <div className="nav-bar">
        <div className="logo-tab">HelloMessager</div>
        <div className="logout-tab" onClick={LogoutHandler}>
          Logout
          <LogoutOutlined />
        </div>
      </div>
      <ChatEngine
        height="calc(100vh-66px)"
        projectID="ef095d5d-7679-4411-af80-f48e0682e65b"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
