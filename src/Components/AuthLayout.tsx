import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  function isOneHourElapsed(startTime: number, endTime: number) {
    // Calculate the difference in milliseconds
    const difference = endTime - startTime;

    // Convert 1 hour to milliseconds (1 hour = 60 minutes = 3600 seconds = 3600000 milliseconds)
    const oneHourInMilliseconds = 3600 * 1000;

    // Check if the difference is greater than or equal to one hour
    return difference >= oneHourInMilliseconds;
  }
  useEffect(() => {
    const accessToken = localStorage.getItem("eduAccessToken");
    if (!accessToken) {
      navigate("/login");
      return;
    }
    const timestamp = localStorage.getItem("eduAccessTokenTimeStamp");
    if (isOneHourElapsed(parseInt(timestamp!), Date.now())) {
      navigate("/login");
      return;
    }
  }, []);
  return <>{children}</>;
};

export default AuthLayout;
