import "./createAvt.css";

// icons
import { Close, AddAPhoto, Add, Remove } from "@mui/icons-material";

// actions
import { postAdd } from "~/store/postSlice";
import { userEdit } from "~/store/userSlice";

// cropper
import Cropper from "react-easy-crop";
import getCroppedImage from "../../utils/cropImage";
import { dataURLtoFile } from "../../utils/dataURLtoFile";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function CreateAvt({ createAvtVisibe, setCreateAvtVisible, createAvtRef }) {
  const dispatch = useDispatch();
  const aspect = 1 / 1;
  const user = useSelector((state) => state.user);

  // useState
  const [croppedArea, setCroppedArea] = useState(null);
  const [image, setImage] = useState(user.profilePicture);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  // useRef
  const zoomAddBtn = useRef();
  const zoomRemoveBtn = useRef();
  const reader = useRef();

  const handlePreviewImg = (e) => {
    const fileInput = e.target.files[0];
    if (reader.current) reader.current.abort();
    if (fileInput) {
      reader.current = new FileReader();

      reader.current.onload = () => {
        if (reader.current.readyState === 2) {
          setImage(reader.current.result);
        }
      };
      reader.current.readAsDataURL(fileInput);
    }
  };

  const handleDiscardClick = () => {
    setCreateAvtVisible(false);
    setImage(user.profilePicture);
  };

  /////////////  cropper   //////////////
  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onZoomChange = (zoom) => {
    if (zoom <= 1) {
      setZoom(1);
      zoomRemoveBtn.current.classList.add("adjustBtnDisable");
    } else {
      setZoom(zoom);
      zoomRemoveBtn.current.classList.remove("adjustBtnDisable");
    }
    if (zoom >= 2) {
      setZoom(2);
      zoomAddBtn.current.classList.add("adjustBtnDisable");
    } else {
      setZoom(zoom);
      zoomAddBtn.current.classList.remove("adjustBtnDisable");
    }
  };
  //////////////////////////////////////

  const handleMinusClick = () => {
    if (parseFloat(zoom) - 0.1 > 1) {
      setZoom(zoom / 1.0 - 0.1);
    } else {
      setZoom(1);
      zoomRemoveBtn.current.classList.add("adjustBtnDisable");
    }
  };

  const handleAddClick = () => {
    if (parseFloat(zoom) + 0.1 < 2) {
      setZoom(zoom / 1.0 + 0.1);
    } else {
      setZoom(2);
      zoomAddBtn.current.classList.add("adjustBtnDisable");
    }
  };
  useEffect(() => {
    if (zoomRemoveBtn.current) {
      if (zoom > 1) {
        zoomRemoveBtn.current.classList.remove("adjustBtnDisable");
      } else {
        zoomRemoveBtn.current.classList.add("adjustBtnDisable");
      }
    }
    if (zoomAddBtn.current) {
      if (zoom < 2) {
        zoomAddBtn.current.classList.remove("adjustBtnDisable");
      } else {
        zoomAddBtn.current.classList.add("adjustBtnDisable");
      }
    }
  }, [zoom]);

  const handleSaveClick = async () => {
    try {
      setCreateAvtVisible(false);
      const canvas = await getCroppedImage(image, croppedArea);
      const canvasDataUrl = canvas.toDataURL("image/jpeg");
      const convertDataUrlToFile = dataURLtoFile(canvasDataUrl, "image-cropped.jpeg");
      const formData = new FormData();
      formData.append("tvl-avatar-img", convertDataUrlToFile);
      // upload to s3
      const res = await axios.post("/upload/avatar-img", formData);

      // update link to profilePicture in database
      await axios.put(`/users/${user._id}`, {
        userId: user._id,
        profilePicture: res.data,
      });
      dispatch(userEdit({ field: "profilePicture", value: res.data }));
      // create a new post after 'ON NO has just updated avatar'
      try {
        const newPost = {
          userId: user._id,
          desc: user.username + " updated profile picture.",
          img: res.data,
        };
        const newPostRes = await axios.post("/posts", newPost);
        dispatch(postAdd(newPostRes.data));
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.querySelector("html").style.position = createAvtVisibe ? "fixed" : "relative";
  }, [createAvtVisibe]);

  return (
    <>
      {createAvtVisibe && (
        <div className="createAvtContainer">
          <div className="createAvtCard" ref={createAvtRef}>
            <div className="createAvtHeader">
              <div className="createAvtTitle">Update profile picture</div>
              <div
                className="createAvtCloseBtn"
                onClick={() => {
                  setCreateAvtVisible(false);
                }}
              >
                <Close />
              </div>
            </div>
            <div className="createAvtPreview">
              <div className="chooseAvtWrapper">
                <input
                  type="file"
                  accept=".jpeg,.jpg,.png"
                  onChange={handlePreviewImg}
                  id="chooseAvt"
                  style={{ display: "none" }}
                />
                <div className="createAvtChoosePhotoContainer">
                  <label htmlFor="chooseAvt" className="createAvtChoosePhoto">
                    <AddAPhoto sx={{ fontSize: "20px" }} />
                    <span className="createAvtChoosePhotoText">Upload Photo</span>
                  </label>
                </div>
              </div>
              <div className="editAvtContainer">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={onCropChange}
                  onZoomChange={onZoomChange}
                  onCropComplete={onCropComplete}
                  cropShape="round"
                  showGrid={false}
                  zoomWithScroll={false}
                  cropSize={{ width: 250, height: 250 }}
                />
              </div>
              <div className="createAvtZoomContainer">
                <div className="createAvtZoomWrapper">
                  <div
                    className="createAvtZoomAdjustBtn adjustBtnDisable"
                    ref={zoomRemoveBtn}
                    onClick={handleMinusClick}
                  >
                    <Remove sx={{ fontSize: "18px" }} />
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={2}
                    step={0.005}
                    value={zoom}
                    onInput={(e) => {
                      onZoomChange(e.target.value);
                    }}
                    className="createAvtZoomSlider"
                  />
                  <div className="createAvtZoomAdjustBtn" ref={zoomAddBtn} onClick={handleAddClick}>
                    <Add sx={{ fontSize: "18px" }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="createAvtBtnContainer">
              <div className="createAvtBtn createAvtCancel" onClick={handleDiscardClick}>
                Discard
              </div>
              <div className="createAvtBtn createAvtSave" onClick={handleSaveClick}>
                Save
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateAvt;
