// This is a loading component that can be used to indicate to the user that something is happening in the background.
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center space-y-2 p-4">
        <div className="w-10 h-10 border-2 border-white border-dashed rounded-full animate-spin"></div>
        <p className="text-sm font-mono text-white animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
