// icons
import { Close, AddAPhoto, PermMediaRounded, TagFacesOutlined } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

// actions
import { postStart, postFail, postUpdate, postSuccess } from "~/store/postSlice";

import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

const EditPost = ({ editPostVisible, setEditPostVisible, cardRef, post }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.post);
  const user = useSelector((state) => state.user);

  // useState
  const [desc, setDesc] = useState(post.desc); // state of text content in textarea
  const [chooseImg, setChooseImg] = useState(post.img !== ""); // state of choosing img or not
  const [img, setImg] = useState(post.img); // state of img to preview
  const [imgFile, setImgFile] = useState(null); // state of file img to post to s3

  // useRef
  const cardContentText = useRef(); // reference to textarea of card
  const reader = useRef(); // reference to reader in FileReader
  const postBtn = useRef(); // reference to post button of card

  const handlePreviewImg = (e) => {
    const fileInput = e.target.files[0];
    if (reader.current) reader.current.abort();
    if (fileInput) {
      reader.current = new FileReader();

      reader.current.onload = () => {
        if (reader.current.readyState == 2) {
          setImg(reader.current.result);
        }
      };
      reader.current.readAsDataURL(fileInput);
      setImgFile(fileInput);
      e.target.value = null;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (postBtn.current && postBtn.current.classList.contains("cardButtonActive")) {
      const edittedPost = {
        userId: user._id,
        desc: desc,
        img: img,
      };
      try {
        dispatch(postStart());
        if (imgFile) {
          const formData = new FormData();
          formData.append("tvl-post-img", imgFile);
          try {
            const res = await axios.post("/upload/post-img", formData);
            edittedPost.img = res.data;
          } catch (err) {
            console.log(err);
          }
        }
        if (desc !== "" || imgFile) {
          await axios.put(`/posts/${post._id}`, edittedPost);
          // close edit card right away
          setEditPostVisible(false);
          dispatch(postUpdate({ id: post._id, value: { desc: edittedPost.desc, img: edittedPost.img } }));
          dispatch(postSuccess());
        } else {
          const msg = "This post appears to be blank. Please write something or attach a link or photo to post.";
          dispatch(postFail(msg));
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("inactive");
    }
  };
  useEffect(() => {
    setDesc(post.desc);
    setImg(post.img);
    setChooseImg(post.img != "");

    if (editPostVisible) {
      // fix the height right after opening create-post
      if (cardContentText.current) {
        cardContentText.current.style.height = "auto";
        cardContentText.current.style.height = `${cardContentText.current.scrollHeight}px`;
      }
      // fix the active state of post button right after opening create-post
      if (postBtn.current) {
        if (desc != post.desc || img != post.img) {
          if (desc != "" || chooseImg) {
            postBtn.current.classList.add("cardButtonActive");
          } else {
            postBtn.current.classList.remove("cardButtonActive");
          }
        } else {
          postBtn.current.classList.remove("cardButtonActive");
        }
      }
      document.querySelector("html").style.position = "fixed";
    } else {
      document.querySelector("html").style.position = "relative";
    }
  }, [editPostVisible]);

  useEffect(() => {
    // enable post button if having new desc or new chooseImg
    if (postBtn.current != undefined) {
      if (desc != post.desc || img != post.img) {
        if (desc != "" || chooseImg) {
          postBtn.current.classList.add("cardButtonActive");
        } else {
          postBtn.current.classList.remove("cardButtonActive");
        }
      } else {
        postBtn.current.classList.remove("cardButtonActive");
      }
    }
  }, [desc, img, chooseImg]);

  return (
    <>
      {editPostVisible && (
        <div className="cardContainer">
          <form
            ref={cardRef}
            id="create-post"
            className="cardWrapper"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <div className="cardHeader">
              <h2 className="cardHeaderName">Edit Post</h2>
              <div
                className="cardCloseBtn"
                onClick={() => {
                  setEditPostVisible(false);
                }}
              >
                <Close />
              </div>
            </div>
            <div className="cardInfo">
              <div className="cardInfoLeft">
                <img src={user.profilePicture || PUBLIC_FOLDER + "defaultAvt.jpg"} className="cardProfilePicture" />
              </div>
              <div className="cardInfoRight">
                <span className="cardUsername">{user.username}</span>
              </div>
            </div>
            <div className="cardContent">
              <div className="cardContentTextWrapper">
                <textarea
                  ref={cardContentText}
                  className="cardContentText"
                  rows="3"
                  placeholder={`What's on your mind, ${user.username}?`}
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  onInput={(e) => { }}
                ></textarea>
              </div>
              {chooseImg && (
                <div className="cardContentImg">
                  <div
                    className="cardContentImgCloseBtn"
                    onClick={() => {
                      setChooseImg(false);
                      setImg("");
                      setImgFile(null);
                    }}
                  >
                    <Close />
                  </div>
                  <input
                    type="file"
                    id="file"
                    name="post-img"
                    style={{ display: "none" }}
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => handlePreviewImg(e)}
                  />
                  {img !== "" ? (
                    <img className="cardContentImgPreview" alt="" src={img} />
                  ) : (
                    <label htmlFor="file" className="cardContentAlt">
                      <div className="cardContentAltInside">
                        <div className="cardContentAltInsideIcon">
                          <AddAPhoto />
                        </div>
                        <span className="cardContentAltInsideFirstLine">Add Photos/Videos</span>
                        <span className="cardContentAltInsideSecondLine">or drag and drop</span>
                      </div>
                    </label>
                  )}
                </div>
              )}
            </div>
            <div className="cardOptions">
              <div className="cardOptionsLeft">
                <span>Add to your post</span>
              </div>
              <div className="cardOptionsRight">
                <div
                  className="cardOption"
                  onClick={() => {
                    setChooseImg(true);
                  }}
                >
                  <PermMediaRounded style={{ color: "#00f050" }} />
                </div>
                <div className="cardOption">
                  <TagFacesOutlined style={{ color: "#e6c002" }} />
                </div>
              </div>
            </div>
            <div className="cardButtonWrapper">
              <button ref={postBtn} className="cardButton" type="submit" disabled={isFetching}>
                {isFetching ? <CircularProgress style={{ color: "#fff" }} size="25px" /> : "Save"}
              </button>
            </div>
            {error && (
              <div className="cardError">
                <span className="cardErrorContent">{error}</span>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default EditPost;
