import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../../components/style.css"

// Api
import { apiComments } from "../../components/api-comment/Api"
import { apiPosts } from "../../components/api-post/Api"

// Icons
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';


const SinglePost = () => {
  const {id} = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loadingPost, setLoadingPost] = useState(true) 
  const [loadingComment, setLoadingComment] = useState(true)

  async function fetchPost() {
    const response = await fetch(apiPosts + id)
    return response.json()
  }

  async function fetchComment() {
    const response = await fetch(`${apiComments}?postId=${id}`)
    return response.json()
  }

  useEffect(()=>{
        fetchPost()
        .then(response => setPost(response))
        .catch(error => console.log(error))
        .finally(()=> setLoadingPost(false))
  },[id])


  useEffect(()=>{
    if(post){
      setLoadingComment(true)
        fetchComment()
        .then(response => setComments(response))
        .catch(error => console.log(error))
        .finally(()=> setLoadingComment(false))
    }
  },[post])

  if(loadingPost){
    return <p className="fetching">Fetching Post...</p>
  }

  if(!post){
    return <p>Something gone wrong :(</p>
  }

  return (
     <Box sx={{maxWidth: '1000px', margin: 'auto'}} >  
     
     <p>
       {
         comments.length > 0 ?
         (<p className="comment">There are {comments.length} comments</p>) :
         (<p className="comment">No comments yet...</p>)
       }
     </p>

    <Box className="main-card">
      {loadingComment ? (
        <p className="loading">Loading...</p>
       ) : 
       comments.length > 0 ? (
         comments.map(({ id, name, email, body }) => {
           return (
             <Box className="main-comment" key={id}>
               <Box sx={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                <PersonOutlineOutlinedIcon/>
                <p className="name">{name}</p>
               </Box>
               <Box sx={{display: 'flex', gap: '5px'}}>
                <AlternateEmailOutlinedIcon/>
                <p className="email">{email}</p>
               </Box>
                <p className="body">{ ' - ' + body}</p>
             </Box>
           );
         })
       ) : (
         <p>There is no comment :(</p>
      )}
      </Box>

     </Box>
  )
}

export default SinglePost
