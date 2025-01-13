import React, { useState } from "react";
import { downloadVideo, convertToAudio, uploadWithRateLimit, mergePdfs } from "../api/apiRequests";

const ApiForm = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    setResponse("");
    try {
      const data = await downloadVideo(videoUrl);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "video.mp4");
      document.body.appendChild(link);
      link.click();
      setResponse("Video downloaded successfully.");
    } catch (err) {
      setResponse(err.response?.data?.error || "Error downloading video.");
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = async () => {
    setLoading(true);
    setResponse("");
    try {
      if (!file) throw new Error("Please upload a video file.");
      const data = await convertToAudio(file);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "audio.mp3");
      document.body.appendChild(link);
      link.click();
      setResponse("Audio conversion successful.");
    } catch (err) {
      setResponse(err.response?.data?.error || "Error converting video to audio.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    setResponse("");
    try {
      if (!file) throw new Error("Please upload a file.");
      const data = await uploadWithRateLimit(file);
      setResponse(`File uploaded successfully. Server response: ${JSON.stringify(data)}`);
    } catch (err) {
      if (err.response?.status === 429) {
        setResponse("Rate limit exceeded. Please try again later.");
      } else {
        setResponse(err.response?.data?.error || "Error uploading file.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">API Interaction Form</h2>

      {/* Video Download */}
      <div className="mb-3">
        <label className="form-label">YouTube Video URL</label>
        <input
          type="url"
          className="form-control"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          disabled={loading}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={handleDownload}
          disabled={loading || !videoUrl}
        >
          {loading ? "Downloading..." : "Download Video"}
        </button>
      </div>

      {/* Video to Audio Conversion */}
      <div className="mb-3">
        <label className="form-label">Upload Video File</label>
        <input
          type="file"
          className="form-control"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={loading}
        />
        <button
          className="btn btn-success mt-2"
          onClick={handleConvert}
          disabled={loading || !file}
        >
          {loading ? "Converting..." : "Convert to Audio"}
        </button>
      </div>

      {/* Rate Limited Upload */}
      <div className="mb-3">
        <label className="form-label">Rate Limited File Upload</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={loading}
        />
        <button
          className="btn btn-warning mt-2"
          onClick={handleUpload}
          disabled={loading || !file}
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </div>
      
      {/* Password Generator */}
      <div className="mb-3">
        <label className="form-label">Generate Password</label>
        <input
          type="password"
          className="form-control"
        //   onChange={(e) => setFile(e.target.files[0])}
          disabled={loading}
        />
        <button
          className="btn btn-success mt-2"
        //   onClick={handleConvert}
          disabled={loading || !file}
        >
          {loading ? "Generating..." : "Generate Password"}
        </button>
      </div>

        {/* PDF Merger */}
        <div className="mb-3">
        <label className="form-label">Select PDFs to Merge (Max 2)</label>
        <input
            type="file" multiple
            className="form-control"
            accept=".pdf"
            // onChange={handleFileChange}
            disabled={loading}
        />
        <button
            className="btn btn-success mt-2"
            // onClick={handleMerge}
            disabled={loading || !file}
        >
            {loading ? "Merging..." : "Merge PDFs"}
        </button>
    </div>

      {/* Response Section */}
      {response && <div className="alert alert-info mt-4">{response}</div>}
    </div>
  );
};

export default ApiForm;
