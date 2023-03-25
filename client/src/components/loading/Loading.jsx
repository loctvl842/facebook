import "./loading.css";

import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <div className="loadingContainer">
      <CircularProgress style={{ color: "#1877f2" }} size="50px" />
    </div>
  );
}

export default Loading;
