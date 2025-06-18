import './App.css';
import Home from './pages/Home.jsx';
import Header from './components/Header/Header.jsx';
import { Outlet } from 'react-router-dom';
import logoImage from "./assets/recipeLogo.png";



function App() {

  return (
    <>
      <Header objectLogo={{logoFile: logoImage}}/>
      <Outlet/>
    </>
  )
}

export default App
