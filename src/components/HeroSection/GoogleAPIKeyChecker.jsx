import React, { useState } from "react";

const GoogleAPIKeyChecker = () => {
  const [apiKey, setApiKey] = useState("AIzaSyAX_CTd6Gmq9Xts0oWdjEQufrLCYe32nKo");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const checkAPIKey = async () => {
    if (!apiKey) {
      setError("API Key is required.");
      return;
    }

    try {
      setError(null); // Reset error
      const testURL = `https://maps.googleapis.com/maps/api/geocode/json?address=New+York&key=${"AIzaSyAX_CTd6Gmq9Xts0oWdjEQufrLCYe32nKo"}`;
      const res = await fetch(testURL);
      const data = await res.json();

      if (data.status === "OK") {
        setResponse("API Key is valid and working!");
      } else {
        setResponse(null);
        setError(`Error: ${data.error_message || "Invalid API Key or restrictions applied."}`);
      }
    } catch (err) {
      setResponse(null);
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Google API Key Checker</h1>
      <input
        type="text"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter your API key"
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={checkAPIKey}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Check API Key
      </button>
      {response && <p className="text-green-500 mt-4">{response}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default GoogleAPIKeyChecker;
