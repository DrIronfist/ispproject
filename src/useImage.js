
import { useRef, useEffect } from "react";

export const useImage = () => {
    const canvas = useRef(null);
    const context = useRef(null);
    const image = useRef(null);
 
    useEffect(() => {
       canvas.current = document.getElementById('canvas');
    }, []);
 
    const create = (src = '') => {
       const source = src === '' ? image.current.src : src;
       const newImage = new Image();
       newImage.src = source;
       newImage.onload = () => {
          image.current = newImage;
          canvas.current.width = newImage.width;
          canvas.current.height = newImage.height;
          context.current = canvas.current.getContext('2d', {alpha: false, willReadFrequently: true});
          context.current.drawImage(newImage, 0, 0);
       }
    };
 
    return {
       create,
    };
 };