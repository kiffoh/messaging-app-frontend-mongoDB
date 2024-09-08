import { useEffect } from "react";
import useAuth from "../Authentification/useAuth";
import { useNavigate } from "react-router-dom";

function SignOut() {
    const {signOut} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        signOut();
        navigate('/');
    });

    
}

export default SignOut;