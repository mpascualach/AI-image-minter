import React, { useState } from "react";

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

  return (
    <form onSubmit={handleSubmit}>
      {loading ? (
        <div>Loading...</div>
      ) : imageUrls.length ? (
        <img src={imageUrls[0]} alt="Image 1" />
        <img src={imageUrls[1]} alt="Image 2" />
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
  );
};

export default DallEForm;
