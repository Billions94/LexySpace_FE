import { useEffect, useState } from "react"
import { Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux"
import { getUsersAction } from "../../../redux/actions/"
import { ReduxState } from "../../../redux/interfaces/"

interface AddCommentProps {
  id: string | undefined
  fetchComments: () => Promise<void>
}

const AddComment = ({ fetchComments, id }: AddCommentProps) => {

  const { user } =  useSelector((state: ReduxState) => state.data)

  const userId = user?._id
  
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
    <div className="panel mt-4">
      <div className="panel-body d-flex">
        <div>
          <Image roundedCircle src={user.image} alt='' 
            width={47} height={47}/>
        </div>
        <div className="w-100">
        <textarea
          className="form-control textarea ml-3"
          rows={2}
          placeholder="start typing to share your thoughts...."
          value={comments.text}
          onChange={(e) => setComments({ ...comments, text: e.target.value })}
        />

        <div className="d-flex mt-2">
          { !comments.text ?  
             null: 
          <button className="btn btn-sm modal-btn ml-auto"
            onClick={() => postComment()}>
            <i className="fa fa-pencil fa-fw" /> Post
          </button>
          }
        </div>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
