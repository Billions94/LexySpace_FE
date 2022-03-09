import { useEffect } from "react"
import Loader from "../loader/Loader"
import { Posts, Comments, User } from "../../../redux/interfaces"
import { useDispatch } from "react-redux"
import { getUsersAction } from "../../../redux/actions"
import SingleComment from "./SingleComment"
import "./styles.scss"


interface CommentsProps {
  author: User | null
  blog: Posts | null
  id: string | undefined
  comments: Comments[]
  fetchComments: () => Promise<void>
}

const Comment = ({ blog, id, comments, fetchComments }: CommentsProps) => {

  const dispatch = useDispatch()

  useEffect(() => {
    fetchComments()
    dispatch(getUsersAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return comments ? (
    <>
      <div>
        {
          comments.map((c) => (
            c.postId !== blog?._id ? null :
              <SingleComment
                id={id}
                blog={blog}
                comment={c}
                comments={comments}
                fetchComments={fetchComments} />
          ))}
      </div>
    </>
  ) : (<Loader />)
}


export default Comment
