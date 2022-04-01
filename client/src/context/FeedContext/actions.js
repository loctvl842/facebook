export const PostStart = () => {
  console.log('POST_START');
  return {
    type: 'feed/POST_START',
    payload: null,
  };
};

export const SetPosts = (posts) => {
  console.log('SET_POSTS');
  return {
    type: 'feed/SET_POSTS',
    payload: posts,
  };
};

export const AddPost = (post) => {
  console.log('ADD_POST');
  return {
    type: 'feed/ADD_POST',
    payload: post,
  };
};

export const DeletePost = (post) => {
  console.log('DELETE_POST');
  return {
    type: 'feed/DELETE_POST',
    payload: post,
  };
};

export const UpdatePost = (post) => {
  console.log('UPDATE_POST');
  return {
    type: 'feed/UPDATE_POST',
    payload: post,
  };
};

export const PostFailure = (err) => {
  console.log('POST_FAILURE');
  return {
    type: 'feed/POST_FAILURE',
    payload: err,
  };
};
