import { Link } from "react-router-dom";

// Card
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Icons
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// Typography fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Animation
import { motion } from "framer-motion";

interface Post {
  id: number, 
  title: string, 
  body: string,
  userId: number,
  userName?: string
 };

interface Props {
  data: Post
  }

const PostItem = ({ data }: Props) => {
  const { id, title, body, userId, userName } = data
  
  return (
    <Box
      component={motion.div} 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
      sx={{ minWidth: 275}}
    >
      <br />
      <Card variant="outlined">
        <CardContent>

            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <NumbersOutlinedIcon />
              <Typography sx={{ fontSize: 15, fontWeight: '700' }}>
                {id}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <AbcOutlinedIcon />
              <Typography variant="subtitle2" gutterBottom>
                {title}
              </Typography>
            </Box>

            {
              userName &&
              <Link style={{textDecoration: 'none'}} to={`/user/${userId}`}>
                <Box 
                sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "5px", 
                    color: 'blue', 
                    ":hover":{color: 'gray', transition: '0.2s'} 
                  }}
                >
                <PersonOutlineOutlinedIcon/>
                <Typography variant="subtitle2">
                  {userName}
                </Typography>
                </Box>
              </Link>
            }

            <Box sx={{ display: "flex", gap: "5px" }}>
              <ChatBubbleOutlineIcon />
              <Typography variant="body2" color="text.secondary">
                {body}
              </Typography>
            </Box>

          <Link to={`/post/${id}/comments`}>
            <Button
              variant="outlined" 
              color="success"
              size="small"
              sx={{ mt: 2, backgroundColor: 'white' }}
              component={motion.button} 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
            >
              See Comments
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostItem;
