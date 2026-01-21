'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function SafeImage({ 
  src, 
  alt, 
  fill = false, 
  width, 
  height, 
  className = '', 
  fallbackSrc = null,
  ...props 
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (fallbackSrc && !hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    } else {
      setHasError(true);
    }
  };

  // If there's an error and no fallback, show placeholder
  if (hasError && !fallbackSrc) {
    return (
      <div className={`flex items-center justify-center bg-gray-800 ${className}`}>
        <svg
          className="w-16 h-16 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  // Validate URL before rendering
  if (!imgSrc || typeof imgSrc !== 'string') {
    return (
      <div className={`flex items-center justify-center bg-gray-800 ${className}`}>
        <svg
          className="w-16 h-16 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  const imageProps = {
    src: imgSrc,
    alt: alt || 'Image',
    className,
    onError: handleError,
    ...props
  };

  if (fill) {
    imageProps.fill = true;
  } else if (width && height) {
    imageProps.width = width;
    imageProps.height = height;
  }

  return <Image {...imageProps} />;
}