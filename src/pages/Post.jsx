/* eslint-disable react/prop-types */

import axios from "axios";
import Container from "../components/Container";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import UpdatePost from "../components/UpdatePost";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import DeletePost from "../components/DeletePost";

const Post = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    setLoading(true);
    setPostData(null);

    axios
      .get(`http://localhost:3001/v1/api/posts/${id}`)
      .then(({ data }) => {
        setPostData(data);
      })
      .catch((error) => {
        //setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/posts", { replace: true });
  };

  return (
    <Container>
      {!!loading && <p>Loading Post Data</p>}
      {!loading && !!postData && (
        <div>
          <button
            onClick={clickHandler}
            className="mb-3 p-2 rounded bg-orange-300"
          >
            Back to Posts{" "}
          </button>
          <hr />
          <p>Title: {postData.title}</p>
          <p>Content: {postData.content}</p>

          <p>
            Last Updated:{" "}
            {format(new Date(postData.last_updated), "MM/dd/yyyy").slice(0, 10)}{" "}
            {postData.last_updated.slice(11, 19)}
          </p>
          <p>
            Publish Date:{" "}
            {format(
              new Date(postData.originally_published.slice(0, 10)),
              "MM/dd/yyyy"
            )}{" "}
            {postData.originally_published.slice(11, 19)}
          </p>
          <div className="flex">
            <div className="flex-initial w-10/12">
              <Popup
                trigger={
                  <button className="rounded bg-green-600 p-1 mt-2">
                    Edit Post
                  </button>
                }
                position={"right center"}
              >
                <UpdatePost
                  id={postData.id}
                  title={postData.title}
                  content={postData.content}
                />
              </Popup>
            </div>

            <DeletePost id={postData.id} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Post;
