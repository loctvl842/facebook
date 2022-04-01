import './coverPhotoOptions.css';
import { useContext } from 'react';
import axios from 'axios';

// context
import { AuthStore } from '../../context/AuthContext/store';
import {
  UpdateUserStart,
  ChangeCoverPhotoSuccess,
} from '../../context/AuthContext/actions';

// icon
import { UploadOutlinedIcon, DeleteOutlineOutlinedIcon } from '../../icon';

function CoverPhotoOptions({
  coverPhotoOptionRef,
  setCoverPhotoOptionVisible,
  setImageFile,
  setImageUrl,
}) {
  const {
    auth: { user },
    dispatch,
  } = useContext(AuthStore);
  const handleRemoveClick = async () => {
    setCoverPhotoOptionVisible(false);
    setImageFile(null);
    setImageUrl('');
    try {
      dispatch(UpdateUserStart());
      await axios.put(`/users/${user._id}`, {
        userId: user._id,
        coverPicture: '',
      });
      dispatch(ChangeCoverPhotoSuccess(''));
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <div className="coverPhotoOptionsContainer" ref={coverPhotoOptionRef}>
      <div className="coverPhotoOptions">
        <label className="coverPhotoOption" htmlFor="coverPhoto">
          <div className="coverPhotoOptionLeft">
            <UploadOutlinedIcon
              sx={{
                fontSize: 22,
                color: '#888',
              }}
            />
          </div>
          <span className="coverPhotoOptionRight">upload photo</span>
        </label>
        <hr className="coverPhotoOptionHr" />
        <div className="coverPhotoOption" onClick={handleRemoveClick}>
          <div className="coverPhotoOptionLeft">
            <DeleteOutlineOutlinedIcon
              sx={{
                fontSize: 22,
                color: '#888',
              }}
            />
          </div>
          <span className="coverPhotoOptionRight">remove</span>
        </div>
      </div>
    </div>
  );
}

export default CoverPhotoOptions;
