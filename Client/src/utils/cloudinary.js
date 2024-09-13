import axios from "axios";

// Uploading file to Cloudinary
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Airosphere"); // Replace with your Cloudinary upload preset
  formData.append("cloud_name", "dnhfijs1f"); // Replace with your Cloudinary cloud name

  try {
    const response = await axios.post(
      "https:/cloudinary://123585783455933:V4Nqx7LZ98R6-r8QY7IMwL3TXl4@dnhfijs1f",
      formData
    );
    return response.data.secure_url; // Cloudinary returns the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Cloudinary upload failed");
  }
};
