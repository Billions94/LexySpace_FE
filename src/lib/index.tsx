import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTokenAction } from '../redux/actions';

export default function useAuthGuard() {
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken =
      params.get('accessToken') ?? localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken') ?? '';

    if (!accessToken) {
      navigate('/login');
    } else if (params.get('accessToken')) {
      if (typeof accessToken === 'string')
        dispatch(
          setTokenAction({
            accessToken,
            refreshToken,
          })
        );
      else dispatch(setTokenAction(accessToken));
      navigate('/home');
    }
  }, []);
}

export const dateFormatter = (value: string | number | Date) => {
  const postedDate = new Date(value).getTime();
  const dateToday = new Date().getTime();
  const milliseconds = Math.abs(dateToday - postedDate).toString();

  const mins = parseInt(milliseconds);
  const minutes = Math.floor(mins / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  let date;

  if (weeks >= 1) {
    date = `${weeks}w`;
  } else if (days > 0) {
    date = `${days}d`;
  } else if (days > 1) {
    date = `${days}ds`;
  } else if (days === 0 && hours >= 1) {
    date = `${hours}hr`;
  } else if (hours > 2) {
    date = `${hours}hrs`;
  } else if (hours < 1) {
    date = `${minutes}min`;
  }
  return date;
};
