import { useState } from "react";

function ResumePage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF resume.");
      return;
    }

    setSelectedFile(file);
  };

  return (
    <div className="resume-page">
      <div className="resume-container">
        <h2>Resume</h2>

        <p className="resume-description">
          Upload your resume to use it with VK's AI Assistant.
        </p>

        <label className="resume-upload-box">
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            hidden
          />

          <div className="resume-upload-icon">
            📄
          </div>

          <div className="resume-upload-title">
            Upload Resume
          </div>

          <div className="resume-upload-subtitle">
            PDF files only
          </div>
        </label>

        {selectedFile && (
          <div className="selected-resume">
            <span>✅</span>

            <div>
              <strong>{selectedFile.name}</strong>
              <p>
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumePage;