import React, { useState, useEffect } from "react";
import ApiKeyModal from "../apikey-modal/ApiKeyModal.jsx";
import Spinner from "../spinner/Spinner.jsx";
import { Button, TextField, Card, CardMedia, FormControl } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import "./App.css";
import testImage from "./assets/test-image.png";

const App = () => {
  const [promptText, setPromptText] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const [apiKey, setApiKey] = useState("");
  const [modalOpen, setModalOpen] = useState(true);

  const handleInputChange = (event) => {
    console.log("API key currently: ", apiKey);
    setPromptText(event.target.value);
  };

  useEffect(() => {
    setApiKey(import.meta.env.VITE_REACT_APP_DALLE_API_KEY);
    // setLoading(true);
  }, []);

  const handleSubmit = () => {
    // event.preventDefault();
    setLoading(true);
    const apiUrl = `https://api.openai.com/v1/images/generations`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ prompt: promptText }),
    };

    console.log("API key was: ", apiKey);

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        data.data[0].promptText = promptText;
        console.log("API data loaded: ", JSON.stringify(data));
        setLoading(false);
        setImageUrls(data.data.map((item) => item.url));
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const handleModalSubmit = (key) => {
    setApiKey(key);
    setModalOpen(false);
  };

  // Sample API response
  const sampleResponse = {
    created: 1688203383,
    data: [
      {
        url: testImage,
      },
    ],
  };

  const simulateApiResponse = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setImageUrls(sampleResponse.data.map((item) => item.url));
    }, 2000);
  };

  const handleTestApi = () => {
    simulateApiResponse();
  };

  // useEffect(() => {
  //   simulateApiResponse();
  // }, []);

  const restartForm = () => {
    setImageUrls([]);
  };

  return (
    <>
      {/* <ApiKeyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      /> */}
      <div>
        <div className="testRunContainer">
          <Button className="testRunButton" onClick={handleTestApi}>
            Test run
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          {loading ? (
            <Spinner />
          ) : imageUrls.length ? (
            <>
              <Card variant="outlined" sx={{ height: 600, width: 600 }}>
                <CardMedia
                  image={imageUrls[0]}
                  sx={{ height: 600, width: 600 }}
                  style={{ position: "relative" }}
                >
                  <Button
                    className="refreshButton"
                    onClick={() => restartForm()}
                  >
                    <RefreshIcon></RefreshIcon>
                  </Button>

                  <Button
                    className="signButton"
                    color="success"
                    variant="contained"
                  >
                    Sign as NFT
                  </Button>
                </CardMedia>
              </Card>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                autoFocus
                margin="normal"
                id="prompt"
                label="Prompt"
                fullWidth
                value={promptText}
                onChange={handleInputChange}
              />
              <Button
                color="success"
                variant="contained"
                onClick={() => handleSubmit(promptText)}
              >
                Enter prompt
              </Button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default App;
