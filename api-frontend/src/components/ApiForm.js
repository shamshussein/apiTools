import React, { useState } from "react";
import { handleDownload, handleConvert, handleUpload, handleGeneratePassword, handleMergePdfs, handleShortenUrl } from "../api/response";

const ApiForm = () => {
const [videoUrl, setVideoUrl] = useState("");
const [convertFile, setConvertFile] = useState(null); 
const [uploadFile, setUploadFile] = useState(null);

const [generateLoading, setGenerateLoading] = useState(false);
const [mergeloading, setMergeLoading] = useState(false);
const [downloadLoading, setDownloadLoading] = useState(false);
const [convertLoading, setConvertLoading] = useState(false);
const [uploadLoading, setUploadLoading] = useState(false);

const [mergeResponse, setMergeResponse] = useState("");
const [generatedResponse, setGenerateResponse] = useState("");
const [downloadResponse, setDownloadResponse] = useState("");
const [convertResponse, setConvertResponse] = useState("");
const [uploadResponse, setUploadResponse] = useState("");

const [pdfFiles, setPdfFiles] = useState([]);
const [password, setPassword] = useState("");

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState("");

  const handlePdfFileChange = (e) => {
    setPdfFiles([...e.target.files]);
  };
  
  return (
    <div className="container mt-5">
      <h2 className="mb-4">API Interaction Form</h2>

      <div className="mb-3">
        <label className="form-label">YouTube Video URL</label>
        <input
          type="url"
          className="form-control"
          placeholder="Enter video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          disabled={downloadLoading}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={() => handleDownload(videoUrl, setDownloadResponse, setDownloadLoading)}
          disabled={downloadLoading || !videoUrl}
        >
          {downloadLoading ? "Downloading..." : "Download Video"}
        </button>
        {downloadResponse && <div className="alert alert-info mt-2">{downloadResponse}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Upload Video File</label>
        <input
          type="file"
          className="form-control"
          accept="video/*"
          onChange={(e) => setConvertFile(e.target.files[0])}
          disabled={convertLoading }
        />
        <button
          className="btn btn-success mt-2"
          onClick={() => handleConvert(convertFile, setConvertResponse, setConvertLoading)}
          disabled={convertLoading  || !convertFile}
        >
          {convertLoading  ? "Converting..." : "Convert to Audio"}
        </button>
        {convertResponse && <div className="alert alert-info mt-2">{convertResponse}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Rate Limited File Upload</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setUploadFile(e.target.files[0])}
          disabled={uploadLoading}
        />
        <button
          className="btn btn-warning mt-2"
          onClick={() => handleUpload(uploadFile, setUploadResponse, setUploadLoading)}
          disabled={uploadLoading || !uploadFile}
        >
          {uploadLoading ? "Uploading..." : "Upload File"}
        </button>
        {uploadResponse && <div className="alert alert-info mt-2">{uploadResponse}</div>}
      </div>

      <div className="mb-3">
        {/* <label className="form-label">Generate Password</label> */}
        <button
          className="btn btn-success mt-2"
          onClick={() => handleGeneratePassword(setPassword, setGenerateResponse, setGenerateLoading)}
          disabled={generateLoading}
        >
          {generateLoading ? "Generating..." : "Generate Password"}
        </button>
        {password && (
          <input
            type="text"
            className="form-control mt-2"
            value={password}
            readOnly
          />
        )}
      {generatedResponse && <div className="alert alert-info mt-4">{generatedResponse}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Select PDFs to Merge (Max 2)</label>
        <input
          type="file"
          className="form-control"
          accept=".pdf"
          multiple
          onChange={handlePdfFileChange}
          disabled={mergeloading}
        />
        <button
          className="btn btn-success mt-2"
          onClick={() => handleMergePdfs(pdfFiles, setMergeResponse, setMergeLoading)}
          disabled={mergeloading || pdfFiles.length !== 2}
        >
          {mergeloading ? "Merging..." : "Merge PDFs"}
        </button>
        {mergeResponse && <div className="alert alert-info mt-4">{mergeResponse}</div>}

      </div>
            <div className="mb-3">
        <label className="form-label">URL Shortener</label>
        <input
          type="url"
          className="form-control"
          placeholder="Enter URL to shorten"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          disabled={urlLoading}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={() => handleShortenUrl(originalUrl, setShortUrl, setUrlError, setUrlLoading)}
          disabled={urlLoading || !originalUrl}
        >
          {urlLoading ? "Shortening..." : "Shorten URL"}
        </button>
        {shortUrl && (
          <div className="alert alert-info mt-2">
            Shortened URL:{" "}
            <a href={originalUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
        {urlError && <div className="alert alert-danger mt-2">{urlError}</div>}
      </div>
    </div>
  );
};

export default ApiForm;
