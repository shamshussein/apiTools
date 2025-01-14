import axios from "axios";

export const downloadVideo = async (videoUrl) => {
  const response = await axios.get("http://localhost:5000/youtube/download", {
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

  export const generatePassword = async () => {
    const response = await axios.get("http://localhost:5000/password/generate");
    return response.data.password;
  };
  
  export const mergePdfs = async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("pdfs", file));
  
    const response = await axios.post("http://localhost:5000/pdf/merge", formData, {
      responseType: "blob",
    });
  
    return response.data;
  };

export const shortenUrl = async (originalUrl) => {
    const response = await axios.post("http://localhost:5000/url/shorten", { originalUrl });
    return response.data;
};
