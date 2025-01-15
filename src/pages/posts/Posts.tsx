import { Box } from '@mui/material'
import ListPosts from '../../components/posts-list/ListPosts'
import { useState } from "react"
import { useStore } from '../../components/store/useStore';

// Pagination
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Posts = () => {

  const { posts } = useStore()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPosts = posts.slice(startIndex, endIndex)

  const handleChangePage = ( _: React.ChangeEvent<unknown>, value: number ) => {
    setCurrentPage(value)
  }


  return (
    <Box sx={{maxWidth: '1000px', margin: 'auto'}}>
      <ListPosts data={currentPosts} />

      <Stack sx={{marginTop: '20px', marginBottom: '20px'}} spacing={2}>
         <Pagination 
         count={Math.ceil(posts.length / itemsPerPage)}
         page={currentPage}
         onChange={handleChangePage}
         color="primary"
          />
      </Stack>
    </Box>
  )
}

export default Posts
