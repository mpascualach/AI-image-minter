import React, { useState } from "react";

const DallEForm = () => {
  const [promptText, setPromptText] = useState("");

  const handleInputChange = (event) => {
    setPromptText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make the API request using the promptText value
    // Replace 'YOUR_API_KEY' with your actual Dall-E API key
    const apiKey = process.env.DALLE_API_KEY;
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
        // Handle the response data containing the generated images
        // You can update your component state or pass the data to another component
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the API request
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
