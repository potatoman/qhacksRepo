import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';

import Home from './pages/Home.js';
import Output from './pages/Output.js';

function App() {
  return (
    <div className="App">


      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/output" element={<Output />} />
          {/* <Route path="*" element={<Error404 />} /> */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;