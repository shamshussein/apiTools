const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = 'C:/Users/DELL/Downloads/ffmpeg-2025-01-08-git-251de1791e-essentials_build/bin/ffmpeg.exe'; 
ffmpeg.setFfmpegPath(ffmpegPath);

function convertVideoToAudio(videoPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .toFormat("mp3")
      .save(outputPath)
      .on("end", () => {
        console.log(`Audio file created at: ${outputPath}`);
        resolve(outputPath);
      })
      .on("error", (err) => {
        console.error("FFmpeg error:", err);
        reject(err);
      });
  });
};

module.exports = convertVideoToAudio;
