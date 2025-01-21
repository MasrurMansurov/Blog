import { Box, Button, CircularProgress } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import AddComment from "../../components/addComment/AddComment"
import "../../components/style.css"
import { apiComments, apiPosts } from "../../api/path"
import { axiosInstance } from "../../api/axios"
import { useQuery } from "@tanstack/react-query"
import { Post } from "../../type/Post"
import { Comment } from "../../type/Comment"

// Icons
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';

const SinglePost = () => {

  const navigate = useNavigate()
  const { id } = useParams() as { id: string }

  // Query Posts
  const getPosts = async () => {
    const response = await axiosInstance.get<Post[]>(apiPosts)
    return response.data
  }
  const { data: posts, isPending: isPendingPosts, error: errorPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    retry: 3
  })
 
  // Query Comments
  const getComments = async (id: number) => {
    const response = await axiosInstance.get<Comment[]>(`${apiComments}?postId=${id}`)
    return response.data
  }
  const { data: commentsData, isPending: isPendingComments, error: errorComments } = useQuery({
    queryKey: ['comments', +id],
    queryFn: () => getComments(+id),
  })

  const isPending = isPendingPosts || isPendingComments
  const error = errorPosts || errorComments

  if(isPending) {
    return <div className="loading"> <CircularProgress /> </div>
  }
  if (error) {
    return (
      <div>
        <h2>An error has occurred</h2>
        <p>{error.message}</p>
        <Button onClick={() => window.location.reload()} variant="outlined">
          Try again
        </Button>
      </div>
    );
  }
  
  const findPost = posts.find((post) => post.id === +id)
  if (!findPost) {
    return <div className="loading">Sorry something gone wrong :(</div>
  }
  const comments = commentsData

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
