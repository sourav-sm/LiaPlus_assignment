import { useEffect, useState } from 'react';
import axios from  'axios'; 

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      axios.get('http://localhost:4000/api/blogs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
        .then((res)=>setPosts(res.data));
    }else{
      console.log("unauthrozed");
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {posts.map((post) => (
        <div key={post.id} className="border p-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
