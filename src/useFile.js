import { UIState } from "./UI";
import { useContext } from "react";
import { useImage } from "./useImage";

export const useFile = () => {
    const image = useImage();
    const uiState = useContext(UIState);
 
    const read = (chosenFile = {}) => {
       const fileReader = new FileReader();
       fileReader.onloadend = event => {
          uiState.file.current = chosenFile;
          uiState.blob.current = event.target.result;
          image.create(uiState.blob.current);
       };
       try {
          fileReader.readAsDataURL(chosenFile);
       } catch (e) {
          // no file - do nothing
       }
    };
 
    return {
       read,
    };
 };