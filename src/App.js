import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearAlert } from "./actions/alertAction";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
 
  
 

  return (
    <div>
      
      <ProtectedRoute Comp={ <HomePage ></HomePage>}></ProtectedRoute>
     
    </div>
  );
}

export default App;
