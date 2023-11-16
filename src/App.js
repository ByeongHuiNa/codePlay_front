// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import axios from '../node_modules/axios/index';
import CalendarDrawer from 'components/project/CalendarDrawer';
import CalendarClickDrawer from 'components/project/CalendarClickDrawer';
import CalendarClickDrawerPublic from 'components/project/CalendarClickDrawerPublic';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  //이후 axios 부터 token 값을 헤더로 전달하게 해주는 코드
  axios.interceptors.request.use(function (config) {
    config.baseURL = '/api';
    config.headers.Authorization = localStorage.getItem('token');
    return config;
  });
  axios.interceptors.response.use(
    function (response) {
      try {
        // Do something with response data
        return response;
      } catch (err) {
        console.error('[_axios.interceptors.response] response : ' + err.message);
      }
    },
    function (error) {
      try {
        console.log(error);
        var errorStatus = error.response.status;

        if (errorStatus == '400') console.log(error.response.data);
        if (errorStatus == '401') console.log('인증에 실패했습니다.');
        if (errorStatus == '403') {
          alert('권한이 없습니다.');
          window.location.href = '/main';
        }
        if (errorStatus == '500') console.log('서버에서 오류가 발생하였습니다.');

        // var errorStatus = error.response.status;
        // if(errorStatus == '401')
        return error.response;
      } catch (err) {
        console.error('[_axios.interceptors.response] error : ' + err.message);
      }
    }
  );
  return (
    <>
      <CalendarDrawer />
      <CalendarClickDrawer />
      <CalendarClickDrawerPublic />
      <ThemeCustomization>
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </ThemeCustomization>
    </>
  );
};

export default App;
