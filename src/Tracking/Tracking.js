// import axios from 'axios';
import React, { useEffect } from "react";
// import { axiosInstance } from "../config/axios";
import { useSearchParams } from "react-router-dom";

function Tracking() {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    console.log("props.match.params");
    console.log(searchParams.get("trackingNo"));
    // console.log(props.params.trackingNo);
    // axiosInstance.get(`shipments/track/${44}`);
  }, []);
  return <div>Tracking Page Works !</div>;
}

export default Tracking;
