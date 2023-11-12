import React, { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AppBar_simple from "../AppBar/AppBar_simple";
import AddForm from "../forms/AddForm";
import { useDispatch, useSelector } from "react-redux";
import { getEntries } from "../../actions/entrieActions";
import { CircularProgress, Typography, Box } from '@mui/material';


const HomePage = () => {
  const dispatch = useDispatch();

  const { entries, isEntrieSubmited } = useSelector((state) => state.entries);
  const [udpatedEntries, setudpatedEntries] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [progress, setProgress] = useState(40);




  const getTimeValue =(exitAt,enterdAt)=>{
    const entry = new Date(enterdAt);
    const current = new Date().getTime();
    const exit = new Date(exitAt);
    const timeDifference = Math.abs(exit - current);
    const constantTimeDiff = Math.abs(exit - entry);
    // Convert milliseconds difference to hours, minutes, seconds, etc.
    const t = Math.round((timeDifference/constantTimeDiff)*100)
    console.log(t);
    return t
  }
//        enterd    <   current     <     exit    

  const getTimeSting =(exitAt)=>{
    const time1 = new Date(exitAt);
    const time2 = new Date().getTime();
     const timeDifference = Math.abs(time2 - time1);
     // Convert milliseconds difference to hours, minutes, seconds, etc.

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const sec = Math.floor((timeDifference % (1000 * 60)) / 1000);

     return (hours + ":" + minutes + ":" + sec)
  }
  

  useEffect(() => {
    dispatch(getEntries());
  }, []);



  useEffect(() => {
    if (isEntrieSubmited) {
      console.log(entries);
      let a = [];
      entries.map((elm) => {
        const time1 = new Date(elm.exitAt);
        const time2 = new Date().getTime();
        const timeDifference = Math.abs(time2 - time1);

        // Convert milliseconds difference to hours, minutes, seconds, etc.
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        console.log(hours + ":" + minutes + ":" + seconds);
      });
    }
  }, [entries]);



  useEffect(() => {
    const interval = setInterval(() => {

      setCurrentTime((prevTime) => {
        const newTime = new Date(prevTime);
        newTime.setHours(newTime.getHours() - 1);
        return newTime;
      });

    }, 1000); // runs every second

    return () => clearInterval(interval);
  }, []);



  return (
    <div>
      <div className="parent">
        <AppBar_simple></AppBar_simple>

        <div className="getterBottom allTickets">
          {isEntrieSubmited
            ? entries.map((data) => {
              let a = getTimeValue(data.exitAt,data.entrieAt)

                return (
                  <div className="TicketDiv">
                    <div>
                      <img
                        className="Fprofile"
                        src={`https://api.multiavatar.com/${data.Name}.svg`}
                        alt=""
                      />
                    </div>
                    <div className="detailsDIv">
                      <span style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                        {data.Name}
                      </span>
                      <div>Group Count : {data.GroupCount}</div>
                      <div>Time : {data.Hours}h</div>
                    </div>{" "}
                    <div>
                      <Box position="relative" display="inline-flex">
                        {

                          <CircularProgress
                          variant="determinate"
                          value={a}
                          size={70}
                          style={{color:a<25?"red":a<=75&&a>=25?"rgb(178, 178, 0)":"green"}}
                          thickness={6}
                          />
                        }
                        <Box
                          top={0}
                          left={0}
                          bottom={0}
                          right={0}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          position="absolute"
                        >
                          <Typography
                            variant="h7"
                            style={{}}
                            fontWeight="bolder"
                            component="div"
                            color="textSecondary"
                          >
                            {getTimeSting(data.exitAt)}
                          </Typography>
                        </Box>
                      </Box>
                    </div>
                  </div>
                );
              })
            : null}
        </div>

        <AddForm></AddForm>
      </div>
    </div>
  );
};

export default HomePage;
