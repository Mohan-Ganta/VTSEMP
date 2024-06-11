import { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);
export const AppProvider = ({children})=>{
    const [employeeData , setEmployeeData] = useState()
    const handleEmployeeData = (data)=>{
        console.log("data received to app context" +data)
        setEmployeeData(data)
    }
    return(
        <AppContext.Provider value={{employeeData , handleEmployeeData}}>
            {children}
        </AppContext.Provider>
    )
}



