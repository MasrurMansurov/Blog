import { Box, Button, CircularProgress } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import AddComment from "../../components/addComment/AddComment"
import "../../components/style.css"
import { apiComments } from "../../api/path"
import { axiosInstance } from "../../api/axios"
import { useQuery } from "@tanstack/react-query"
import { useStore } from "../../store/useStore"

// Icons
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';

const SinglePost = () => {

  const navigate = useNavigate()
  const { id } = useParams() as { id: string }
  const { posts } = useStore()
 
  const getComments = async (id: number) => {
    const response = await axiosInstance.get(`${apiComments}?postId=${id}`)
    return response.data
  }
  const { data, isPending, error } = useQuery({
    queryKey: ['comments', +id],
    queryFn: getComments,
  })

  if(isPending) {
    return <div className="loading"> <CircularProgress /> </div>
  }
  if(error) { 
    return <div>An error has occurred: {error.message}</div>
  }

  const post = posts.find((post) => post.id === +id)
  if (!post) {
    return <div className="loading">Sorry something gone wrong :(</div>
  }
  const comments = post.comments

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
