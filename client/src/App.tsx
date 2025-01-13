import './App.css';
import {MainRouter} from './routes/MainRouter.tsx';
import {Navigation} from "./components/Layout/Navigation.tsx";
import {Footer} from "./components/Layout/Footer.tsx";
import {useLocation} from "react-router";
import {useScreenWidth} from "./uitls/customHooks.ts";

function App() {
  const location = useLocation();
  const width = useScreenWidth();
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/reset') {
    return <MainRouter/>
  } else {
    if (width > 768) {
      return (<div className="flex flex-col min-h-screen">
        <div className="flex flex-col md:flex-row">
          <Navigation/>
          <div className="w-full min-h-[calc(100vh-176px)]">
            <MainRouter/>
          </div>
        </div>
        <Footer/>
      </div>);
    } else {
      return (<div className="flex flex-col min-h-screen">
            <div className="flex flex-col md:flex-row overflow-y-scroll h-[calc(100vh-81px)]">
              <MainRouter/>
            </div>
          <Navigation/>
        </div>
        );
    }
  }
}

export default App
