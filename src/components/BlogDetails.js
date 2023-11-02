import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function BlogDetails() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetch(`/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => setSelectedBlog(data));
    }, [id]);

  if (!selectedBlog) {
    return null;
  }
  const handleDelete = () => {
    fetch(`/blogs/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          alert(`${selectedBlog.title} deleted`)
          navigate("/")
        }})
  }
  return (
    <div>
<<<<<<< HEAD
        
        <div key={selectedBlog.id} className="blog-item">
        <h2 className="blog-title">{selectedBlog.title}</h2>
        <div>
          
          <button className="edit-button">Edit</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
        <div className="blog_content1">
        {selectedBlog.image_url ? (<img className="blog_image" src={selectedBlog.image_url} alt="Blog Image" />) : null}
            <div className="blog_text1">
              <p className="blog-date">{selectedBlog.created_at}</p>
              <p className="blog-content">{selectedBlog.content}</p>
            </div>
            
        </div>
        
      </div>
=======
        <Link to="/" className="back-link"> Back to All Blogs</Link>
        <div key={selectedBlog.id} className="blog_data1">
          <h2 style={{ color: 'white', fontSize: '20pt' }}>{selectedBlog.title}</h2>
          <div className="blog_content1">
            <img className="blog_image" src={selectedBlog.image_url} />
            <div className="blog_text1">
              <p>{selectedBlog.created_at}</p>
              <p>{selectedBlog.content}</p>
            </div>
         </div>
</div>
>>>>>>> Development

    </div>
  );
}

export default BlogDetails;