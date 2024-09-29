import Image from "next/image";
import Webcam from "react-webcam";
import { X } from "lucide-react";

interface CameraModalProps {
    showCamera: boolean;
    toggleCamera: () => void;
    capturedImage: string | null;
    setCapturedImage: React.Dispatch<React.SetStateAction<string | null>>;
    analysisResult: string | null;
    isAnalyzing: boolean;
    webcamRef: React.RefObject<Webcam>;
    cameraError: string | null;
    captureImage: () => void;
    analyzeImage: () => void;
    setCameraError: React.Dispatch<React.SetStateAction<string | null>>;
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    imageSource: 'camera' | 'upload' | null;
    setImageSource: React.Dispatch<React.SetStateAction<'camera' | 'upload' | null>>;
  }
  
  export const CameraModal: React.FC<CameraModalProps> = ({ showCamera, toggleCamera, capturedImage, setCapturedImage, analysisResult, isAnalyzing, webcamRef, cameraError, captureImage, analyzeImage, setCameraError, handleFileUpload, fileInputRef, imageSource, setImageSource }) => (
    showCamera && (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out">
        <div className="bg-white p-6 rounded-xl w-full max-w-xl shadow-2xl max-h-[90vh] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-red-800">Scan Your Tomato</h3>
            <button onClick={toggleCamera} className="text-gray-500 hover:text-red-600 transition-colors duration-300">
              <X size={28} />
            </button>
          </div>
          <div className="bg-gray-100 h-80 sm:h-96 flex items-center justify-center mb-6 rounded-lg overflow-hidden">
            {capturedImage ? (
              <div className="relative w-full h-full">
                <Image src={capturedImage} alt="Captured tomato" layout="fill" objectFit="contain" />
                {analysisResult && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 overflow-y-auto max-h-1/2">
                    <h4 className="font-semibold mb-2">Analysis Result:</h4>
                    <p className="text-sm">{analysisResult}</p>
                  </div>
                )}
              </div>
            ) : imageSource === 'camera' ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ 
                  facingMode: "user",
                  width: { ideal: 1920 },
                  height: { ideal: 1080 }
                }}
                className="w-full h-full object-cover"
                onUserMediaError={() => setCameraError("Failed to access camera. Please check your camera permissions and ensure no other application is using the camera.")}
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg text-gray-600 mb-4">Choose an option to scan your tomato:</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setImageSource('camera')}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Use Camera
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Upload Image
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            )}
          </div>
          <div className="overflow-y-auto flex-grow">
            {cameraError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {cameraError}
              </div>
            )}
            {imageSource === 'camera' && !capturedImage && (
              <button 
                onClick={captureImage}
                className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 transition duration-300 text-lg font-semibold hover:scale-102 active:scale-98 shadow-md"
              >
                Capture Tomato
              </button>
            )}
            {capturedImage && (
              <>
                <button 
                  onClick={() => {
                    setImageSource(null);
                    setCapturedImage(null);
                  }}
                  className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 transition duration-300 text-lg font-semibold hover:scale-102 active:scale-98 shadow-md mb-3"
                >
                  Retake Image
                </button>
                <button 
                  onClick={analyzeImage}
                  className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition duration-300 text-lg font-semibold hover:scale-102 active:scale-98 shadow-md"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Tomato'}
                </button>
              </>
            )}
            {isAnalyzing && (
              <div className="mt-6 p-5 bg-blue-50 rounded-lg transition-all duration-300 ease-in-out transform translate-y-0 opacity-100 border border-blue-200">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                  <p className="ml-3 text-blue-600 text-lg">Scanning your tomato...</p>
                </div>
              </div>
            )}
            {analysisResult && !isAnalyzing && (
              <div className="mt-6 p-5 bg-red-50 rounded-lg transition-all duration-300 ease-in-out transform translate-y-0 opacity-100 border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3 text-lg">Tomato Analysis:</h4>
                <p className="text-red-700 text-lg whitespace-pre-line">{analysisResult}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  )