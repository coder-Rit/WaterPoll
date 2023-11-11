import './App.css';
import NetworkPolt from './components/Networks/NetworkPolt';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearAlert } from './actions/alertAction';





function App() {
  const dispatch = useDispatch()

  const { status, msg } = useSelector((state) => state.alert);


  const alertLogic ={
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  
const notify_success = (msg) => toast.success(`  ${msg} 👍 `, alertLogic);
const notify_error = (msg) => toast.error(` ${msg}`, alertLogic);

useEffect(() => {
  if (status === 1) {
    notify_success(msg);
  }
  if (status === 0) {
    notify_error(msg);
  }
  dispatch(clearAlert());
}, [status]);



  return (
    <div className="App">
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <NetworkPolt></NetworkPolt>
    </div>
  );
}

export default App;
