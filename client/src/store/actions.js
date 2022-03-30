export const LoginStart = (userCrediential) => {
    console.log('LOGIN_START');
    return {
        type: 'auth/LOGIN_START',
        payload: null,
    };
};

export const LoginSuccess = (user) => {
    console.log('LOGIN_SUCCESS');
    return {
        type: 'auth/LOGIN_SUCCESS',
        payload: user,
    };
};

export const LoginFailure = (error) => {
    console.log('LOGIN_FAILURE');
    return {
        type: 'auth/LOGIN_FAILURE',
        payload: error,
    };
};

export const LogOut = () => {
    console.log('LOG_OUT');
    return {
        type: 'auth/LOG_OUT',
        payload: '',
    };
};

export const UpdateUserStart = () => {
    console.log('UPDATE_USER_START');
    return {
        type: 'auth/UPDATE_USER_START',
        payload: '',
    };
};

export const ChangeAvtSuccess = (imageUrl) => {
    console.log('CHANGE_AVT_SUCCESS');
    return {
        type: 'auth/CHANGE_AVT_SUCCESS',
        payload: imageUrl,
    };
};

export const ChangeAvtFailure = (errorMessage) => {
    console.log('CHANGE_AVT_FAILURE');
    return {
        type: 'auth/CHANGE_AVT_FAILURE',
        payload: errorMessage,
    };
};

export const ChangeCoverPhotoSuccess = (coverPhoto) => {
    console.log('CHANGE_COVER_PHOTO_SUCCESS');
    return {
        type: 'auth/CHANGE_COVER_PHOTO_SUCCESS',
        payload: coverPhoto,
    };
};

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
