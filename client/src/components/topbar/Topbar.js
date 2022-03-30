import './topbar.css'
import { memo } from 'react'

// component
import TopbarLeft from './topbarLeft/TopbarLeft'
import TopbarRight from './topbarRight/TopbarRight'
import TopbarCenter from './topbarCenter/TopbarCenter'

import { useLocation } from 'react-router-dom'

const Topbar = () => {
  const location = useLocation()

  return (
    <div className="topbarContainer">
      <TopbarLeft />
      <TopbarCenter pathname={location.pathname} />
      <TopbarRight />
    </div>
  )
}

export default memo(Topbar)
