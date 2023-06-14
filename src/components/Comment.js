import React, { useState, useEffect } from "react";
import "../styles/comment.css";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editedText, setEditedText] = useState("");
  const [replyIndex, setReplyIndex] = useState(-1);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const addComment = () => {
    if (newComment.trim() !== "") {
      const comment = {
        text: newComment,
        replies: [],
      };

      setComments([...comments, comment]);
      setNewComment("");
    }
    else{
      alert('Add comment')
    }
  };

  const editComment = (index) => {
    setEditIndex(index);
    setEditedText(comments[index].text);
  };

  const saveEdit = () => {
    const updatedComments = [...comments];
    updatedComments[editIndex].text = editedText;

    setComments(updatedComments);
    setEditIndex(-1);
    setEditedText("");
  };

  const addReply = (index) => {
    if (replyText.trim() !== "") {
      const reply = {
        text: replyText,
      };

      const updatedComments = [...comments];
      updatedComments[index].replies.push(reply);

      setComments(updatedComments);
      setReplyIndex(-1);
      setReplyText("");
    }
    else{
      alert('Add comment to reply')
    }
  };

  return (
    <div className="container">
      <h1 className="title">Enter Your Comments</h1>
      <div>
        <input
          className="inputField"
          type="text"
          placeholder="Enter your comment here"
          value={newComment}
          onChange={handleInputChange}
        />
        &nbsp;
        <button className="buttonAdd" onClick={addComment}>
          Add Comment
        </button>
      </div>
      <div>
        {comments.map((comment, commentIndex) => (
          <div key={commentIndex}>
            {editIndex === commentIndex ? (
              <div>
                <input
                  className="inputField"
                  type="text"
                  value={editedText}
                  onChange={handleEditChange}
                />
                <button onClick={saveEdit} className="buttonSave">
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p>&#8658; {comment.text}</p>
                <button
                  onClick={() => editComment(commentIndex)}
                  className="buttonEdit"
                >
                  Edit
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={() => setReplyIndex(commentIndex)}
                  className="buttonReply"
                >
                  Reply
                </button>
              </div>
            )}

            {replyIndex === commentIndex && (
              
              <div style={{ marginLeft: "20px", borderLeft:'1px dotted #d3d6db'}}>
                <input
                  className="inputField"
                  type="text"
                  placeholder="Enter your reply here"
                  value={replyText}
                  onChange={handleReplyChange}
                />
                <button
                  className="buttonAdd"
                  onClick={() => addReply(commentIndex)}
                >
                  Add Reply
                </button>
              </div>
            )}

            {comment.replies.map((reply, replyIndex) => (
              <div key={replyIndex} style={{ marginLeft: "20px" }}>
                <p>&#8627; {reply.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
