import { createContext } from "react";
import { Index2 } from "./Index2";

export const IndexState = createContext({});

export const IndexContainer = () => {
   return <>
      <IndexState.Provider value={{}}>
         <Index2/>
      </IndexState.Provider>
   </>
}