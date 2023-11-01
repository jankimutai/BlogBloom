import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Home(){
    const navigate = useNavigate();
    const [blogPosts, setBlogPosts] = useState([]);
      
    useEffect(() => {
        fetch('/blogs')
        .then((response) => response.json())
        .then((data) => setBlogPosts(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
    function readMore(postId){
        navigate(`/blogs/${postId}`)
    }
  
    return (
        <div className="blog-list"> 
        <h1>Blog Posts</h1>
        <div>
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-item">
              <h2 className="blog-title">{post.title}</h2>
              <p className="blog-date">{post.created_at}</p>
              <p className="blog-content">{post.content}</p>
              <button onClick={()=> readMore(post.id)}>Read More</button>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default Home;