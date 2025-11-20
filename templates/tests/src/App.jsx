import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Test from './components/Test';
import Profile from './components/Profile';
import AddTest from './components/AddTest';
import EditTest from './components/EditTest';
import GetTestByLevel from './components/GetTestByLevel';

// Import all lesson components
import EnglishLesson from './components/Lesson1';
import Lesson2 from './components/Lesson2';
import Lesson3 from './components/Lesson3';
import Lesson4 from './components/Lesson4';
import Lesson5 from './components/Lesson5';
import Lesson6 from './components/Lesson6';
import Lesson7 from './components/Lesson7';
import Lesson8 from './components/Lesson8';
import Lesson9 from './components/Lesson9';
import Lesson10 from './components/Lesson10';
import Lesson11 from './components/Lesson11';
import Lesson12 from './components/Lesson12';
import Lesson13 from './components/Lesson13';
import Lesson14 from './components/Lesson14';
import Lesson15 from './components/Lesson15';
import TotalTest from './components/TotalTest';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/test/:testId" element={<Test />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-test" element={<AddTest />} />
                <Route path="/edit_test" element={<EditTest />} />
                <Route path="/get_test" element={<GetTestByLevel />} />
               


                {/* Lesson Routes */}
                <Route path="/lesson/1" element={<EnglishLesson />} />
                <Route path="/lesson/2" element={<Lesson2 />} />
                <Route path="/lesson/3" element={<Lesson3 />} />
                <Route path="/lesson/4" element={<Lesson4 />} />
                <Route path="/lesson/5" element={<Lesson5 />} />
                <Route path="/lesson/6" element={<Lesson6 />} />
                <Route path="/lesson/7" element={<Lesson7 />} />
                <Route path="/lesson/8" element={<Lesson8 />} />
                <Route path="/lesson/9" element={<Lesson9 />} />
                <Route path="/lesson/10" element={<Lesson10 />} />
                <Route path="/lesson/11" element={<Lesson11 />} />
                <Route path="/lesson/12" element={<Lesson12 />} />
                <Route path="/lesson/13" element={<Lesson13 />} />
                <Route path="/lesson/14" element={<Lesson14 />} />
                <Route path="/lesson/15" element={<Lesson15 />} />
                <Route path="/totaltest" element={<TotalTest/>} />

                {/* Test Routes for Each Lesson
                <Route path="/test/1" element={<Test testId="1" />} />
                <Route path="/test/2" element={<Test testId="2" />} />
                <Route path="/test/3" element={<Test testId="3" />} />
                <Route path="/test/4" element={<Test testId="4" />} />
                <Route path="/test/5" element={<Test testId="5" />} />
                <Route path="/test/6" element={<Test testId="6" />} />
                <Route path="/test/7" element={<Test testId="7" />} />
                <Route path="/test/8" element={<Test testId="8" />} />
                <Route path="/test/9" element={<Test testId="9" />} />
                <Route path="/test/10" element={<Test testId="10" />} />
                <Route path="/test/11" element={<Test testId="11" />} />
                <Route path="/test/12" element={<Test testId="12" />} />
                <Route path="/test/13" element={<Test testId="13" />} />
                <Route path="/test/14" element={<Test testId="14" />} />
                <Route path="/test/15" element={<Test testId="15" />} /> */}
            </Routes>
        </Router>
    );
}

export default App;