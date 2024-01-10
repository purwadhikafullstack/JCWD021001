import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { keepLogin } from "../../redux/reducer/authReducer";

const Auth = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(keepLogin());
  }, [dispatch]);

  return <>{children}</>;
};

export default Auth;
