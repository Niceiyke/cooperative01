
import { useContext } from "react";
import { userContext } from "./userContext";

export const useUser = () => {
    const context = useContext(userContext)


    return context
}