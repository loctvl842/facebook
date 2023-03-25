import { useContext } from "react";
import "./postOptions.css";
import axios from "axios";
// context
import { AuthStore } from "../../context/AuthContext/store";
import { FeedStore } from "../../context/FeedContext/store";
// actions
import { DeletePost, PostStart } from "../../context/FeedContext/actions";
// icons
import {
  CreateOutlined,
  DeleteOutlineOutlined,
  CancelPresentation,
  PersonRemove,
} from "@mui/icons-material";

function PostOptions({
  postOptionRef,
  setPostOptionVisible,
  setEditPostVisible,
  post,
  user,
}) {
  const {
    auth: { user: currentUser },
  } = useContext(AuthStore);
  const { dispatch } = useContext(FeedStore);

  const handleHidePostClick = () => {
    setPostOptionVisible(false);
    dispatch(DeletePost(post));
  };

  const handleUnfollowClick = () => {
    setPostOptionVisible(false);
  };
  // delete post button
  const handleDeletePostClick = async () => {
    dispatch(PostStart());
    try {
      setPostOptionVisible(false);
      const res = await axios.delete(`/posts/${post._id}/`, {
        data: {
          userId: currentUser._id,
        },
      });
      dispatch(DeletePost(res.data));
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
          {currentUser._id === post.userId ? (
            <CurrentUserPostOptions />
          ) : (
            <FriendsPostOptions />
          )}
        </div>
      </div>
    </>
  );
}

export default PostOptions;
