import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
          navigate("/blogs")
        }})
  }
  return (
    <div className="blog-details-container">
        <div key={selectedBlog.id} className="blog-details" >
        <h2 className="blog-details-title">{selectedBlog.title}</h2>
        <div className="blog-details-item">
        {selectedBlog.image_url ? (<img className="blog_image1" src={selectedBlog.image_url} alt={selectedBlog.id} />) : null}
            <div className="blog-details-text">
              <p className="blog-date">{selectedBlog.created_at}</p>
              <p className="blog-content">{selectedBlog.content}</p>
            </div>
        </div>
        <div>
          <button className="edit-button"onClick={() => navigate(`/blogs/${id}/edit`)}>Edit</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
        
      </div>

    </div>
  );
}

export default BlogDetails;