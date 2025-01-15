import { Box, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import AddComment from "../../components/addComment/AddComment"
import { useStore } from "../../components/store/useStore"
import "../../components/style.css"
import { apiComments } from "../../api/path"
import loading from "../../assets/loading.svg"
import { axiosInstance } from "../../api/axios"


// Icons
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';

const SinglePost = () => {

  const navigate = useNavigate()
  const { id } = useParams() as { id: string }
  const { posts, getComments } = useStore()
  const [loadingComments, setLoadingComments] = useState(false)

  const loadComments = async (id: number) => {
    try {
      const response = await axiosInstance.get(`${apiComments}?postId=${id}`)
      getComments(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const post = posts.find((post) => post.id === +id)
  const comments = post ? post.comments : []

  useEffect(() => {
    if (!comments.length) {
      loadComments(+id)
      setLoadingComments(true)
    }
  }, [])

  if(!comments.length && loadingComments){
    return <div className="loading"> <img src={loading} alt="Loading..." /> </div>
  }

  const handleNavigate = () => {
    navigate('../posts')
  }

  return (
    <Box sx={{ maxWidth: '1000px', margin: 'auto' }}>
      <Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
        <AddComment /> 
      <Button onClick={handleNavigate} variant="outlined">Back to posts</Button>
      </Box>


      <div>
        {
          comments.length > 0 ?
            (<p className="comment">There are {comments.length} comments</p>) :
            (<p className="comment">No comments yet :)</p>)
        }
      </div>

      <Box className="main-card">
        {
          comments.length > 0 &&
          comments.map(({ id, name, email, body }) => {
            return (
              <Box className="main-comment" key={id}>
                <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <PersonOutlineOutlinedIcon />
                  <p className="name">{name}</p>
                </Box>
                <Box sx={{ display: 'flex', gap: '5px' }}>
                  <AlternateEmailOutlinedIcon />
                  <p className="email">{email}</p>
                </Box>
                <p className="body">{' - ' + body}</p>
              </Box>
            );
          })
        }
      </Box>
    </Box>
  )
}

export default SinglePost
