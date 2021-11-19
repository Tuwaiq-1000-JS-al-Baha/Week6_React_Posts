import axios from "axios"
import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import AddPost from "./pages/AddPost"
import Home from "./pages/Home"
import Login from "./pages/Login"
import OnePost from "./pages/OnePost"
import Profile from "./pages/Profile"
import SignUp from "./pages/SignUp"
import PostsContext from "./utils/PostsContext"
import "./App.css"

function App() {
  const [posts, setPosts] = useState([])
  const [profile, setProfile] = useState(null)

  const navigate = useNavigate()

  const getPosts = async () => {
    try {
      const response = await axios.get("https://vast-chamber-06347.herokuapp.com/api/posts")
      setPosts(response.data)
    } catch (error) {
      console.log(error?.response?.data)
    }
  }

  useEffect(() => {
    getPosts()
    if (localStorage.tokenPost) {
      getProfile()
    }
  }, [])

  const signup = async e => {
    e.preventDefault()
    try {
      const form = e.target
      const userBody = {
        firstName: form.elements.firstName.value,
        lastName: form.elements.lastName.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
        photo: form.elements.photo.value,
      }

      await axios.post("https://vast-chamber-06347.herokuapp.com/api/user", userBody)
      console.log("sign up success")
      navigate("/login")
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const login = async e => {
    e.preventDefault()
    try {
      const form = e.target

      const userBody = {
        email: form.elements.email.value,
        password: form.elements.password.value,
      }

      const response = await axios.post("https://vast-chamber-06347.herokuapp.com/api/user/auth", userBody)
      const tokenPost = response.data
      localStorage.tokenPost = tokenPost
      getProfile()
      navigate("/")
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const logout = () => {
    localStorage.removeItem("tokenPost")
    setProfile({})
  }

  const addPost = async e => {
    e.preventDefault()

    try {
      const form = e.target

      const postBody = {
        title: form.elements.title.value,
        body: form.elements.body.value,
        image: form.elements.image.value,
      }

      await axios.post("https://vast-chamber-06347.herokuapp.com/api/posts", postBody, {
        headers: {
          Authorization: localStorage.tokenPost,
        },
      })
      getPosts()
      navigate("/")
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const getProfile = async () => {
    try {
      const response = await axios.get("https://vast-chamber-06347.herokuapp.com/api/user/me", {
        headers: {
          Authorization: localStorage.tokenPost,
        },
      })
      setProfile(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const confirmPost = async (e, postId) => {
    e.preventDefault()

    try {
      const form = e.target

      const postBody = {
        title: form.elements.title.value,
        body: form.elements.body.value,
        image: form.elements.image.value,
      }

      await axios.put(`https://vast-chamber-06347.herokuapp.com/api/posts/${postId}`, postBody, {
        headers: {
          Authorization: localStorage.tokenPost,
        },
      })
      getPosts()
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const deletePost = async postId => {
    try {
      await axios.delete(`https://vast-chamber-06347.herokuapp.com/api/posts/${postId}`, {
        headers: {
          Authorization: localStorage.tokenPost,
        },
      })
      getPosts()
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const store = {
    posts: posts,
    profile: profile,
    signup: signup,
    login: login,
    logout: logout,
    addPost: addPost,
    confirmPost: confirmPost,
    deletePost: deletePost,
  }

  return (
    <PostsContext.Provider value={store}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/post/:postId" element={<OnePost />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </PostsContext.Provider>
  )
}

export default App
