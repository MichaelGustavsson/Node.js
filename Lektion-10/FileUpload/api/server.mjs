import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();

// Konfigurera eller sätta upp Multer...
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors());

// file=no-car.png
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: 'No file to upload' });
  }

  res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    filename: req.file.filename,
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server kör på port ${PORT}`));
