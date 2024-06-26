import React from "react";

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
];

function Blog() {
  return (
    <div className="blog">
      {posts.map((post, index) => (
        <div key={index} className="post">
          <h3>{post.title}</h3>
          <p>
            <small>{post.date}</small>
          </p>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Blog;
