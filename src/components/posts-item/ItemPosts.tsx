import { Post } from "../post-type/Post";
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

// Typography fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Animation
import { motion } from "framer-motion";

interface Props {
  data: Post;
}

const ItemPosts = ({ data }: Props) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
      sx={{ minWidth: 275 }}
    >
      <br />
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <NumbersOutlinedIcon />
            <Typography sx={{ color: "text.secondary", fontSize: 15 }}>
              {data.id}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <AbcOutlinedIcon />
            <Typography variant="subtitle2" gutterBottom>
              {data.title}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ChatBubbleOutlineIcon />
            <Typography variant="body2" color="text.secondary">
              {data.body}
            </Typography>
          </Box>
          <Link to={`/post/${data.id}/comments`}>
            <Button
              variant="outlined"
              color="success"
              size="small"
              sx={{ mt: 2 }}
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

export default ItemPosts;
