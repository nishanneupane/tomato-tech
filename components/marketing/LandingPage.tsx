"use client"

import React, { useState, useRef, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'
import { Header } from './Header'
import { HeroSection } from './HeroSection'
import { CameraModal } from '../modals/CameraModal'
import { FeaturesSection } from './FeatureSection'
import { HowItWorksSection } from './HowItWorks'
import { CallToActionSection } from './CallToAction'
import { Footer } from './Footer'

const LandingPage = () => {
  const [showCamera, setShowCamera] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [tomatoBounce, setTomatoBounce] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [imageSource, setImageSource] = useState<'camera' | 'upload' | null>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')

  const webcamRef = useRef<Webcam>(null) 
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const interval = setInterval(() => setTomatoBounce(prev => !prev), 2000)
    return () => clearInterval(interval)
  }, [])

  const toggleCamera = () => {
    setShowCamera(!showCamera)
    setCapturedImage(null)
    setAnalysisResult(null)
    setCameraError(null)
    setImageSource(null)
  }

  const switchCamera = () => {
    setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user')
  }

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setCapturedImage(imageSrc)
      setCameraError(null)
      setImageSource('camera')
    } else {
      setCameraError("Failed to capture image. Please ensure your camera is working and try again.")
    }
  }, [webcamRef])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string)
        setCameraError(null)
        setImageSource('upload')
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    if (capturedImage) {
      setIsAnalyzing(true)
      try {
        const response = await fetch('/api/analyze-tomato', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ file: capturedImage }),
        });

        if (!response.ok) {
          throw new Error('Failed to analyze image');
        }

        const result = await response.json();
        setAnalysisResult(`Disease: ${result.disease}\n\nDescription: ${result.description}\n\nTreatment Recommendations:\n${result.treatmentRecommendations.join('\n')}`);
      } catch (error) {
        console.error('Error analyzing image:', error);
        setAnalysisResult('An error occurred while analyzing the image. Please try again.');
      } finally {
        setIsAnalyzing(false);
      }
    }
  }

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <HeroSection toggleCamera={toggleCamera} tomatoBounce={tomatoBounce} />
        <CameraModal
          showCamera={showCamera}
          toggleCamera={toggleCamera}
          capturedImage={capturedImage}
          setCapturedImage={setCapturedImage}
          analysisResult={analysisResult}
          isAnalyzing={isAnalyzing}
          webcamRef={webcamRef}
          cameraError={cameraError}
          captureImage={captureImage}
          analyzeImage={analyzeImage}
          setCameraError={setCameraError}
          handleFileUpload={handleFileUpload}
          fileInputRef={fileInputRef}
          imageSource={imageSource}
          setImageSource={setImageSource}
          facingMode={facingMode}
          switchCamera={switchCamera}
        />
        <FeaturesSection />
        <HowItWorksSection activeSection={activeSection} toggleSection={toggleSection} />
        <CallToActionSection toggleCamera={toggleCamera} />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage