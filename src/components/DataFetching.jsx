import React, { useState, useEffect } from "react";
import axios from "axios";
// import ExpandButton from "./ExpandButton";
import Modal from "./Modal";

function DataFetching(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://safe-cliffs-03637.herokuapp.com/articles")
      .then((res) => {
        // console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  // console.log("searching...  " + props.search);
  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(props.search);
  });

  // console.log(filteredPosts);

  return (
    <div>
      <ul>
        {filteredPosts.map((post) => (
          <li className="posts" key={post._id}>
            <img
              src={`https://safe-cliffs-03637.herokuapp.com/${post.image}`}
              alt="postImage"
            ></img>
            <p style={{ fontWeight: 800, color: "#347B98" }}>{post.title} </p>
            <br /> <hr></hr>
            <p>{post.content.substring(0, 99) + "..."}</p>
            {post.content.length > 100 ? (
              <Modal postID={post._id} postContent={post.content} />
            ) : null}
          </li>
        ))}

        {/* <button>here</button> */}
      </ul>
    </div>
  );
}

export default DataFetching;
