import React, {createContext, useContext} from "react";
import { useRecordReducer } from "./reducers";

const StoreContext = createContext();
const {Provider} = StoreContext;

const StoreProvider = ({value=[], ...props})=>{
    const [state, dispatch]=useRecordReducer({
        records:[],
        cart:[],
        cartOpen: false,
        genres:[],
        currentGenre:'',
    });
    // use this to confirm it works!
    console.log(state);
    return <Provider value={[state, dispatch]}{...props} />;
};

const useStoreContext =()=>{
    return useContext(StoreContext);
};

export {StoreProvider, useStoreContext};