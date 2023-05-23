import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import DeletePost from "../components/DeletePost";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getData = async () => {
    setLoading(true);
    setError(false);
    const request = await axios.get("http://localhost:3001/v1/api/posts");
    setLoading(false);
    setPosts(request.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {!error && loading && <div className="max-w-[230px]"></div>}
      {!error && !loading && (
        <>
          Posts:
          <br />
          {posts.map(({ id, title }) => {
            return (
              <div key={id}>
                <Link
                  className="hover:underline hover:to-blue-400"
                  to={`/posts/${id}`}
                >
                  {id} - {title}
                </Link>
                <div>
                  <DeletePost id={id} />
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Posts;
