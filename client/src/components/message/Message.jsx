import "./message.css";

// icon
import {
  CheckCircleOutline,
  RadioButtonUnchecked,
  MoreVert,
} from "@mui/icons-material";

import { useState } from "react";

const Message = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [optionsShowup, setOptionsShowup] = useState(false);
  const [nameShowup, setNameShowup] = useState(false);
  return (
    <div
      className="message"
      onMouseOver={() => setOptionsShowup(true)}
      onMouseLeave={() => setOptionsShowup(false)}
    >
      <div className="messageWrapper">
        <div className="messageSender">
          <div
            className={
              nameShowup
                ? "messageSenderImgHover messageNameShowup"
                : "messageSenderImgHover"
            }
          >
            ON NO
          </div>
          <div className="messageSenderImgContainer">
            {/* TODO change according to sender */}
            {false && (
              <img
                src={`${PUBLIC_FOLDER}/loc.jpg`}
                alt=""
                className="messageSenderImg"
                onMouseOver={() => setNameShowup(true)}
                onMouseLeave={() => setNameShowup(false)}
              />
            )}
          </div>
        </div>
        <div className="messageContainer messageCurrentUser">
          <div className="messageContent">
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
            Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
          </div>
          {optionsShowup && (
            <div className="messageOptions">
              <div className="messageOption">
                <MoreVert sx={{ color: "#777", fontSize: "20px" }} />
              </div>
            </div>
          )}
        </div>
        <div className="messageSeenBy">
          {/* TODO check message sent or not or seen by whom */}
          <CheckCircleOutline sx={{ fontSize: "15px", color: "#aaa" }} />
          <RadioButtonUnchecked sx={{ fontSize: "15px", color: "#aaa" }} />
          <div className="messageSeenByImgContainer">
            <img
              className="messageSeenByImg"
              src={`${PUBLIC_FOLDER}/loc.jpg`}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
