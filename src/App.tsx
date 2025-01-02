import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Posts from './pages/posts/Posts'
import Home from './pages/home/Home'
import Layout from './layout/Layout'
import SinglePost from './pages/singlePost/SinglePost'



function App() {
  
  const router = createBrowserRouter([
    {
      path :"/",
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path:"/posts",
          element: <Posts/>
        },
        {
          path:"/post/:id/comments",
          element: <SinglePost/>
        },
      ]
    },
])

  return ( <RouterProvider router={router} /> )
}

export default App
