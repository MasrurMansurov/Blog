import { Box } from '@mui/material'
import ListPosts from '../../components/posts-list/ListPosts'

const Posts = () => {
  return (
    <Box sx={{maxWidth: '1000px', margin: 'auto'}}>
      <ListPosts/>
    </Box>
  )
}

export default Posts
