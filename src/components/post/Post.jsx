import "./post.css";

// icons
import { MoreHorizOutlined, FavoriteOutlined, ThumbUp } from "@mui/icons-material";

// hook
import { useClickOutside } from "../../customHook/useClickOutside";

// components
import EditPost from "../editPost/EditPost";
import PostOptions from "../postOptions/PostOptions";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
import { newlineTextarea } from "~/utils/newlineTextarea";

const Post = ({ post }) => {
  const user = useSelector((state) => state.user);

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate(); // use for navigate to profile page
  const [like, setLike] = useState(post.likes.length); // to count the likes
  // TODO: make comment function
  const [isLiked, setIsLiked] = useState(false); // to check if currentUser liked it or not
  const [creator, setCreator] = useState({}); // user who creates the post

  // to check click outside the option button of post
  const {
    visible: postOptionVisible,
    setVisible: setPostOptionVisible,
    ref: postOptionRef,
    btnRef: postOptionBtn,
  } = useClickOutside(false);

  const { visible: editPostVisible, setVisible: setEditPostVisible, ref: cardRef } = useClickOutside(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  // get the user posting this post
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post.userId}`, {
          cancelToken: source.token,
        });
        setCreator(res.data);
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
        userId: user._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(() => (isLiked ? like - 1 : like + 1));
    setIsLiked((preIsLiked) => !preIsLiked);
  };

  // ISO: 2022-03-15T10:26:33.033Z
  // Unix: 1647398793
  // we only post when the post have enought infomation
  // (meaning the post has the name of the person posting it for example)
  return (
    <div className="post">
      {creator.username && (
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <div
                className="postProfileImgWrapper"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/profile/${creator.username}`);
                }}
              >
                <img
                  src={creator.profilePicture || PUBLIC_FOLDER + "defaultAvt.jpg"}
                  alt="Profile"
                  className="postProfileImg"
                />
              </div>
              <div className="postNameDate">
                <span
                  className="postUserName"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/profile/${creator.username}`);
                  }}
                >
                  {creator.username}
                </span>
                {/* <span className="postDate">{format(post.createdAt, "en_US")}</span> */}
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
                  user={creator}
                />
              )}
            </div>
          </div>
          <div>
            <div className="postText">{newlineTextarea(post.desc)}</div>
            {post.img && (
              <div className="postImgWrapper">
                <img className="postImg postImgAvt" src={post.img} alt="post" />
              </div>
            )}
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <ThumbUp className="likeIcon" style={{ color: "#246dff" }} onClick={handleLikeIcon} />
              <FavoriteOutlined className="likeIcon" style={{ color: "red" }} />
              {like !== 0 && <span className="postLikeCounter">{like} people like</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
