import { useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn} = useUser(); 
  const toastShown = useRef(false);

  if (!isSignedIn) { // if not signed in

    if (!toastShown.current) {
      toast.error("Please login first!");
      toastShown.current = true;
    }
    return <Navigate to="/" replace />;
  } 

  return children;  // if signed-in show the page
};
 
export default ProtectedRoute;
