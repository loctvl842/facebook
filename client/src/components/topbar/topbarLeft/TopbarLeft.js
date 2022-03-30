import './topbarLeft.css';

import { useNavigate } from 'react-router-dom';
import { useContext, memo } from 'react';
// icon
import { SearchIcon } from '../../../icon';

// context
import { Store } from '../../../store/store';
import { SetPosts, PostStart } from '../../../store/actions';

import axios from 'axios';

function TopbarLeft() {
    const navigate = useNavigate();
    const { dispatch } = useContext(Store);

    const handleLogoClick = async () => {
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

    return (
        <div className="topbarLeft">
            <div className="logo" onClick={handleLogoClick}>
                <img src={'/logo/logo.jpeg'} alt="" className="logoImage" />
            </div>
            <div className="topbarSearch">
                <SearchIcon sx={{ fontSize: '20px', color: '#aaa' }} />
            </div>
        </div>
    );
}

export default memo(TopbarLeft);
