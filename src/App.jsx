
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import Attendance from "./components/Attendance";
import {BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";


const App = () => {
    return (
        <>

        <Router>
        <header><MyNavbar/></header>
            <Routes>
                <Route path="/" element={<Attendance />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </Router>


        </>        
    );
};

export default App;
