import './index.css';
import HomePage from '../pages/HomePage';
import CourseListPage from '../pages/CourseListPage';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/courselistpage" Component={CourseListPage} />
    </Routes>
    </BrowserRouter>
  )
}

export default App

// https://lms-gs.vercel.app/