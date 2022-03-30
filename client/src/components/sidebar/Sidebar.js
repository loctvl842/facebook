import './sidebar.css';

// context
import { Store } from '../../store/store';
import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import {
    PeopleIcon,
    BookmarkIcon,
    GroupsIcon,
    StoreIcon,
    OndemandVideoIcon,
    WatchLaterRoundedIcon,
    AssistantPhotoRoundedIcon,
    KeyboardArrowDownRoundedIcon,
} from '../../icon';

const Sidebar = () => {
    let navigate = useNavigate();

    const {
        auth: { user },
    } = useContext(Store);

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li
                        className="sidebarListItem"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            navigate(`/profile/${user.username}`);
                        }}
                    >
                        <img
                            src={
                                user.profilePicture ||
                                PUBLIC_FOLDER + 'defaultAvt.jpg'
                            }
                            alt="avatar"
                            className="sidebarImg sidebarIcon"
                        />
                        <span className="sidebarListItemText">
                            {user.username}
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <PeopleIcon
                            className="sidebarIcon"
                            style={{ color: '#0055ff' }}
                        />
                        <span className="sidebarListItemText">Friends</span>
                    </li>
                    <li className="sidebarListItem">
                        <BookmarkIcon
                            className="sidebarIcon"
                            style={{ color: '#c800ff' }}
                        />
                        <span className="sidebarListItemText">Saved</span>
                    </li>
                    <li className="sidebarListItem">
                        <GroupsIcon
                            className="sidebarIcon"
                            style={{ color: '#00ff22' }}
                        />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <StoreIcon
                            className="sidebarIcon"
                            style={{ color: '#ff9500' }}
                        />
                        <span className="sidebarListItemText">Marketplace</span>
                    </li>
                    <li className="sidebarListItem">
                        <OndemandVideoIcon
                            className="sidebarIcon"
                            style={{ color: '#ff5100' }}
                        />
                        <span className="sidebarListItemText">Watch</span>
                    </li>
                    <li className="sidebarListItem">
                        <WatchLaterRoundedIcon
                            className="sidebarIcon"
                            style={{ color: '#dd00ff' }}
                        />
                        <span className="sidebarListItemText">Memories</span>
                    </li>
                    <li className="sidebarListItem">
                        <AssistantPhotoRoundedIcon
                            className="sidebarIcon"
                            style={{ color: '#808080' }}
                        />
                        <span className="sidebarListItemText">Pages</span>
                    </li>
                </ul>

                <div className="sidebarListItem">
                    <KeyboardArrowDownRoundedIcon className="sidebarIcon" />
                    <span className="sidebarListItemText">See more</span>
                </div>
                <hr style={{ margin: '5px 0' }} />
            </div>
        </div>
    );
};

export default Sidebar;
