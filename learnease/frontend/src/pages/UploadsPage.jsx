import UploadComponent from "../components/Uploads";
const UploadPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-10 mt-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Uploads</h1>
      <UploadComponent apiBase="https://learneasebackend-79bj.onrender.com/uploads" />
    </div>
  );
};
export default UploadPage;