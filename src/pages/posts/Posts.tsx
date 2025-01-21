import { Box, CircularProgress } from '@mui/material'
import ListPosts from '../../components/posts-list/ListPosts'
// import { useState } from "react"
import { axiosInstance } from '../../api/axios';
import { Post } from '../../type/Post';
import { User } from '../../type/User';
import { apiPosts, apiUsers } from '../../api/path';
import { useQuery } from '@tanstack/react-query';

// Pagination
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

const Posts = () => {
  
  // Query Posts 
  const getPosts = async () => {
    const posts = await axiosInstance.get<Post[]>(apiPosts)
    return posts.data
  }
  const { data: dataPosts, isPending: isPendingPosts, error: errorPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })
  // Query Users
  const getUsers = async () => {
    const users = await axiosInstance.get<User[]>(apiUsers)
    return users.data
  }
  const { data: dataUsers, isPending: isPendingUsers, error: errorUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  const isPending = isPendingPosts || isPendingUsers
  const error = errorPosts || errorUsers
 
  if(isPending){
    return <div className="loading"> <CircularProgress /> </div>
  }
  if(error){
    return <div>An error has occurred: {error.message}</div>
  }

  // Pagination
  // const [currentPage, setCurrentPage] = useState(1)
  // const itemsPerPage = 10

  // const startIndex = (currentPage - 1) * itemsPerPage
  // const endIndex = startIndex + itemsPerPage
  // const currentPosts = dataPosts?.slice(startIndex, endIndex)

  // const handleChangePage = ( _: React.ChangeEvent<unknown>, value: number ) => {
  //   setCurrentPage(value)
  // }
 
  // Finding users
   const newPosts = dataPosts.map((post) => {
      const user = dataUsers.find((user) => user.id === post.userId) as User
      return {...post, userName: user?.name } 
    })

  return (
    <Box sx={{maxWidth: '1000px', margin: 'auto'}}>
      <ListPosts data={newPosts} />
{/* 
      <Stack sx={{marginTop: '20px', marginBottom: '20px'}} spacing={2}>
         <Pagination 
         count={Math.ceil(dataPosts.length / itemsPerPage)}
         page={currentPage}
         onChange={handleChangePage}
         color="primary"
          />
      </Stack> */}
    </Box>
  )
}

export default Posts
