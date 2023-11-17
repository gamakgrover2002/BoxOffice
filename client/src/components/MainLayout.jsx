import { Outlet } from 'react-router-dom';
import AppTitle from './AppTitle';
import Navs from './Navs';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div>
      <AppTitle />
      <Navs />

      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
