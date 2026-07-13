export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  if (imagePath.startsWith("http")) {
    return imagePath.replace("http://localhost:5000", API_URL);
  }
  const separator = imagePath.startsWith("/") ? "" : "/";
  return `${API_URL}${separator}${imagePath}`;
};
