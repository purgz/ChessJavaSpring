import { useContext} from "react";
import AuthContext from "./AuthProvider.jsx";

const useAuthContext = () =>{
    const user = useContext(AuthContext);
    if (user === undefined){
        throw new Error("useAuthContext can only be used inside authProvider");
    }
    return user;
}

export default useAuthContext;