import {
  createContext,
  useState,
  useContext,
  type FC,
  type ReactElement,
  useEffect,
} from "react";

//api here is an axios instance which has the baseURL set according to the env.
import api from "services/api";

type User = {
  id: string;
  account_id: string;
  buyer_id: string;
  full_name: string;
  email: string;
};

interface IAuthContext {
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  createAccount: (
    email: string,
    password: string,
    cnfPassword: string
  ) => Promise<User>;
  logout: () => void;
  user: User;
}

const AuthContext = createContext<Partial<IAuthContext>>({
  isAuthenticated: false,
  loading: false,
});

export const AuthProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromLocalStorage() {
      const token = window.localStorage.getItem("accessToken");
      if (token) {
        setAccessToken(token);
        setLoading(false);
      }
    }
    loadUserFromLocalStorage();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const res = await api.post("users/sign_in", {
        user: { email, password },
      });
      if (res.headers["authorization"]) {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            "accessToken",
            res.headers.authorization.replace(/Bearer /, "")
          );
          setAccessToken(res.headers.authorization);
        }
      }
      setLoading(false);
      return res.data;
    } catch (e) {
      setLoading(false);
      return Promise.reject(e);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("accessToken");
    window.location.pathname = "/login";
  };

  const createAccount = async (
    email: string,
    password: string,
    cnfPassword: string
  ): Promise<User> => {
    setLoading(true);
    try {
      const res = await api.post("users", {
        user: { email, password, password_confirmation: cnfPassword },
      });
      if (res.headers["authorization"]) {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            "accessToken",
            res.headers.authorization.replace(/Bearer /, "")
          );
          setAccessToken(res.headers.authorization);
        }
      }
      setLoading(false);
      return res.data;
    } catch (e) {
      setLoading(false);
      return Promise.reject(e);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        login,
        loading,
        logout,
        createAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
