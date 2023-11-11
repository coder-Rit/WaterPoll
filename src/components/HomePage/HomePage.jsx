import React, { useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AppBar_simple from "../AppBar/AppBar_simple";
import AddForm from "../forms/AddForm";
import { useSelector } from "react-redux";

const HomePage = () => {

  const {entries,isEntrieSubmited}= useSelector(state=>state.entries)
  const handleNotification = () => {
    if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Hello, this is a browser notification!');
        }
      });
    }
  };
  useEffect(() => {
    console.log(entries);
  }, [entries])

  
  return (
    <div>
      <div className="parent">
        <AppBar_simple></AppBar_simple>

        <div>{
        isEntrieSubmited?
        entries.map(data=>{
          return(
            <div>
                <span>Name : {data.Name}</span>
                <span>Group Count : {data.GroupCount}</span>
                <span>Hours : {data.Hours}</span>
            </div>
          )
        }):null
        }</div>

      
        <AddForm></AddForm>
      </div>
    </div>
  );
};

export default HomePage;
