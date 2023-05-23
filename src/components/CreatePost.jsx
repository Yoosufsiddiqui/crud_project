import axios from "axios";
import { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const publishPost = async () => {
    console.log(title);
    const url = "http://localhost:3001/v1/api/posts";
    axios
      .post(url, {
        title: title,
        content: content,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setContent("");
    setTitle("");
  };

  const submit = (e) => {
    e.preventDefault();
    if (content && title) {
      publishPost();
    }
  };

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value);

  let responseOutput = <></>;

  return (
    <form onSubmit={submit}>
      {responseOutput}
      <input
        className="border-2 border-red-200 ms-2"
        type="text"
        value={title}
        onChange={updateTitle}
      />
      <input
        className="mx-5 border-2 border-red-200"
        type="text"
        value={content}
        onChange={updateContent}
      />
      <input className=" bg-green-600 rounded px-2 py-1" type="submit" />
    </form>
  );
};

export default CreatePost;
