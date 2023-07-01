import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const ApiKeyModal = ({ isOpen, onClose, onSubmit }) => {
  const [apiKey, setApiKey] = useState("");

  const handleChange = (event) => {
    console.log("API key progress: ", event.target.value);
    setApiKey(event.target.value);
  };

  const handleSubmit = (enteredApiKey) => {
    onSubmit(enteredApiKey);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Enter API Key</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To get this app to work organically, we will need an OpenAI API Key.
          If you don't have one, we have test conditions for the case of
          demonstrating this app's capabilities as well.
        </DialogContentText>
        <TextField
          autoFocus
          margin="normal"
          id="apiKey"
          label="API Key"
          fullWidth
          value={apiKey}
          onChange={handleChange}
          type="password"
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit(apiKey)}>Submit API Key</Button>
        <Button onClick={() => handleSubmit("")}>Proceed without one</Button>
      </DialogActions>
      {/* <form onSubmit={handleSubmit}>
        <input type="text" value={apiKey} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form> */}
    </Dialog>
  );
};

export default ApiKeyModal;
