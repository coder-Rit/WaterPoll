import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";


import "./ProctedRoute.css";
import { clearAlert } from "../../actions/alertAction";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = (props) => {
  // let navigate = useNavigate();
  const dispatch = useDispatch();
  const { Comp, styles, main } = props;
  const { status, msg } = useSelector((state) => state.alert);


  const notify_success = (msg) => toast.success(`  ${msg} 👍 `, props.alert);
  const notify_error = (msg) => toast.error(` ${msg}`, props.alert);

  
  
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
    <Fragment>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <>
      <div className="floadingOBJ1  border_radius50 "></div>
      <div className="floadingOBJ2  border_radius50 "></div>
      <div className="floadingOBJ3   border_radius50 "></div>
      <div className="floadingOBJ4   border_radius50 "></div>
      </>
     

       { Comp}
      

      
    </Fragment>
  );
};

export default ProtectedRoute;
