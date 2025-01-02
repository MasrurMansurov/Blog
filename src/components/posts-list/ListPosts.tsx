import { useEffect, useState } from "react"
import { useStore } from "../store/useStore"
import ItemPosts from "../posts-item/ItemPosts"

// Pagination
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const ListPosts = () => {
    const {data, getData} = useStore()
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    useEffect(() => {
        getData()
    }, [])

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = data.slice(startIndex, endIndex)

    const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value)
    }

  return (
    <div>
       { 
        currentData.length > 0 &&
          currentData.map((item)=>{
              return ( <ItemPosts key={item.id} data={item} /> )
          })
       }

     <Stack sx={{marginTop: '20px', marginBottom: '20px'}} spacing={2}>
        <Pagination 
        count={Math.ceil(data.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        color="primary" />
     </Stack>
    </div>
  )
}

export default ListPosts
