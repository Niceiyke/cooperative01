
import { useContext } from "react";
import { userContext } from "../contexts/userContext";


export const useUser = () => {
    const context = useContext(userContext)


    return context
}