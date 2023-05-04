import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Create } from './screen/Create';
import { Home } from './screen/Home';
import { Header } from './components/Header';
function App() {  
  return (
    <div className={"App"}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
