import './topbarRight.css';

// component
import TopbarUser from '~/components/topbarUser/TopbarUser';

function TopbarRight() {
  return (
    <div className="topbarRight">
      <div className="topbarOptionContainer">
        <TopbarUser />
      </div>
    </div>
  );
}

export default TopbarRight;
