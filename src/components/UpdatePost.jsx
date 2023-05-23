/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";

const UpdatePost = ({ title, content, id }) => {
  const [currentTitle, setTitle] = useState(title);
  const [currentContent, setContent] = useState(content);

  const url = `http://localhost:3001/v1/api/posts/${id}`;

  const patchPost = async () => {
    console.log(currentTitle);
    console.log(currentContent);

    axios
      .patch(url, {
        title: currentTitle,
        content: currentContent,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setTitle("");
    setContent("");
  };

  const submit = (e) => {
    e.preventDefault();
    if (currentContent && currentTitle) {
      patchPost();
    }
  };

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value);

  let responseOutput = <></>;

  return (
    <form onSubmit={submit}>
      {responseOutput}
      <input type="text" value={currentTitle} onChange={updateTitle} />
      <input type="text" value={currentContent} onChange={updateContent} />
      <input className="rounded bg-green-600 p-1 mx-2" type="submit" />
    </form>
  );
};

export default UpdatePost;
