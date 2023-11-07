// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import axios from '../node_modules/axios/index';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  //이후 axios 부터 token 값을 헤더로 전달하게 해주는 코드
  axios.interceptors.request.use(function (config) {
    config.baseURL = '/api';
    config.headers.Authorization = localStorage.getItem('token');
    return config;
  });
  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
