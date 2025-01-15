import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import loading from "../../assets/loading.svg";
import { axiosInstance } from "../../api/axios";
import { apiUsers } from "../../api/path";
import { useStore } from "../../store/useStore";

const btnStyle = {
  display: 'block',
  margin: 'auto'
};

const LogIn = () => {
  const [logInLoading, setLogInLoading] = useState(false);
  const setProfile = useStore((state) => state.setProfile);


  const logIn = async () => {
    const id = Math.floor(Math.random() * 10) + 1;


    try {
      setLogInLoading(true)
      const response = await axiosInstance.get(`${apiUsers}/${id}`);
      setProfile(response.data)
   } catch (error) {
      console.error(error)
      throw error
   } finally {
      setLogInLoading(false);
   } 

  };

  const handleClick = () => {
    setLogInLoading(true);
    setTimeout(() => {
      logIn();
    }, 1000);
  };


  return (
    <Box>
      <Button
        sx={btnStyle}
        onClick={handleClick}
        variant="outlined"
        disabled={logInLoading} 
        color="success"
      >
        <span>
          {logInLoading ? (
            <img className="loading" src={loading} alt="Loading..." />
          ) : (
            <Typography>Log In</Typography>
          )}
        </span>
      </Button>
    </Box>
  );
};

export default LogIn;
