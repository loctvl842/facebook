import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

// context
import { Store } from '../store/store';
import { AddPost } from '../store/actions';

export default function usePostFetch(postId, { username }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { posts, dispatch } = useContext(Store);
    useEffect(() => {
        setLoading(true);
        setError(false);
        console.log({ posts });
        const source = axios.CancelToken.source();
        const fetchPost = async () => {
            try {
                const res = !username
                    ? await axios.get(`/posts/${postId}`, {
                          cancelToken: source.token,
                      })
                    : await axios.get(`/posts/profile/${username}`, {
                          cancelToken: source.token,
                      });
                if (res.data && !username) {
                    dispatch(AddPost(res.data));
                }
                if (res.data && username) {
                }
                setLoading(false);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Feed: successfully aborted');
                } else {
                    setError(true);
                    console.log(err);
                }
            }
        };
        fetchPost();
        return () => {
            source.cancel();
        };
    }, [postId, username]);
    return { loading, error };
}
