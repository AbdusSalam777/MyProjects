import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import HomePage from './pages/HomePage';
import TimeTablePage from './pages/TimeTablePage';
import UploadPage from './pages/UploadsPage';
import SignInPage from './pages/SigninPage';
import RecommendationsPage  from './pages/RecommendationsPage';
import AboutPage from './pages/AboutPage';
import AssignmentsPage from './pages/AssignmentsPage';
import QuizzesPage from './pages/QuizzesPage';
import Attendance from './pages/AttendancePage';
import SignUpPage from './pages/SignUpPage';

// Components
import Navbar from './components/navbar';
import ProtectedRoute from './components/ProtectedRouteComp';
import Footer from './components/footer';
import Courselist from './components/courselist';
import CoursePage from './pages/CoursePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
   
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/timetable" element={<TimeTablePage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/courselist" element={<Courselist />} />
        <Route path="/course-page/:id" element={<CoursePage />} />

        {/* Protected route */}
        <Route
          path="/uploads"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

         <Footer/>

      {/* ToastContainer */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        toastStyle={{ marginTop: '65px' }}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </BrowserRouter>
  );
}

export default App;