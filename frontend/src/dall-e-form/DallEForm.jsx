import React, { useState } from "react";

const DallEForm = () => {
  const [promptText, setPromptText] = useState("");

  const handleInputChange = (event) => {
    setPromptText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};

export default DallEForm;
