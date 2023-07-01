import React, { useState } from "react";
import testImage from "./assets/test-image.png";

const DallEForm = () => {
  const [promptText, setPromptText] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const handleInputChange = (event) => {
    setPromptText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const apiKey = import.meta.env.VITE_REACT_APP_DALLE_API_KEY;
    const apiUrl = `https://api.openai.com/v1/images/generations`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ prompt: promptText }),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("API data loaded: ", data);
        setLoading(false);
        setImageUrls(data.data.map((item) => item.url));
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
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

  return (
    <div>
      <button onClick={handleTestApi}></button>
      <form onSubmit={handleSubmit}>
        {loading ? (
          <div>Loading...</div>
        ) : imageUrls.length ? (
          <>
            <img src={imageUrls[0]} alt="Image 1" />
            {/* TODOS: */}
            {/* upon clicking on this image, let's sign it and upload it to the blockchain? */}
            {/* second button for regenerating this image with the same prompt */}
            {/* option to go back and prompt again */}
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="promptInput" style={{ marginBottom: "0.5rem" }}>
              Enter Prompt:
            </label>
            <input
              type="text"
              value={promptText}
              onChange={handleInputChange}
              style={{ marginBottom: "0.5rem" }}
            />
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DallEForm;
