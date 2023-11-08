import { useRoutes } from 'react-router-dom';

// project import
import { useAuth } from 'store/module';
import routes from './routes'

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const {isLoggedIn} = useAuth();
  return useRoutes(routes(isLoggedIn));
}
