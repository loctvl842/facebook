import './share.css';

// context
import { Store } from '../../store/store';
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import CreatePost from '../createPost/CreatePost';
import {
    VideoCallIcon,
    PermMediaRoundedIcon,
    TagFacesOutlinedIcon,
} from '../../icon';
import { useClickOutside } from '../../customHook/useClickOutside';

const Share = () => {
    const navigate = useNavigate();

    const {
        auth: { user },
    } = useContext(Store);

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const { visible, setVisible, ref: cardRef } = useClickOutside(false);
    return (
        <div className="share">
            <CreatePost
                visible={visible}
                setVisible={setVisible}
                cardRef={cardRef}
            />
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className="shareProfileImg"
                        src={
                            user.profilePicture ||
                            PUBLIC_FOLDER + 'defaultAvt.jpg'
                        }
                        alt=""
                        onClick={() => {
                            window.scrollTo(0, 0);
                            navigate(`/profile/${user.username}`);
                        }}
                    />
                    <div
                        className="shareInput"
                        onClick={() => setVisible(true)}
                    >
                        What's on your mind, {user.username}?
                    </div>
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <span className="shareOptionText">
                                <VideoCallIcon
                                    style={{ color: '#f00' }}
                                    className="shareIcon"
                                />
                                Live video
                            </span>
                        </div>
                        <div
                            className="shareOption"
                            onClick={() => {
                                setVisible(true);
                            }}
                        >
                            <span className="shareOptionText">
                                <PermMediaRoundedIcon
                                    style={{ color: '#00f050' }}
                                    className="shareIcon"
                                />
                                Photo/Video
                            </span>
                        </div>
                        <div className="shareOption">
                            <span className="shareOptionText">
                                <TagFacesOutlinedIcon
                                    style={{ color: '#e6c002' }}
                                    className="shareIcon"
                                />
                                Feeling/Activity
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
