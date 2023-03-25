import "./feed.css";

// component
import Share from "../share/Share";
import Post from "../post/Post";

// actions
import { postFail, postSet, postStart, postSuccess } from "~/store/postSlice";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const Feed = ({ username }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getPosts = async () => {
      try {
        dispatch(postStart())
        const res = username
          ? await axios.get(`/posts/profile/${username}`, {
            cancelToken: source.token,
          })
          : await axios.get("/posts/random/6", {
            cancelToken: source.token,
          });
        const posts = res.data;
        const sortedPosts = posts.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt));
        dispatch(postSet(sortedPosts));
        dispatch(postSuccess())
      } catch (err) {
        dispatch(postFail("Error on fetching posts in Feed"))
        if (axios.isCancel(err)) {
          console.log("axios cleanup Feed.js");
        } else {
          console.log(err);
        }
      }
    };
    getPosts();
    return () => {
      source.cancel();
    };
  }, [username]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post) => (
          <Post key={uuidv4()} post={post} />
        ))}
        {!username && (
          <div className="feedNoMorePostsContainer">
            <div className="feedNoMorePostsWrapper">
              <span className="feedNoMorePostFirstLine">No More Posts</span>
              <span className="feedNoMorePostSecondLine">Add more friends to see more posts in your News Feed.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  /////////////////////////////////////////////////////////////
};

export default Feed;
