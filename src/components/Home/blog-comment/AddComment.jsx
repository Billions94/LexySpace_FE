import React, { useEffect, useState } from "react";
import API from "../../../login&register/Api.js";
import { useSelector, useDispatch } from "react-redux"
import { getUsersAction } from "../../../redux/actions/index.js";


const AddComment = ({fetchComments, id}) => {

  const { users } =  useSelector(state => state.data)

  const userId = users?._id
  
  const dispatch = useDispatch()
   
  const [comments, setComments] = useState({
    text: "",
    user: userId
  });

  console.log(comments)
  console.log('user', userId)

  const apiUrl = process.env.REACT_APP_GET_URL 

  const postComment = async () => {
    
    try {
      const response = await fetch(`${apiUrl}/comments/${id}`, {
        method: "POST",
        body: JSON.stringify(comments),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        fetchComments()
        setComments({
            text: "",
            user: userId
        })
        
      }
    } catch (error) {
      console.error("oops with encountered an error ", error);
    }
  };

  useEffect(()=> {
    dispatch(getUsersAction())
  },[])

  return (
    <div className="panel mt-3 col-6">
      <div className="panel-body">
        <textarea
          className="form-control shareComment"
          type="textarea"
          rows={2}
          placeholder="start typing to share your thoughts...."
          value={comments.text}
          onChange={(e) => setComments({ ...comments, text: e.target.value })}
        />
        <div className="mar-top clearfix mt-2">
          { !comments.text ?  
             null: 
          <button className="btn btn-sm btn-dark pull-right subtim-btn shareComment"
            onClick={(e) => postComment(e)}>
            <i className="fa fa-pencil fa-fw" /> Share
          </button>
          }
        </div>
      </div>
    </div>
  );
};

export default AddComment;
