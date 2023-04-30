
import { createContext, useRef,useState } from "react";
import { IndexContainer } from "./IndexContainer";
export const UIState = createContext({});


export const UI = props => {
   const blob = useRef(null);
   const file = useRef(null);
   const [stats, setStats] = useState({});

   return <>
      <UIState.Provider value={{
         blob,
         file,
         setStats,
         stats,
      }}>
         <IndexContainer/>
         <div>
            <canvas id={'canvas'}></canvas>
         </div>
      </UIState.Provider>
   </>;
};