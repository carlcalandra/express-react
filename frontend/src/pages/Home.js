import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../slices/postsSlice';
const Home = () => {
    const dispatch = useDispatch();
    const {posts, loading:postsLoading, error:postError, message} = useSelector((state) => state.posts);
    console.log(posts, postsLoading, postError, message)
    useEffect(()=>{
        dispatch(fetchPosts())
    },[])
    
    return <div>Home</div>
}

export default Home
