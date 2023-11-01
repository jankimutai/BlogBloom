import React, { useState } from 'react';
function NewPost(){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function newPostSubmit(){

    }

    return(
        <div className="blog-creation-container">
        <form onSubmit={newPostSubmit}>
          <h2 className="blog-creation-title">Create a New Blog</h2>
          <div>
            <label className="blog-creation-label">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="blog-creation-input"
            />
          </div>
          <div>
            <label className="blog-creation-label">Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="blog-creation-textarea"
            />
          </div>
          <button type="submit" className="blog-creation-button">
            Create Blog
          </button>
        </form>
      </div>
    )
}
export default NewPost;