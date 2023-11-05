import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    fetch(`/blogs?page=${page}&per_page=${perPage}`)
      .then((response) => response.json())
      .then((data) => setBlogPosts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [page, perPage]);

  useEffect(() => {
    fetch(`/total_posts`)
      .then((response) => response.json())
      .then((data) => setTotalPosts(data.total))
      .catch((error) => console.error("Error fetching total posts:", error));
  }, []);

  function readMore(postId) {
    navigate(`/blogs/${postId}`);
  }

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  function handlePerPageChange(newPerPage) {
    setPerPage(newPerPage);
  }

  const totalPages = Math.ceil(totalPosts / perPage);

  return (
    <>
      <div>
        
        
      </div>
      <div className="blog-list">
        <h1>Blog Posts</h1>
        <div>
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-item">
              <h2 className="blog-title">{post.title}</h2>
              <h4>{post.category}</h4>
              <p className="blog-date">{post.created_at}</p>
              <p className="blog-content">{post.content}</p>
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
