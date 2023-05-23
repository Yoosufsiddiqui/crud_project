/* eslint-disable react/prop-types */
import axios from "axios";

const DeletePost = ({ id }) => {
  const url = `http://localhost:3001/v1/api/posts/${id}`;

  const deletePost = async () => {
    axios.delete(url).then(function (response) {
      console.log(response);
    });
  };
  return (
    <>
      <button
        className="rounded bg-red-300 px-2 ms-2 mt-1"
        onClick={deletePost}
      >
        DELETE POST
      </button>
    </>
  );
};

export default DeletePost;
