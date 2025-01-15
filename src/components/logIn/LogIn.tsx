import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { axiosInstance } from "../../api/axios";
import { apiUsers } from "../../api/path";
import { useStore } from "../../store/useStore";
import toast from 'react-hot-toast'

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
        const profile = response.data
        localStorage.setItem('profile', JSON.stringify(profile))
        setProfile(profile)
    } 
    catch (error) {
         console.error(error)
         throw error
    } 
    finally {
         setLogInLoading(false);
    } 
  };

  const notify = () => toast.success('Successfully Loaded!')

  const handleClick = () => {
    setLogInLoading(true);
    setTimeout(() => {
      logIn();
      notify()
    }, 1000);
  };


  return (
    <Box>
      <Button
        sx={btnStyle}
        onClick={()=>  {handleClick(), notify}}
        disabled={logInLoading} 
        color="success"
      >
        <span>
          {logInLoading ? (
            <CircularProgress />
          ) : (
            <Typography>Log In</Typography>
          )}
        </span>
      </Button>
    </Box>
  );
};

export default LogIn;
