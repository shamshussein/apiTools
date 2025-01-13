import { downloadVideo, convertToAudio, uploadWithRateLimit, generatePassword, mergePdfs } from "../api/apiRequests";

export const handleDownload = async (videoUrl, setDownloadResponse, setDownloadLoading) => {
    setDownloadLoading(true);
    setDownloadResponse("");
    try {
      const blob = await downloadVideo(videoUrl);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "video.mp4");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadResponse("Video downloaded successfully.");
    } catch (err) {
      console.error("Error downloading video:", err.message);
      setDownloadResponse(err.response?.data?.error || "Error downloading video.");
    } finally {
        setDownloadLoading(false);
    }
  };
  

export const handleConvert = async (file, setConvertResponse, setConvertLoading) => {
    setConvertLoading(true);
    setConvertResponse("");
  try {
    if (!file) throw new Error("Please upload a video file.");
    const data = await convertToAudio(file);
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "audio.mp3");
    document.body.appendChild(link);
    link.click();
    setConvertResponse("Audio conversion successful.");
  } catch (err) {
    setConvertResponse(err.response?.data?.error || "Error converting video to audio.");
  } finally {
    setConvertLoading(false);
  }
};

export const handleUpload = async (file, setUploadResponse, setUploadLoading) => {
    setUploadLoading(true);
    setUploadResponse("");
  try {
    if (!file) throw new Error("Please upload a file.");
    const data = await uploadWithRateLimit(file);
    setUploadResponse(`File uploaded successfully. Server response: ${JSON.stringify(data)}`);
  } catch (err) {
    if (err.response?.status === 429) {
        setUploadResponse("Rate limit exceeded. Please try again later.");
    } else {
        setUploadResponse(err.response?.data?.error || "Error uploading file.");
    }
  } finally {
    setUploadLoading(false);
  }
};

export const handleGeneratePassword = async (setPassword, setGenerateResponse, setGenerateLoading) => {
  setGenerateLoading(true);
  setGenerateResponse("");
  try {
    const generatedPassword = await generatePassword();
    setPassword(generatedPassword);
    setGenerateResponse("Password generated successfully.");
  } catch (err) {
    setGenerateResponse("Error generating password.");
  } finally {
    setGenerateLoading(false);
  }
};

export const handleMergePdfs = async (pdfFiles, setMergeResponse, setMergeLoading) => {
  setMergeLoading(true);
  setMergeResponse("");
  try {
    if (pdfFiles.length !== 2) throw new Error("Please upload exactly 2 PDF files.");
    const data = await mergePdfs(pdfFiles);
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "merged.pdf");
    document.body.appendChild(link);
    link.click();
    setMergeResponse("PDFs merged successfully.");
  } catch (err) {
    setMergeResponse(err.response?.data?.error || "Error merging PDFs.");
  } finally {
    setMergeResponse(false);
  }
};
