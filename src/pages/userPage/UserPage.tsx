import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Box, Button, Typography } from "@mui/material"
import { apiPosts } from "../../api/path"
import loading from "../../assets/loading.svg"
import "../../components/style.css"
import { axiosInstance } from "../../api/axios"

// Animation
import { motion } from "framer-motion";

// Icons
import  AbcOutlinedIcon  from '@mui/icons-material/AbcOutlined';
import  NumbersOutlinedIcon  from '@mui/icons-material/NumbersOutlined';
import  ChatBubbleOutlineIcon  from '@mui/icons-material/ChatBubbleOutline';


const UserPage = () => {

  const navigate = useNavigate()
  const {id} = useParams() as { id: string }
  const [post, setPost] = useState([])
  const [loadingProfile, setLoadingProfile] = useState(false)

  const getUserPosts = async (id: number) => {
    try {
        const response = await axiosInstance.get(`${apiPosts}?userId=${id}`)
        setPost(response.data)
      } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    if(!post.length){
      getUserPosts(+id)
      setLoadingProfile(true)
    }
  }, [])

  if(!post.length && loadingProfile){
    return <div className="loading"> <img src={loading} alt="Loading..." /> </div>
  }

  const handleNavigate = () => {
    navigate('../posts')
  }
  
  return (
    <div style={{maxWidth: '1000px', margin: 'auto'}}>
      <Button onClick={handleNavigate} variant="outlined">Back to posts</Button>

      <div>
        {
          post.length > 0 ?
            (<p className="comment">There are {post.length === 1 ? `${post.length}${' post'}` : `${post.length}${' posts'}`}</p>) :
            (<p className="comment">No posts yet :)</p>)
        }
      </div>

     {
      post.length > 0 &&
      post.map(({id, title, body})=> {
          return (
            <div className="main-comment" key={id}>
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

                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
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
            </div>
          );
      })
     }

    </div>
  )
}

export default UserPage
