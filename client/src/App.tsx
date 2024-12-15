import './App.css';
import {MainRouter} from './routes/MainRouter.tsx';
import {Navigation} from "./components/Layout/Navigation.tsx";
import {Footer} from "./components/Layout/Footer.tsx";
import {useLocation} from "react-router";

function App() {
  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/reset') {
    return <MainRouter/>
  } else {

  }
  return (<div className="flex flex-col min-h-screen">
    <div className="flex flex-col md:flex-row nav_height">
      <Navigation/>
      <div className="flex-grow">
        <MainRouter/>
      </div>
    </div>
    <Footer/>
  </div>);
}

export default App
