import Header from './components/Header';
import VerticalNav from "./components/VerticalNav";
import { Outlet } from 'react-router-dom';
import './style/index.css'

export default function Root ()  {
  return (
    <>
      <Header />
      <VerticalNav />
      <Outlet />
    </>
  );
};
