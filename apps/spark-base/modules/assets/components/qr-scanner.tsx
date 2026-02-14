'use client'

import { useState, useRef, useEffect } from 'react'
import { Camera, X, Flashlight, FlashlightOff } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'

interface QRScannerProps {
  onScan: (code: string) => void
  onClose: () => void
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isFlashOn, setIsFlashOn] = useState(false)
  const [error, setError] = useState<string>('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setHasPermission(true)
    } catch (err) {
      console.error('Camera error:', err)
      setHasPermission(false)
      setError('Unable to access camera. Please check permissions.')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  const toggleFlash = async () => {
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0]
      const capabilities = track.getCapabilities() as any
      
      if (capabilities.torch) {
        try {
          await track.applyConstraints({
            advanced: [{ torch: !isFlashOn } as any]
          })
          setIsFlashOn(!isFlashOn)
        } catch (err) {
          console.error('Flash error:', err)
        }
      }
    }
  }

  const handleManualInput = () => {
    const code = prompt('Enter asset code manually:')
    if (code) {
      onScan(code.trim())
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-lg font-semibold">Scan QR Code</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Camera View */}
      <div className="relative w-full h-full flex items-center justify-center">
        {hasPermission === null && (
          <div className="text-white text-center">
            <Camera className="h-12 w-12 mx-auto mb-4 animate-pulse" />
            <p>Requesting camera access...</p>
          </div>
        )}

        {hasPermission === false && (
          <Card className="m-4 p-6 text-center">
            <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={handleManualInput}>Enter Code Manually</Button>
          </Card>
        )}

        {hasPermission && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            
            {/* Scan Frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 border-2 border-white rounded-2xl shadow-2xl">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl" />
                </div>
                <div className="absolute -bottom-12 left-0 right-0 text-center">
                  <p className="text-white text-sm drop-shadow-lg">
                    Position QR code within frame
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Controls */}
      {hasPermission && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={toggleFlash}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {isFlashOn ? (
                <FlashlightOff className="h-5 w-5 mr-2" />
              ) : (
                <Flashlight className="h-5 w-5 mr-2" />
              )}
              Flash
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleManualInput}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Enter Manually
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
