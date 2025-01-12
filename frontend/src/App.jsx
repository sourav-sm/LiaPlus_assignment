// import './App.css';
// import Home from './pages/Home';
// import Admin from './pages/Admin';
// import Blogpost from './pages/Blogpost'
// import { Route, Router, Routes } from 'react-router-dom';


// const  App=()=> {
//     <Router>
//       <Routes>
//         <Route path='/' element={<Home/>} />
//         <Route path='/blog/:id' element={<Blogpost/>} />
//         <Route path='/admin' element={<Admin/>} />
//       </Routes>
//     </Router>
 
// }

// export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogPosts from './pages/Blogpost';
import AdminDashboard from './pages/AdminDasboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Unauthorized from './pages/Unauthorized';
import Navbar from './components/Navbar';



function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<BlogPosts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/unauthorized" element={<Unauthorized/>} />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

