import "../style.css"
import { Post } from "../../type/Post";
import PostItem from "../posts-item/post-item";


interface Props {
  data: Post[]
}

const ListPosts = ({data}: Props) => {
    const newPosts = data
  return (
    <div>
      { 
       newPosts.length > 0 && 
       newPosts.map((post) => <PostItem key={post.id} data={post} />)
      }
    </div>
  )
}

export default ListPosts
