import { Link, useLocation, Navigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import LogIn from '../logIn/LogIn';
import { useStore } from '../../store/useStore';

// Menu
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


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
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const location = useLocation().pathname
    const profile = useStore((state) => state.profile);
    const logOut = useStore((state) => state.logOut);

    // Menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const removeProfileFromLocalStorage = () => {
      localStorage.removeItem('profile');
      logOut()
      handleClose()
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

          {
            profile ? (
            <Box>
              <Button 
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick} 
                variant="outlined"
                >
                  {profile.name}
                </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem key='profile'>
                  <Link style={{textDecoration: 'none', color: 'black'}} to={`profile`}>
                      Profile
                  </Link>
                  </MenuItem>
                <MenuItem key='logout' onClick={removeProfileFromLocalStorage}>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
            ) :
            <Button onClick={handleOpenModal} variant='outlined' color='success'>Log In</Button>
          }

          <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                { profile ?  setTimeout(() => {handleCloseModal()},0.1) && <Navigate to='/' />  : <LogIn/> }
              </Box>
            </Modal>
       </Box> 
  )
}

export default Header




