import React, { FC, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { DragEvent } from 'react'
import { resizeImage } from './image-processor'

interface DragAndDropUploaderProps {
  onUpload: (file: File) => void
}

export const DragAndDropUploader: FC<DragAndDropUploaderProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      try {
        const resizedFile = await resizeImage(file, 200, 200)
        onUpload(resizedFile)
      } catch (error) {
        console.error('Error processing image:', error)
      }
      e.dataTransfer.clearData()
    }
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      try {
        const resizedFile = await resizeImage(file, 200, 200)
        onUpload(resizedFile)
      } catch (error) {
        console.error('Error processing image:', error)
      }
    }
  }

  return (
    <Box
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      sx={{
        border: '2px dashed #ccc',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <Typography variant="body1" color="textSecondary">
        Drag and drop an image here, or click to upload
      </Typography>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Box>
  )
}
