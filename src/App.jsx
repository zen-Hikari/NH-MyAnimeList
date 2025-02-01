import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home';
import Detail from './Pages/Detail';
import NotFound from './Pages/NotFound';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/anime/:id" element={<Detail />}/>
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </Router>
    );
}

export default App;
