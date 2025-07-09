export default function ProgressBar({ progress }) {
  return (
    <div className="w-full h-4 bg-gray-600 rounded-md mt-1">
      <div
        className="h-4 bg-green-500 rounded-md"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
