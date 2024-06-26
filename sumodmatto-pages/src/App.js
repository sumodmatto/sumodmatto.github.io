import React from "react";
import "./App.css";

const posts = [
  {
    title: "First Blog Post",
    date: "2024-06-25",
    content: "This is the content of the first blog post.",
  },
  {
    title: "Second Blog Post",
    date: "2024-06-26",
    content: "This is the content of the second blog post.",
  },
  // Add more posts as needed
];

function App() {
  return (
    <div className="container">
      <h1>My Simple Blog</h1>
      {posts.map((post, index) => (
        <div key={index} className="post">
          <h2>{post.title}</h2>
          <p>
            <small>{post.date}</small>
          </p>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
