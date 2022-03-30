import { useEffect, useContext } from 'react';
// context
import { Store } from '../../store/store';
import { SetPosts, PostStart } from '../../store/actions';

// component
import './feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import Loading from '../loading/Loading';

import axios from 'axios';

const Feed = ({ username }) => {
    const {
        feed: { posts, isFetching },
        dispatch,
    } = useContext(Store);
    useEffect(() => {
        const source = axios.CancelToken.source();
        dispatch(PostStart());
        const getPosts = async () => {
            try {
                const res = username
                    ? await axios.get(`/posts/profile/${username}`, {
                          cancelToken: source.token,
                      })
                    : await axios.get('/posts/random/6', {
                          cancelToken: source.token,
                      });
                dispatch(
                    SetPosts(
                        res.data.sort((p1, p2) => {
                            return (
                                new Date(p2.createdAt) - new Date(p1.createdAt)
                            );
                        })
                    )
                );
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('axios cleanup Feed.js');
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
                    <Post key={post._id} post={post} />
                ))}
                {!username && (
                    <div className="feedNoMorePostsContainer">
                        <div className="feedNoMorePostsWrapper">
                            <span className="feedNoMorePostFirstLine">
                                No More Posts
                            </span>
                            <span className="feedNoMorePostSecondLine">
                                Add more friends to see more posts in your News
                                Feed.
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    /////////////////////////////////////////////////////////////
};

export default Feed;
