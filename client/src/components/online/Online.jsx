import './online.css';

const Online = ({ user }) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li key={user.id} className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img
                    className="rightbarProfileImg"
                    src={PUBLIC_FOLDER + user.profilePicture}
                    alt=""
                />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUserName">{user.username}</span>
        </li>
    );
};

export default Online;
