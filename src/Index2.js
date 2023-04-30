
import { useRef } from "react";
import { useFile } from "./useFile";



export const Index2 = () => {
    const selectImageInputRef = useRef(null);
    const file = useFile();
 
    const handleFile = (event = {}) => {
       const [source] = event.target.files;
       file.read(source);
    };
 
    const handleImageButton = () => {
       selectImageInputRef.current && selectImageInputRef.current.click();
    }
 
    return <>
       <input
          accept={'image/*'}
          className={'displayNone'}
          onChange={handleFile}
          ref={selectImageInputRef}
          type={"file"}
       />
       <button
          onClick={handleImageButton}
          variant={'contained'}
       >
          Select Image
       </button>
    </>;
 };