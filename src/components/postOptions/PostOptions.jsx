import { useContext } from "react";
import "./postOptions.css";
import axios from "axios";

// icons
import { CreateOutlined, DeleteOutlineOutlined, CancelPresentation, PersonRemove } from "@mui/icons-material";

// actions
import { postRemove, postStart, postSuccess } from "~/store/postSlice";

import { useDispatch, useSelector } from "react-redux";

function PostOptions({ postOptionRef, setPostOptionVisible, setEditPostVisible, post, user }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  const handleHidePostClick = () => {
    setPostOptionVisible(false);
    dispatch(postRemove(post._id));
  };

  const handleUnfollowClick = () => {
    setPostOptionVisible(false);
  };
  // delete post button
  const handleDeletePostClick = async () => {
    dispatch(postStart());
    try {
      setPostOptionVisible(false);
      const res = await axios.delete(`/posts/${post._id}/`, {
        data: {
          userId: currentUser._id,
        },
      });
      dispatch(postRemove(post._id));
      dispatch(postSuccess())
    } catch (err) {
      console.log(err);
    }
  };

  const CurrentUserPostOptions = () => {
    // edit post
    const handleEditPostClick = () => {
      setEditPostVisible(true);
      setPostOptionVisible(false);
    };

    return (
      <>
        <div className="postOption" onClick={handleEditPostClick}>
          <div className="postOptionLeft">
            <CreateOutlined
              sx={{
                fontSize: 20,
                color: "#999",
              }}
            />
          </div>
          <span className="postOptionRight">Edit post</span>
        </div>
        <div className="postOption" onClick={handleHidePostClick}>
          <div className="postOptionLeft">
            <CancelPresentation
              sx={{
                fontSize: 20,
                color: "#999",
              }}
            />
          </div>
          <span className="postOptionRight">Hide post</span>
        </div>
        <hr className="postOptionHr" />
        <div className="postOption" onClick={handleDeletePostClick}>
          <div className="postOptionLeft">
            <DeleteOutlineOutlined
              sx={{
                fontSize: 20,
                color: "#999",
              }}
            />
          </div>
          <span className="postOptionRight">Move to trash</span>
        </div>
      </>
    );
  };

  const FriendsPostOptions = () => {
    return (
      <>
        <div className="postOption" onClick={handleHidePostClick}>
          <div className="postOptionLeft">
            <CancelPresentation
              sx={{
                fontSize: 20,
                color: "#999",
              }}
            />
          </div>
          <span className="postOptionRight">Hide post</span>
        </div>
        <div className="postOption" onClick={handleUnfollowClick}>
          <div className="postOptionLeft">
            <PersonRemove
              sx={{
                fontSize: 20,
                color: "#999",
              }}
            />
          </div>
          <span className="postOptionRight">Unfollow {user.username}</span>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="postOptionsContainer" ref={postOptionRef}>
        <div className="postOptions">
          {currentUser._id === post.userId ? <CurrentUserPostOptions /> : <FriendsPostOptions />}
        </div>
      </div>
    </>
  );
}

export default PostOptions;
