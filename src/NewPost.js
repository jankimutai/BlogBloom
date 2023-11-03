import React, { useState } from 'react';
function NewPost(){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category,setCategory] = useState("")
    const [imageUrl,setImageUrl]= useState('')
    const [message, setMessage] = useState('');

    function newPostSubmit(e){
      e.preventDefault()
      fetch('http://127.0.0.1:5555/blogs',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({title,content,category,imageUrl})
    })
    .then((response) => {
      if (response.status === 201) {
        // Status 201 means "Created" in HTTP
        return response.json();
      } else {
        throw new Error('Failed to save the blog post');
      }
    })
    .then(() => {
      setMessage('Blog post saved successfully');
      setTitle('');
      setCategory('');
      setContent('');
      setImageUrl('');
    })
    .catch((error) => {
      setMessage('Error: ' + error.message);
    });
    };
    return(
        <div className="blog-creation-container">
        <form onSubmit={newPostSubmit}>
          <h2 className="blog-creation-title">Create a New Blog</h2>
          {message && <p className="message">{message}</p>}
          <div>
            <label className="blog-creation-label">Title:</label><br></br>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="blog-creation-input"
            />
          </div>
          <div>
            <label className="blog-creation-label">Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
          
          <div>
            <label className="blog-creation-label">Image URL:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="blog-creation-input"
              placeholder='optional'
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