import React, { useState } from 'react';
import perlin2D from './Perlin';

export function ImageProcessor() {
    function applyPerlinNoise(imageData) {
        console.log("called");
        const width = imageData.width;
        const height = imageData.height;
        const data = imageData.data;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const noise = perlin2D(x,y,octaves,frequency,amplitude,persistence);
            const offset = (y * width + x) * 4;
            data[offset] += noise * scale;
            data[offset + 1] += noise * scale;
            data[offset + 2] += noise * scale;
            data[offset + 3] += noise * scale;
          }
        }
        return imageData;
      }
    const [octaves, setOctaves] = useState(4);
    const [frequency, setFrequency] = useState(0.02);
    const [amplitude, setAmplitude] = useState(1);
    const [persistence, setPersistence] = useState(0.5);
    const [scale, setScale] = useState(10);
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
        newImageData = applyPerlinNoise(newImageData);
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
        newImageData = applyPerlinNoise(newImageData);
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
            <div>
                <label htmlFor="scale">Scale:</label>
                <input type="number" id="scale" value={scale} onChange={e => setScale(e.target.value)} min={1} max={100} step={5} />
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


