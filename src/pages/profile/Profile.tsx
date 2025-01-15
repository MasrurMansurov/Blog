import { Box, Button } from "@mui/material"
import { Navigate, useNavigate } from "react-router-dom"
import TabProfile from "../../components/tab-profile/TabProfile"
import "../../components/style.css"
import { useStore } from "../../store/useStore";

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SignpostIcon from '@mui/icons-material/Signpost';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

const Profile = () => {
    const navigate = useNavigate()
    const profile = useStore((state) => state.profile)

   const style = {
    display: 'flex', 
    alignItems: 'center', 
    fontSize: '18px',
    gap: '5px'
   }

   const handleNavigate = () => {
    navigate('../posts')
   }

   if (profile === null) {
       return <Navigate to='/' />
   }

  return (
    <Box 
        sx={{
            maxWidth: '1000px',
            margin: 'auto'
        }} 
    >
        <Button
            variant="outlined"
            onClick={handleNavigate}
        >
            Back to Posts
        </Button>
        <Box key={profile.id}>
            <Box sx={style}>
                <Box sx={style}>
                    <AccountCircleIcon/>
                    <h3>{profile.name}</h3>
                </Box>
                <p style={{color: 'gray'}}>
                    <span style={{ fontFamily: 'serif', fontSize: 'smaller' }}>@</span>
                    {profile.username}
                </p>
            </Box>
            <Box sx={style}>
                <MailOutlineIcon/>
                <p>{profile.email}</p>
            </Box>
            <Box sx={style}>
                <SignpostIcon/>
                <p>{profile.address.street}</p>
            </Box>
            <Box sx={style}>
                <PublicOutlinedIcon/>
                <p>{profile.address.city}</p>
            </Box>
            <Box sx={style}>
                <LocalPhoneOutlinedIcon/>
                <p>{profile.phone}</p>
            </Box>
        </Box>
      <TabProfile/>
    </Box>
  )
}

export default Profile
