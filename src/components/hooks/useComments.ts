import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import API from '../../lib/API';
import { setCommentsAction } from '../../redux/actions';
import { Comment } from '../../redux/interfaces';

export function useComments() {
  const dispatch = useDispatch();
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      const { data } = await API.get(`/comments`);
      if (data) {
        dispatch(setCommentsAction(data.comments));
        setComments(data.comments);
        return data.comments;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return { comments, setComments, fetchComments } as const;
}
