import uploadSingle from "../middlewere/uploads.js";
import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.post("/upload-single", uploadSingle, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

  res.status(200).json({
    message: "File uploaded successfully",
    fileUrl,
  });
});

router.delete("/delete-single/:imageName", (req, res) => {
  const { imageName } = req.params;
  const filePath = path.join("uploads", imageName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return res.status(200).json({ message: "File deleted successfully" });
  }

  res.status(404).json({ message: "File not found" });
});

export default router;
