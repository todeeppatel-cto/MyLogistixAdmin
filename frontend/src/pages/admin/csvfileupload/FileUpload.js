import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../constants/apiBaseUrl";

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File uploaded successfully!");
      if (onUploadSuccess) onUploadSuccess(res.data);
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
