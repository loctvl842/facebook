import axios from "axios";
// cropper
import getCroppedImage from "../../utils/cropImage";
import { dataURLtoFile } from "../../utils/dataURLtoFile";

import "./coverPhoto.css";
import Cropper from "react-easy-crop";
import { useState, useRef, useContext } from "react";
import { useClickOutside } from "../../customHook/useClickOutside";

// context
import { AuthStore } from "../../context/AuthContext/store";
import {
  UpdateUserStart,
  ChangeCoverPhotoSuccess,
} from "../../context/AuthContext/actions";

// icons
import { CameraAlt, Public } from "@mui/icons-material";

import CoverPhotoOptions from "../coverPhotoOptions/CoverPhotoOptions";

function CoverPhoto({
  coverPhoto: imageUrl,
  setCoverPhoto: setImageUrl,
  editableInfo,
}) {
  const {
    auth: { user },
    dispatch,
  } = useContext(AuthStore);

  // useState
  const [imageFile, setImageFile] = useState(null); // file to upload to s3
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedArea, setCroppedArea] = useState(null);

  // to check click outside the option button of post
  const {
    visible: coverPhotoOptionVisible,
    setVisible: setCoverPhotoOptionVisible,
    ref: coverPhotoOptionRef,
    btnRef: coverPhotoOptionBtnRef,
  } = useClickOutside(false);

  // useRef
  const fileReader = useRef();

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    console.log({ croppedAreaPixels });
    setCroppedArea(croppedAreaPixels);
  };

  const onFileChange = (e) => {
    const fileInput = e.target.files[0];
    if (fileReader.current) fileReader.current.abort();
    if (fileInput) {
      fileReader.current = new FileReader();
      fileReader.current.onload = () => {
        if (fileReader.current.readyState == 2) {
          setImageUrl(fileReader.current.result);
        }
      };
      fileReader.current.readAsDataURL(fileInput);
      setImageFile(fileInput);
      e.target.value = null;
    }
  };

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const handleCancelClick = () => {
    console.log({ user });
    setImageUrl(user.coverPicture);
    setImageFile(null);
  };

  const handleSaveClick = async () => {
    try {
      dispatch(UpdateUserStart());
      const canvas = await getCroppedImage(imageUrl, croppedArea);
      const canvasDataUrl = canvas.toDataURL("image/jpeg");
      const convertDataUrlToFile = dataURLtoFile(
        canvasDataUrl,
        "image-cropped.jpeg"
      );
      const formData = new FormData();
      formData.append("tvl-cover-img", convertDataUrlToFile);
      // upload to s3
      const res = await axios.post("/upload/cover-img", formData);
      // update link to coverPhoto in database
      await axios.put(`/users/${user._id}`, {
        userId: user._id,
        coverPicture: res.data,
      });
      setImageFile(null);
      dispatch(ChangeCoverPhotoSuccess(res.data));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <div className="coverPhotoContainer">
        <div className="coverPhotoBtnContainer">
          {editableInfo && (
            <>
              {imageUrl ? (
                <div className="coverPhotoBtnWrapper">
                  <div className="coverPhotoBtn" ref={coverPhotoOptionBtnRef}>
                    <CameraAlt fontSize="small" />
                    <span className="coverPhotoBtnText">Edit cover photo</span>
                  </div>
                  {coverPhotoOptionVisible && (
                    <CoverPhotoOptions
                      coverPhotoOptionRef={coverPhotoOptionRef}
                      setCoverPhotoOptionVisible={setCoverPhotoOptionVisible}
                      setImageFile={setImageFile}
                      setImageUrl={setImageUrl}
                    />
                  )}
                </div>
              ) : (
                <div className="coverPhotoBtnWrapper">
                  <label className="coverPhotoBtn" htmlFor="coverPhoto">
                    <CameraAlt fontSize="small" />
                    <span className="coverPhotoBtnText">Add Cover Photo</span>
                  </label>
                </div>
              )}
            </>
          )}
        </div>
        <input
          id="coverPhoto"
          type="file"
          accept=".jpeg,.jpg,.png"
          style={{ display: "none" }}
          onChange={onFileChange}
        />
        {imageFile && (
          <div className="editCoverPhotoContainer">
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={1}
              aspect={27 / 10}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              objectFit="horizontal-cover"
              showGrid={false}
              classes={{
                containerClassName: "coverPhotoCropperContainer",
                cropAreaClassName: "coverPhotoCropArea",
                mediaClassName: "coverPhotoMedia",
              }}
            />
            <div className="editCoverPhotoBtnContainer">
              <div className="editCoverPhotoBtnText">
                <Public />
                <span>Your cover photo is public.</span>
              </div>
              <div className="editCoverPhotoBtnWrapper">
                <div
                  className="editCoverPhotoBtn editCoverPhotoBtnCancel"
                  onClick={handleCancelClick}
                >
                  Cancel
                </div>
                <div
                  className="editCoverPhotoBtn editCoverPhotoBtnSave"
                  onClick={handleSaveClick}
                >
                  Save Changes
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* if we haven't pick any cover image file and */}
      {/* user doesn't have a cover photo */}
      {!imageFile && !user.coverPicture && editableInfo && (
        <label
          className="chooseCoverPhotoAlternative"
          htmlFor="coverPhoto"
        ></label>
      )}
    </>
  );
}

export default CoverPhoto;
