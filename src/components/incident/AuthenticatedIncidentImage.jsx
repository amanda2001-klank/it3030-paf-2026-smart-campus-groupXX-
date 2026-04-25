import React, { useState, useEffect } from 'react';
import { previewIncidentMedia } from '../../services/incidentService';

const AuthenticatedIncidentImage = ({ url, alt, className }) => {
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isActive = true;
    let objectUrl = '';

    const loadImage = async () => {
      if (!url) return;
      
      setLoading(true);
      setError(false);
      
      try {
        const response = await previewIncidentMedia(url);
        if (isActive) {
          objectUrl = URL.createObjectURL(response.data);
          setImgUrl(objectUrl);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load authenticated image:', err);
        if (isActive) {
          setError(true);
          setLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      isActive = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [url]);

  if (loading) {
    return (
      <div className={`${className} flex items-center justify-center bg-slate-100 animate-pulse`}>
        <div className="h-4 w-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-red-50 text-red-500 text-[10px] font-bold p-2 text-center`}>
        Image Error
      </div>
    );
  }

  return (
    <img 
      src={imgUrl} 
      alt={alt} 
      className={className} 
    />
  );
};

export default AuthenticatedIncidentImage;
