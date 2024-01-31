import { Navigate } from "react-router-dom";

export const AuthenticatedRouteOrder = ({ children }) => {
    const hasVisitedCart = localStorage.getItem("hasVisitedCart");

    if (hasVisitedCart) {
        return <>{children}</>;
    } 
    else {
        return <Navigate to="/cart" />;
    }
};