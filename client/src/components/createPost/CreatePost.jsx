import "./createPost.css";

// icons
import { CircularProgress } from "@mui/material";

// context
import { FeedStore } from "../../context/FeedContext/store";
import { AuthStore } from "../../context/AuthContext/store";
import {
  AddPost,
  PostStart,
  PostFailure,
} from "../../context/FeedContext/actions";

import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";

import {
  Close,
  PermMediaRounded,
  TagFacesOutlined,
  AddAPhoto,
} from "@mui/icons-material";

function CreatePost({ visible, setVisible, cardRef }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  // get the current user
  const { feed, dispatch } = useContext(FeedStore);
  const {
    auth: { user },
  } = useContext(AuthStore);

  // useState
  const [desc, setDesc] = useState(""); // state of text content in textarea
  const [img, setImg] = useState(""); // state of img to preview
  const [imgFile, setImgFile] = useState(null); // state of file img to post to s3
  const [chooseImg, setChooseImg] = useState(false); // state of choosing img or not

  // useRef
  const reader = useRef(); // reference to reader in FileReader
  const postBtn = useRef(); // reference to post button of card
  const cardContentText = useRef(); // reference to textarea of card

  // change image to preview
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

  // post the to database
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      postBtn.current &&
      postBtn.current.classList.contains("cardButtonActive")
    ) {
      const newPost = {
        userId: user._id,
        desc: desc,
      };
      try {
        dispatch(PostStart());
        if (imgFile) {
          const formData = new FormData();
          formData.append("tvl-post-img", imgFile);
          try {
            const res = await axios.post("/upload/post-img", formData);
            newPost.img = res.data;
          } catch (err) {
            console.log(err);
          }
        }
        if (desc !== "" || imgFile) {
          const res = await axios.post("/posts", newPost);
          setVisible(false);
          setDesc("");
          setChooseImg(false);
          setImg("");
          setImgFile(null);
          dispatch(AddPost(res.data));
        } else {
          dispatch(
            PostFailure(
              "This post appears to be blank. Please write something or attach a link or photo to post."
            )
          );
        }
      } catch (err) {
        dispatch(PostFailure(err));
        console.log(feed.error);
      }
    }
  };

  useEffect(() => {
    if (visible) {
      // fix the height right after opening create-post
      if (cardContentText.current) {
        cardContentText.current.style.height = "auto";
        cardContentText.current.style.height = `${cardContentText.current.scrollHeight}px`;
      }
      // fix the active state of post button right after opening create-post
      if (postBtn.current) {
        if (desc || chooseImg) {
          postBtn.current.classList.add("cardButtonActive");
        } else {
          postBtn.current.classList.remove("cardButtonActive");
        }
      }
      document.querySelector("html").style.position = "fixed";
    } else {
      document.querySelector("html").style.position = "relative";
    }
  }, [visible]);

  useEffect(() => {
    // enable post button if having desc or chooseImg
    if (postBtn.current != undefined) {
      if (desc || chooseImg) {
        postBtn.current.classList.add("cardButtonActive");
      } else {
        postBtn.current.classList.remove("cardButtonActive");
      }
    }
  }, [desc, chooseImg]);

  return (
    <>
      {visible && (
        <div className="cardContainer">
          <form
            ref={cardRef}
            id="create-post"
            className="cardWrapper"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <div className="cardHeader">
              <h2 className="cardHeaderName">Create Post</h2>
              <div
                className="cardCloseBtn"
                onClick={() => {
                  setVisible(false);
                }}
              >
                <Close />
              </div>
            </div>
            <div className="cardInfo">
              <div className="cardInfoLeft">
                <img
                  src={user.profilePicture || PUBLIC_FOLDER + "defaultAvt.jpg"}
                  className="cardProfilePicture"
                />
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
                  onInput={(e) => {}}
                ></textarea>
              </div>
              {chooseImg && (
                <div className="cardContentImg">
                  <div
                    className="cardContentImgCloseBtn"
                    onClick={() => {
                      setChooseImg(false);
                      setImg("");
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
                        <span className="cardContentAltInsideFirstLine">
                          Add Photos/Videos
                        </span>
                        <span className="cardContentAltInsideSecondLine">
                          or drag and drop
                        </span>
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
              <button
                ref={postBtn}
                className="cardButton"
                type="submit"
                disabled={feed.isFetching}
              >
                {feed.isFetching ? (
                  <CircularProgress style={{ color: "#fff" }} size="25px" />
                ) : (
                  "Post"
                )}
              </button>
            </div>
            {feed.error && (
              <div className="cardError">
                <span className="cardErrorContent">{feed.error}</span>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default CreatePost;
