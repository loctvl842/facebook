import './topbarCenter.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useContext, memo } from 'react';
// context
import { Store } from '../../../store/store';
import { SetPosts, PostStart } from '../../../store/actions';

// icon
import { HomeIcon, ChatIcon, PeopleIcon } from '../../../icon';

function TopbarCenter({ pathname }) {
    const navigate = useNavigate();
    const { dispatch } = useContext(Store);
    const handleHomePageClick = async () => {
        dispatch(PostStart());
        window.scrollTo(0, 0);
        navigate('/');
        const res = await axios.get('/posts/random/6');
        dispatch(
            SetPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            )
        );
    };

    const handleMessengerPageClick = () => {
        window.scrollTo(0, 0);
        navigate('/messenger');
    };

    const handleFriendsPageClick = () => {
        window.scrollTo(0, 0);
        navigate('/friends');
    };

    return (
        <div className="topbarCenter">
            <div className="topbarCenterWrapper">
                <div
                    onClick={handleHomePageClick}
                    className={`topbarCenterPageContainer ${
                        pathname === '/' && 'topbarCenterPageActive'
                    }`}
                >
                    <div className="topbarCenterPage">
                        <HomeIcon
                            sx={{
                                color: pathname === '/' ? '#1877f2' : '#aaa',
                                fontSize: '28px',
                            }}
                        />
                    </div>
                </div>
                <div
                    onClick={handleMessengerPageClick}
                    className={`topbarCenterPageContainer ${
                        pathname === '/messenger' && 'topbarCenterPageActive'
                    }`}
                >
                    <div className="topbarCenterPage">
                        <ChatIcon
                            sx={{
                                color:
                                    pathname === '/messenger'
                                        ? '#1877f2'
                                        : '#aaa',
                                fontSize: '28px',
                            }}
                        />
                    </div>
                </div>
                <div
                    onClick={handleFriendsPageClick}
                    className={`topbarCenterPageContainer ${
                        pathname === '/friends' && 'topbarCenterPageActive'
                    }`}
                >
                    <div className="topbarCenterPage">
                        <PeopleIcon
                            sx={{
                                color:
                                    pathname === '/friends'
                                        ? '#1877f2'
                                        : '#aaa',
                                fontSize: '28px',
                            }}
                            fontSize="medium"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopbarCenter;
