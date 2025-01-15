import { axiosInstance } from "../../api/axios"
import { apiPosts } from "../../api/path"
import { useEffect, useState } from "react"
import { useStore } from "../store/useStore"
import { Box, Typography } from "@mui/material"
import Loading from "../../assets/loading.svg"
import "../style.css"

// Icons
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";


const MyPosts = () => {
  const {profile, setMyPosts } = useStore()
  const [loading, setLoading] = useState(false)
  
  const getMyPosts = async (id: number) => {
      setLoading(true)
      try {
          const response = await axiosInstance.get(`${apiPosts}?userId=${id}`)
          setMyPosts(response.data)
      } catch (error) {
          console.error(error)
      } finally {
          setLoading(false)
      }
  }  

  useEffect(()=> {
      if (profile && !profile.posts) {
          getMyPosts(profile.id)
      }
  },[])


  if (!profile) {
      return null
  }

  if (loading){
    return <div className="loading"> <img src={Loading} alt="Loading..." /> </div>
  }

  return (
    <div>
      {
        profile?.posts?.length > 0 &&
        profile.posts.map(({id, title, body})=> {
            return (
              // Post => ID
                <Box 
                  sx={{
                    mb: '15px', 
                    border: '1px solid gray', 
                    p: '10px 20px', 
                    borderRadius: '7px'
                    }} 
                    key={id}
                    > 

                    {/* Post => TITLE */}
                    <Box 
                    sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "5px" 
                      }}
                      >
                      <AbcOutlinedIcon />
                      <Typography variant="subtitle2" gutterBottom>
                        {title}
                      </Typography>
                    </Box>
                     
                     {/* Post => BODY */}
                    <Box sx={{ display: "flex", gap: "5px" }}>
                      <ChatBubbleOutlineIcon />
                      <Typography variant="body2" color="text.secondary">
                        {body}
                      </Typography>
                    </Box>  
                </Box>
            )
        })
      }
    </div>
  )
}

export default MyPosts
