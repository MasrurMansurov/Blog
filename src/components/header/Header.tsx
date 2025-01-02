import { Link, useLocation } from 'react-router-dom'
import { Box, Typography } from '@mui/material'


const Header = () => {
    const location = useLocation().pathname

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

  return (
      <Box sx={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
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
  )
}

export default Header
