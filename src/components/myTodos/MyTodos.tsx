import { useEffect, useState } from "react"
import { axiosInstance } from "../../api/axios"
import { apiTodos } from "../../api/path"
import { Box, Typography } from "@mui/material"
import Loading from "../../assets/loading.svg"
import { useStore } from "../../store/useStore"
import "../style.css"

const MyTodos = () => {
  const { profile, setMyTodos} = useStore()
  const [loading, setLoading] = useState(false)
    
  const getMyTodos = async (id: number) => {
      try {
          setLoading(true)
          const response = await axiosInstance.get(`${apiTodos}?userId=${id}`)
          setMyTodos(response.data)
      } catch (error) {
          console.error(error)
      } finally {
          setLoading(false)
      }
  }

  useEffect(()=> {
      if (profile && !profile.todos) {
          getMyTodos(profile.id)
      }
  },[])

  if (!profile) {
      return null
  }

  if(loading){
    return <div className="loading"> <img src={Loading} alt="Loading..." /> </div>
  }

  return (
    <Box>
      {
        profile?.todos?.length &&
        profile?.todos.map(({id, title, completed}) => {
          return (
            <Box
              sx={{
                border: '1px solid gray',
                mt: '10px',
                p: '10px 10px',
                borderRadius: '7px'
                }}
                key={id}
                >
              <Typography
                sx={
                  completed ?
                  {textDecoration: 'line-through', textDecorationColor: 'red'} :
                  {textDecoration: 'none'}
                  }>
                  {title}
              </Typography>
            </Box>
          )
        })
      }
    </Box>
  )
}

export default MyTodos
