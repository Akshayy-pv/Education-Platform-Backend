import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'advisors',  // Use a specific folder for advisor images
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

export const upload = multer({ storage });
