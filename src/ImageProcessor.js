import React, { useState } from 'react';
import perlin2D from './Perlin';

const permutation = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 
    103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 
    26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 
    87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 
    77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 
    46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 
    187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 
    198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 
    255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 
    170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 
    172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 
    104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 
    241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 
    157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 
    93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];



function perlin2(x, y, permutation) {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    p[i] = permutation[i % permutation.length];
  }
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
  const u = fade(x);
  const v = fade(y);
  const a = p[X] + Y;
  const aa = p[a];
  const ab = p[a + 1];
  const b = p[X + 1] + Y;
  const ba = p[b];
  const bb = p[b + 1];
  const lerp = (t, a, b) => a + t * (b - a);
  return lerp(
    v,
    lerp(u, grad(p[aa], x, y), grad(p[ba], x - 1, y)),
    lerp(u, grad(p[ab], x, y - 1), grad(p[bb], x - 1, y - 1))
  );
}

function grad(hash, x, y) {
  const h = hash & 3;
  return h === 0 ? x + y : h === 1 ? -x + y : h === 2 ? x - y : -x - y;
}

export function ImageProcessor() {
    function applyPerlinNoise(imageData, permutation) {
        const width = imageData.width;
        const height = imageData.height;
        const data = imageData.data;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const noise = perlin2D(x,y,octaves,frequency,amplitude,persistence);
            const offset = (y * width + x) * 4;
            data[offset] += noise * 20;
            data[offset + 1] += noise * 20;
            data[offset + 2] += noise * 20;
          }
        }
        return imageData;
      }
    const [octaves, setOctaves] = useState(4);
    const [frequency, setFrequency] = useState(0.02);
    const [amplitude, setAmplitude] = useState(1);
    const [persistence, setPersistence] = useState(0.5);
    const [res, setRes] = useState(null);
    
  const [file, setFile] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [orig, setOrig] = useState(null);
  const handleSubmit = e =>{
    
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = event => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        var newImageData = context.getImageData(0, 0, img.width, img.height);
        console.log(newImageData)
        newImageData = applyPerlinNoise(newImageData, permutation);
        console.log(newImageData)
        setImageData(newImageData);
      };
      img.src = res;
    };
    reader.readAsDataURL(file);
  }

  const handleFileChange = e => {
    const file = e.target.files[0];
    setOrig(URL.createObjectURL(file))
    console.log(URL.createObjectURL(file));
    setFile(file)
    const reader = new FileReader();
    reader.onload = event => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        var newImageData = context.getImageData(0, 0, img.width, img.height);
        console.log(newImageData)
        newImageData = applyPerlinNoise(newImageData, permutation);
        console.log(newImageData)
        setImageData(newImageData);
      };
      setRes(event.target.result)
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {orig && <img src={orig} width={400}/> }
      {imageData && imageDataToImg(imageData)}
      <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="octaves">Octaves:</label>
                <input type="number" id="octaves" value={octaves} onChange={e => setOctaves(e.target.value)} min={1} max={8} step={1} />
            </div>
            <div>
                <label htmlFor="frequency">Frequency:</label>
                <input type="number" id="frequency" value={frequency} onChange={e => setFrequency(e.target.value)} min={0.001} max={0.1} step={0.001} />
            </div>
            <div>
                <label htmlFor="amplitude">Amplitude:</label>
                <input type="number" id="amplitude" value={amplitude} onChange={e => setAmplitude(e.target.value)} min={0} max={10} step={0.1} />
            </div>
            <div>
                <label htmlFor="persistence">Persistence:</label>
                <input type="number" id="persistence" value={persistence} onChange={e => setPersistence(e.target.value)} min={0.1} max={1} step={0.1} />
            </div>
            <button type="submit">Generate</button>
        </form>
    </div>
  );
}
function imageDataToImg(imageData) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
    const dataURL = canvas.toDataURL();
    return <img src={dataURL} alt="Image" width={400} />;
  }

