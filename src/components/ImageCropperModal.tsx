'use client'

import { useCallback, useRef, useState } from 'react'
import ReactCrop, { Crop, PixelCrop, cropToImg } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageCropperModalProps {
  open: boolean
  onClose: () => void
  onExport?: (dataUrl: string, blob: Blob) => void
}

type Aspect = '1:1' | '4:3' | '16:9' | '3:4' | '9:16' | 'free'

const ASPECT_OPTIONS: Record<Aspect, { label: string; ratio: number | null }> = {
  '1:1': { label: '1:1 (Avatar)', ratio: 1 },
  '4:3': { label: '4:3', ratio: 4 / 3 },
  '16:9': { label: '16:9 (Banner)', ratio: 16 / 9 },
  '3:4': { label: '3:4 (Portrait)', ratio: 3 / 4 },
  '9:16': { label: '9:16 (Story)', ratio: 9 / 16 },
  free: { label: 'Freeform', ratio: null },
}

export default function ImageCropperModal({
  open,
  onClose,
  onExport,
}: ImageCropperModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop | undefined>(undefined)
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null)
  const [aspect, setAspect] = useState<Aspect>('1:1')
  const [exportZoom, setExportZoom] = useState(1)
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  const imageRef = useRef<HTMLImageElement | null>(null)

  const close = useCallback(() => {
    if (imageSrc) URL.revokeObjectURL(imageSrc)
    setFile(null)
    setImageSrc(null)
    setCrop(undefined)
    setImageSize(null)
    setAspect('1:1')
    setExportZoom(1)
    setCroppedImageUrl(null)
    onClose()
  }, [imageSrc, onClose])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected || !selected.type.startsWith('image/')) return
    setFile(selected)
    const url = URL.createObjectURL(selected)
    setImageSrc(url)
    setCrop(undefined)
    setImageSize(null)
    setCroppedImageUrl(null)
    setExportZoom(1)
  }, [])

  const initCropFromSize = useCallback(
    (displayWidth: number, displayHeight: number) => {
      const ratio = ASPECT_OPTIONS[aspect].ratio
      const maxW = displayWidth * 0.85
      const maxH = displayHeight * 0.85
      let initW = maxW
      let initH = ratio ? initW / ratio : displayHeight * 0.55
      if (initH > maxH) {
        initH = maxH
        initW = ratio ? initH * ratio : initW
      }
      const x = (displayWidth - initW) / 2
      const y = (displayHeight - initH) / 2
      setCrop({
        x,
        y,
        width: initW,
        height: initH,
        unit: 'px',
      })
    },
    [aspect]
  )

  const handleImageLoaded = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    imageRef.current = img
    const { width: displayWidth, height: displayHeight } = img.getBoundingClientRect()
    setImageSize({ width: displayWidth, height: displayHeight })
    initCropFromSize(displayWidth, displayHeight)
  }, [initCropFromSize])

  const handleChange = useCallback((nextCrop: Crop) => {
    setCrop(nextCrop)
  }, [])

  const handleComplete = useCallback((nextCrop: Crop) => {
    setCrop(nextCrop)
  }, [])

  const handleAspectChange = useCallback((next: Aspect) => {
    setAspect(next)
    setExportZoom(1)
    if (!imageSize) return
    initCropFromSize(imageSize.width, imageSize.height)
  }, [imageSize, initCropFromSize])

  const dataURLtoBlob = useCallback((dataUrl: string): Promise<Blob> => {
    return fetch(dataUrl).then((res) => {
      if (!res.ok) throw new Error('fetch failed')
      return res.blob()
    })
  }, [])

  const handleExport = useCallback(async () => {
    if (!crop || !imageRef.current) return
    setIsExporting(true)
    try {
      const dataUrl = await cropToImg(imageRef.current, crop as PixelCrop, exportZoom)
      const blob = await dataURLtoBlob(dataUrl)
      setCroppedImageUrl(dataUrl)
      onExport?.(dataUrl, blob)
    } catch (err) {
      console.error('Crop export failed', err)
    } finally {
      setIsExporting(false)
    }
  }, [crop, exportZoom, imageRef.current, dataURLtoBlob, onExport])

  const handleDownload = useCallback(() => {
    if (!croppedImageUrl) return
    const a = document.createElement('a')
    a.href = croppedImageUrl
    a.download = 'poets4life-cropped-image.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(croppedImageUrl)
    setCroppedImageUrl(null)
  }, [croppedImageUrl])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image Cropper & Uploader"
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div className="bg-hdGray border border-gray-700 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-heading mb-1 text-white">
          🛠 Image Cropper & Uploader
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Upload an image, drag to pan the crop area, pick an aspect ratio and export zoom, then download.
        </p>

        {/* File upload */}
        <div className="mb-6">
          <input
            id="cropper-upload"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
          />
          <label
            htmlFor="cropper-upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-hdDark border border-gray-600 rounded-lg text-sm text-gray-300 hover:border-hdOrange hover:text-white cursor-pointer transition"
          >
            <i className="fa-solid fa-cloud-arrow-up text-hdOrange"></i> Choose Image
          </label>
          {file && (
            <p className="mt-2 text-xs text-gray-500">
              {file.name} &middot; {(file.size / 1024).toFixed(1)} KB
            </p>
          )}
        </div>

        {/* Crop canvas */}
        {imageSrc ? (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 relative bg-gray-900/50 rounded-xl border border-gray-700 flex items-center justify-center overflow-hidden min-h-[260px]">
              <ReactCrop
                aspect={ASPECT_OPTIONS[aspect].ratio ?? undefined}
                crop={crop}
                onChange={handleChange}
                onComplete={handleComplete}
                style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
              >
                <img
                  ref={imageRef}
                  onLoad={handleImageLoaded}
                  src={imageSrc}
                  alt=""
                  style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
                />
              </ReactCrop>
            </div>

            {/* Controls */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400">Aspect ratio</label>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {Object.entries(ASPECT_OPTIONS).map(([key, opt]) => (
                    <button
                      key={key}
                      onClick={() => handleAspectChange(key as Aspect)}
                      className={`px-2.5 py-1.5 rounded text-xs border transition ${
                        aspect === key
                          ? 'bg-hdOrange text-white border-hdOrange'
                          : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-hdOrange'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-400">
                  Export zoom {Math.round(exportZoom * 100)}%
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExportZoom((z) => Math.max(1, z - 0.25))}
                    className="px-2 py-1 rounded bg-gray-900 border border-gray-700 text-xs text-white"
                  >
                    &minus;
                  </button>
                  <button
                    onClick={() => setExportZoom((z) => Math.min(3, z + 0.25))}
                    className="px-2 py-1 rounded bg-gray-900 border border-gray-700 text-xs text-white"
                  >
                    &plus;
                  </button>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.25"
                    value={exportZoom}
                    onChange={(e) => setExportZoom(parseFloat(e.target.value))}
                    className="flex-1 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => handleAspectChange(aspect)}
                className="flex-1 py-2 rounded bg-gray-900 border border-gray-700 text-sm text-gray-300 hover:border-hdOrange transition"
              >
                Reset crop
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex-1 py-2 rounded bg-hdOrange text-white text-sm font-semibold hover:bg-orange-600 disabled:opacity-50 transition"
              >
                {isExporting ? 'Processing…' : 'Crop & export'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-gray-500 text-sm">No image loaded yet.</p>
          </div>
        )}

        {/* Exported result */}
        {croppedImageUrl ? (
          <div className="mt-6 border-t border-gray-700 pt-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Exported result</span>
              <span className="text-xs text-green-400">Ready to download</span>
            </div>
            <img
              src={croppedImageUrl}
              alt="Cropped preview"
              className="w-32 h-32 object-cover rounded-lg border border-gray-600 bg-gray-900"
            />
            <button
              onClick={handleDownload}
              className="w-full py-2 rounded bg-gray-800 border border-gray-600 text-sm text-white hover:bg-gray-700 transition"
            >
              <i className="fa-solid fa-download mr-2"></i> Download cropped image
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}