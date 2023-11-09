import { useRoutes } from 'react-router-dom';

// project import
import { useAuth, useProfileState } from 'store/module';
import routes from './routes';
import { useEffect } from 'react';
import { useLocation, useNavigate } from '../../node_modules/react-router-dom/dist/index';
import { jwtDecode } from '../../node_modules/jwt-decode/build/cjs/index';
import axios from '../../node_modules/axios/index';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { setProfile } = useProfileState();
  let location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    //로그인을 했는데 새로고침한경우
    if (localStorage.getItem('token') != null) {
      //token 값을 decode해주는 코드
      const token = jwtDecode(localStorage.getItem('token').slice(7));
      setIsLoggedIn(true);
      axios.get(`/user-information?user_no=${token.user_no}`).then((res) => {
        setProfile(res.data[0]);
      });
      navigate(location.pathname);
    }
  }, [localStorage.getItem('token')]);
  return useRoutes(routes(isLoggedIn));
}
