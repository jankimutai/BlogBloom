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

    </div>
  );
}

export default BlogDetails;