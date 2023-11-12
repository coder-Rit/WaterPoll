import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { updateEntries } from "../../actions/entrieActions";
const AddForm = () => {
  const dispatch = useDispatch();

  const { entries } = useSelector((state) => state.entries);

  const [name, setName] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [GroupCount, setGroupCount] = useState(0);
  const [Hours, setHours] = useState(1);

  const increment = () => {
    setGroupCount(GroupCount + 1);
  };

  const decrement = () => {
    if (GroupCount > 0) {
      setGroupCount(GroupCount - 1);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    const currentTime = new Date(); // Get the current time

    const expireTime = new Date(
      currentTime.getTime() + (Hours*60 * 1000)
    ); // Add 1 hour (in milliseconds)

    const expireTimeString = expireTime.toISOString();

    dispatch(
      updateEntries({
        Name: name,
        Hours,
        GroupCount, 
        entrieAt: currentTime.toISOString(),
        exitAt:expireTimeString
      },entries)
    );
    handleFormClose(); // Close the form after submission
  };
  const handleButtonClick = (value) => {
    setHours(value);
  };

  return (
    <div>
      <div className="addBtn">
        <IconButton
          onClick={handleFormOpen}
          style={{
            borderRadius: "50%",
            backgroundColor: "#e91e63",
            padding: "10px",
          }}
        >
          <AddIcon style={{ color: "white" }} />
        </IconButton>
      </div>

      <Dialog open={formOpen} onClose={handleFormClose} maxWidth="xs" fullWidth>
        <DialogContent style={{ height: "50vh" }}>
          <IconButton
            style={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleFormClose}
          >
            <CloseIcon />
          </IconButton>
          <form onSubmit={handleSubmit} className="getterBottom">
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Name"
              fullWidth
              onChange={handleNameChange}
              InputProps={{ classes: { notchedOutline: "#f06292" } }}
              className="getterBottom"
            />
            <div className="getterBottom">
              <Typography variant="h7" mt={2} fontWeight="bold">
                Group Count
              </Typography>
              <div
                style={{ display: "flex", gap: "20px" }}
                className="getterBottom5"
              >
                <Button
                  variant="contained"
                  onClick={decrement}
                  style={{ background: "#f06292", margin: "5px" }}
                >
                  <RemoveIcon style={{ color: "white" }} />
                </Button>
                <Typography variant="h6" style={{ margin: "5px" }}>
                  {" "}
                  {GroupCount}
                </Typography>

                <Button
                  variant="contained"
                  onClick={increment}
                  style={{ background: "#f06292", margin: "5px" }}
                >
                  <AddIcon style={{ color: "white" }} />
                </Button>
              </div>
            </div>

            <div className="getterBottom">
              <Typography variant="h7" mt={2} fontWeight="bold">
                Hours
              </Typography>
              <div className="getterBottom5">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: Hours === 1 ? "#f06292" : "#fce4ec",
                    color: Hours === 1 ? "white" : "black",
                    margin: "5px",
                  }}
                  onClick={() => handleButtonClick(1)}
                >
                  1h
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: Hours === 2 ? "#f06292" : "#fce4ec",
                    color: Hours === 2 ? "white" : "black",
                    margin: "5px",
                  }}
                  onClick={() => handleButtonClick(2)}
                >
                  2h
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: Hours === 3 ? "#f06292" : "#fce4ec",
                    color: Hours === 3 ? "white" : "black",
                    margin: "5px",
                  }}
                  onClick={() => handleButtonClick(3)}
                >
                  3h
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: Hours === 6 ? "#f06292" : "#fce4ec",
                    color: Hours === 6 ? "white" : "black",
                    margin: "5px",
                  }}
                  onClick={() => handleButtonClick(6)}
                >
                  6h+
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: Hours === 12 ? "#f06292" : "#fce4ec",
                    color: Hours === 12 ? "white" : "black",
                    margin: "5px",
                  }}
                  onClick={() => handleButtonClick(12)}
                >
                  12h+
                </Button>
              </div>
            </div>

            <div className="getterBottom">
              <Button
                type="submit"
                variant="contained"
                style={{ background: "#e91e63", margin: "5px" }}
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddForm;
