import { useEffect, useState } from "react"
import loading from "../../assets/loading.svg"
import { apiPosts, apiUsers } from "../../api/path";
import { User } from "../../type/User";
import "../style.css"
import { Post } from "../../type/Post";
import PostItem from "../posts-item/post-item";
import { axiosInstance } from "../../api/axios";
import { useStore } from "../../store/useStore";

interface Props {
  data: Post[]
}

const ListPosts = ({data}: Props) => {

  const currentPosts = data

    const {posts, getPosts, users, getUsers} = useStore()
    const [loadingPost, setLoadingPost] = useState(false)

      const loadPosts = async () => {
        try {
          const response = await axiosInstance.get(apiPosts)
          getPosts(response.data)
        } catch (error) {
            console.error(error)
        }
      }

      const loadUsers = async () => {
        try {
          const response = await axiosInstance.get(apiUsers)
            getUsers(response.data)
        } catch (error) {
            console.error(error)
        }
      } 

    useEffect(() => {
      if (!posts.length) {
        loadUsers()
        loadPosts()
        setLoadingPost(true)
      }
    }, [])


    if(!posts.length && loadingPost){
      return <div className="loading"> <img src={loading} alt="Loading..." /> </div>
    }

    if(!users.length){
      return <div>Not found</div>
    }

    const newPosts = currentPosts.map(post => {
      const user = users.find(user => user.id === post.userId) as User
      return {...post, userName: user.name } 
    })

  return (
    <div>
      { 
       newPosts.length > 0 && 
       newPosts.map(post => <PostItem key={post.id} data={post} />)
      }
    </div>
  )
}

export default ListPosts
