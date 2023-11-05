import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home({blogPosts,handlePageChange,page,totalPages}) {
  const navigate = useNavigate();
  function readMore(postId) {
    navigate(`/blogs/${postId}`);
  }
  return (
    <>
      <div className="blog-list">
        <div className="blogs-flex">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-item">
              {post.image_url ? (<img className="blog_image" src={post.image_url} alt={post.id} />) : null}
              <h2 className="blog-title">{post.title}</h2>
              <h4>{post.category}</h4>
              <p className="blog-date">{post.created_at}</p>
              <button onClick={() => readMore(post.id)}>Read More</button>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
    
  );
}

export default Home;
