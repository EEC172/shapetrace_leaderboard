import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/home';
import Circle from './components/circle';
import Square from './components/square';
import Triangle from './components/triangle';
import House from './components/house';
import Header from './components/header';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/square' element={<Square/>}/>
          <Route path='/triangle' element={<Triangle/>}/>
          <Route path='/circle' element={<Circle/>}/>
          <Route path='/house' element={<House/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
