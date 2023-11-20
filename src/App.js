import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Profile } from './pages/Profile';
import { Nav } from './components/Nav';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
