import {useState, useEffect} from 'react';
import { useLocation } from "react-router";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./homepage.css";
import axios from 'axios';

export default function Homepage() {
  const [posts,setPosts] = useState([]);
  const {search} = useLocation();
  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get("https://backendmyblogapp.herokuapp.com/posts/"+search);
      setPosts(res.data);
    }
    fetchPosts();
  },[search])

  
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts = {posts} />
        <Sidebar />
      </div>
    </>
  );
}