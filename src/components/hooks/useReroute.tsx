import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reRouteAction } from '../../redux/actions';

export function useReroute() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function route() {
    dispatch(reRouteAction(false));
    navigate('/home');
  }

  return { route } as const;
}
