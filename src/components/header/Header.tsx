import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import LogIn from '../logIn/LogIn';
import { useStore } from '../../store/useStore';


const style = {
  fontSize: '20px', 
  color: '#333', 
  fontWeight: 'bold', 
  fontFamily: 'Arial, Helvetica, sans-serif', 
  textTransform: 'uppercase', 
  letterSpacing: '1.5px',
  padding: '10px 0', 
  textAlign: 'center', 
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  margin: 'auto',
  borderRadius: '10px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


const Header = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const location = useLocation().pathname
    const profile = useStore((state) => state.profile);
    const logOut = useStore((state) => state.logOut);
    const [isHovered, setIsHovered] = useState(false)

    const userStyle = {
      textDecoration: isHovered ? 'underline' : 'none',
      color: 'blue',
      fontSize: '25px',
      fontWeight: '900'
    }

  return (
      <Box 
      sx={{
        maxWidth: '1000px', 
        margin: 'auto', 
        justifyContent: 'space-between', 
        display: 'flex', 
        alignItems: 'center'
        }}
        >
        <Box 
        sx={{
          display: 'flex', 
          gap: '10px', 
          alignItems: 'center'
          }}
          >
          <Link style={{textDecoration: 'none'}} to="/" >
             <Typography 
              sx={{ ...style, textDecoration: location === '/' ? 'underline' : 'none'}}
              >
               Home
             </Typography>
          </Link> 
  
          <Link style={{textDecoration: 'none'}} to="/posts" >
             <Typography 
              sx={{ ...style, textDecoration: location === '/posts' ? 'underline' : 'none'}}
              >
               Posts
             </Typography>
          </Link> 
        </Box>

          <Button onClick={handleOpen} variant='outlined' color='success'>Log In</Button>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                {
                  profile ? (
                    <Box 
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                      }}
                      >
                        <Link
                          onClick={handleClose}
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                          style={userStyle} 
                          to={`/profile`}
                          >
                          {profile.name}
                        </Link>
                        <Box
                        sx={{
                          display: 'flex', 
                          alignItems: 'center',
                          gap: '20px',
                          mt: '20px'
                        }}
                        >
                        <Button
                        onClick={handleClose}
                        variant='outlined'
                        color='error'
                        >
                          Close
                        </Button>
                        <Button 
                          variant='outlined' 
                          onClick={() => ( logOut(), handleClose(), navigate('../posts') )}
                          >
                          Log Out
                        </Button>
                        </Box>
                    </Box>
                  ) :
                <LogIn/>
                }
              </Box>
            </Modal>
       </Box> 
  )
}

export default Header
