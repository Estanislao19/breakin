import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CharacterCreated from './components/CharacterCreated';
import Detail from './components/Detail';
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route exact path='/' element={<LandingPage/>} />
      <Route exact path='/home' element={<Home/>} />
      <Route exact path='/character' element={<CharacterCreated/>} />
      <Route exact path='/home/:id' element={<Detail/>}/>
      </Routes> 
    </div>
    
    </Router>
  );
}

export default App;

