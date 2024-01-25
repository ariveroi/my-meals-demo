import React, { useEffect, useReducer, useState } from "react";
import { getCurrentUser, signIn, confirmSignIn } from "aws-amplify/auth";
import Login from "./screens/Login";
import CreateNewPassword from "./screens/CreateNewPassword";
import { Hub } from "aws-amplify/utils";

const initialState = {
  isSignedIn: false,
  loading: false,
  email: "",
  password: "",
  error: "",
  loginStatus: "",
};

const actionTypes = {
  SET_LOADING: "SET_LOADING",
  SET_SIGNED_IN: "SET_SIGNED_IN",
  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD: "SET_PASSWORD",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_LOGIN_STATUS: "SET_LOGIN_STATUS",
};

function authReducer(state: any, action: { type: any; payload: any }) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_SIGNED_IN:
      return { ...state, isSignedIn: action.payload };
    case actionTypes.SET_EMAIL:
      return { ...state, email: action.payload };
    case actionTypes.SET_PASSWORD:
      return { ...state, password: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: "" };
    case actionTypes.SET_LOGIN_STATUS:
      return { ...state, loginStatus: action.payload };
    default:
      return state;
  }
}

type AuthProvider = {
  children: React.ReactNode;
};

const AuthenticatorProvider: React.FC<AuthProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  //   const [user, setUser] = useState<any>();
  // const [isSignedIn, setIsSignedIn] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [loginStatus, setLoginStatus] = useState("");

  const resetState = () => {
    dispatch({ type: actionTypes.SET_LOGIN_STATUS, payload: "" });
    dispatch({ type: actionTypes.SET_EMAIL, payload: "" });
    dispatch({ type: actionTypes.SET_PASSWORD, payload: "" });
  };

  const handleErrors = (error: string) => {
    dispatch({ type: actionTypes.SET_ERROR, payload: error });
    setTimeout(() => {
      dispatch({ type: actionTypes.CLEAR_ERROR, payload: "" }); // Clear the error after 3 seconds
    }, 3000);
  };

  const handleSignIn = async () => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: state.email,
        password: state.password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        },
      });
      if (!isSignedIn) {
        if (
          nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
        ) {
          dispatch({
            type: actionTypes.SET_LOGIN_STATUS,
            payload: "newPasswordRequired",
          });
        }
      } else {
        dispatch({ type: actionTypes.SET_SIGNED_IN, payload: true });
        resetState();
      }
    } catch (error) {
      console.error("Login failed:", error);
      handleErrors("Login failed: Incorrect username or password");
    }
    dispatch({ type: actionTypes.SET_LOADING, payload: false });
  };

  const handleSetNewPassword = async (
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword) {
      handleErrors("Passwords do not match");
      return;
    } else {
      try {
        await confirmSignIn({
          challengeResponse: password,
        });
      } catch (error) {
        handleErrors((error as string).toString());
        return;
      }
    }
    // dispatch({ type: actionTypes.SET_SIGNED_IN, payload: true });
    resetState();
    getCurrentAuthUser();
  };

  useEffect(() => {
    getCurrentAuthUser();
  }, []);

  useEffect(() => {
    Hub.listen("auth", (data) => {
      data.payload.event === "signedOut" &&
        dispatch({ type: actionTypes.SET_SIGNED_IN, payload: false });
    });
  }, []);

  const getCurrentAuthUser = async () => {
    try {
      const user = await getCurrentUser();
      if (user) dispatch({ type: actionTypes.SET_SIGNED_IN, payload: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {state.isSignedIn ? (
        children
      ) : state.loginStatus === "newPasswordRequired" ? (
        <CreateNewPassword
          loading={state.loading}
          error={state.error}
          handleSetNewPassword={(password, confirmPassword) =>
            handleSetNewPassword(password, confirmPassword)
          }
        />
      ) : (
        <Login
          username={state.emails}
          password={state.password}
          setUsername={(username) =>
            dispatch({ type: actionTypes.SET_EMAIL, payload: username })
          }
          setPassword={(password) =>
            dispatch({ type: actionTypes.SET_PASSWORD, payload: password })
          }
          error={state.error}
          handleSignIn={handleSignIn}
          loading={state.loading}
        />
      )}
    </>
  );
};

export default AuthenticatorProvider;
