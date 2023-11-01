import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function BlogDetails() {
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

  return (
    <div>
        <Link to="/" className="back-link"> Back to All Blogs</Link>
        <h1>Blog Posts</h1>
        <div key={selectedBlog.id}>
            <img className="blog_image" src={selectedBlog.image_url} />
            <h2>{selectedBlog.title}</h2>
            <p>{selectedBlog.created_at}</p>
            <p>{selectedBlog.content}</p>
        </div>
    </div>
  );
}

export default BlogDetails;