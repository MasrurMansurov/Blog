import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'

// Pages
import Home from './pages/home/Home'
import Posts from './pages/posts/Posts'
import SinglePost from './pages/singlePost/SinglePost'
import UserPage from './pages/userPage/UserPage'
import Profile from './pages/profile/Profile'



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
          path: "/posts",
          element: <Posts/>
        },
        {
          path: "/post/:id/comments",
          element: <SinglePost/>
        },
        {
          path: "/user/:id",
          element: <UserPage/>
        },
        {
          path: "/profile",
          element: <Profile/>
        }
      ]
    },
])

  return ( <RouterProvider router={router} /> )
}

export default App
