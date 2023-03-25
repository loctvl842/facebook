import "./post.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as timeago from "timeago.js";
import { useNavigate } from "react-router-dom";
import PostOptions from "../postOptions/PostOptions";
import { newlineTextarea } from "../../utils/newlineTextarea";

// context
import { AuthStore } from "../../context/AuthContext/store";

// icons
import {
  MoreHorizOutlined,
  FavoriteOutlined,
  ThumbUp,
} from "@mui/icons-material";

import { useClickOutside } from "../../customHook/useClickOutside";

// components
import EditPost from "../editPost/EditPost";

const Post = ({ post }) => {
  const {
    auth: { user: currentUser },
  } = useContext(AuthStore);

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate(); // use for navigate to profile page
  const [like, setLike] = useState(post.likes.length); // to count the likes
  // TODO: make comment function
  const [comment, setComment] = useState(post.comment);
  const [isLiked, setIsLiked] = useState(false); // to check if currentUser liked it or not
  const [user, setUser] = useState({}); // user who creates the post

  // to check click outside the option button of post
  const {
    visible: postOptionVisible,
    setVisible: setPostOptionVisible,
    ref: postOptionRef,
    btnRef: postOptionBtn,
  } = useClickOutside(false);

  const {
    visible: editPostVisible,
    setVisible: setEditPostVisible,
    ref: cardRef,
  } = useClickOutside(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  // get the user posting this post
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post.userId}`, {
          cancelToken: source.token,
        });
        setUser(res.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("axios cleanup in Post.js");
        } else {
          console.log(err);
        }
      }
    };
    fetchUser();
    return () => {
      source.cancel();
    };
  }, [post.userId]);

  const handleLikeIcon = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(() => (isLiked ? like - 1 : like + 1));
    setIsLiked((preIsLiked) => !preIsLiked);
  };

  // we only post when the post have enought infomation
  // (meaning the post has the name of the person posting it for example)
  return (
    <div className="post">
      {user.username && (
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <div
                className="postProfileImgWrapper"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/profile/${user.username}`);
                }}
              >
                <img
                  src={user.profilePicture || PUBLIC_FOLDER + "defaultAvt.jpg"}
                  className="postProfileImg"
                />
              </div>
              <div className="postNameDate">
                <span
                  className="postUserName"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/profile/${user.username}`);
                  }}
                >
                  {user.username}
                </span>
                <span className="postDate">
                  {timeago.format(post.createdAt)}
                </span>
              </div>
            </div>
            <div className="postTopRight">
              <div className="postOptionsBtn" ref={postOptionBtn}>
                <MoreHorizOutlined />
              </div>
              <EditPost
                editPostVisible={editPostVisible}
                setEditPostVisible={setEditPostVisible}
                cardRef={cardRef}
                post={post}
              />
              {postOptionVisible && (
                <PostOptions
                  setPostOptionVisible={setPostOptionVisible}
                  setEditPostVisible={setEditPostVisible}
                  postOptionRef={postOptionRef}
                  post={post}
                  user={user}
                />
              )}
            </div>
          </div>
          <div>
            <div className="postText">{newlineTextarea(post.desc)}</div>
            {post.img && (
              <div className="postImgWrapper">
                <img className="postImg postImgAvt" src={post.img} alt="" />
              </div>
            )}
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <ThumbUp
                className="likeIcon"
                style={{ color: "#246dff" }}
                onClick={handleLikeIcon}
              />
              <FavoriteOutlined className="likeIcon" style={{ color: "red" }} />
              {like !== 0 && (
                <span className="postLikeCounter">{like} people like</span>
              )}
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">{comment} comments</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
