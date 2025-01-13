import axios from "axios";

export const downloadVideo = async (videoUrl) => {
  const response = await axios.get("http://localhost:5000/download", {
    params: { videoUrl },
    responseType: "blob",
  });
  return response.data;
};

export const convertToAudio = async (file) => {
  const formData = new FormData();
  formData.append("video", file);

  const response = await axios.post("http://localhost:5000/convert", formData, {
    responseType: "blob",
  });
  return response.data;
};

export const uploadWithRateLimit = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post("http://localhost:5000/upload", formData);
  return response.data;
};
export const mergePdfs = async (file) => {
    const formData = new FormData();
    formData.append("pdfs", file);
  
    const response = await axios.post("http://localhost:5000/merge", formData, {
        responseType: "blob",
    });
    return response.data;
  };
  