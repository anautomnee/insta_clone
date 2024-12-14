import './App.css';
import {MainRouter} from './routes/MainRouter.tsx';
import {Navigation} from "./components/Navigation/Navigation.tsx";
import {Footer} from "./components/Footer/Footer.tsx";
import {useLocation} from "react-router";

function App() {
  const location = useLocation();
  return (<>
    {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/reset' && <Navigation/>}
    <MainRouter/>
    {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/reset' && <Footer/>}
  </>);
}

export default App
