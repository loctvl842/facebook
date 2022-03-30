import './topbarRight.css';

// component
import Account from '../../account/Account';

function TopbarRight() {
    return (
        <div className="topbarRight">
            <div className="topbarOptionContainer">
                <Account />
            </div>
        </div>
    );
}

export default TopbarRight;
