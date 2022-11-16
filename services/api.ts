import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

const singleton = Symbol();
const singletonEnforcer = Symbol();

class ApiService {
  session: AxiosInstance;
  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("Cannot construct singleton");
    }
    this.session = axios.create({
      baseURL: process.env["NEXT_PUBLIC_API_HOST"],
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    this.session.interceptors.response.use(
      (response) => {
        if (
          response.headers["authorization"] &&
          typeof window !== "undefined"
        ) {
          window.localStorage.setItem(
            "accessToken",
            response.headers.authorization.replace(/Bearer /, "")
          );
          this.session.defaults.headers["Authorization"] =
            response.headers.authorization;
        }
        return response;
      },
      (error: AxiosError) => {
        if (error?.response?.status === 401 && typeof window !== "undefined") {
          window.localStorage.removeItem("accessToken");
          window.location.pathname = "/login";
          return;
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  static get instance() {
    // Try to get an efficient singleton
    // @ts-ignore
    if (!this[singleton]) {
      // @ts-ignore
      this[singleton] = new ApiService(singletonEnforcer);
    }

    // @ts-ignore
    return this[singleton];
  }

  get = (url: string, config?: AxiosRequestConfig | undefined) =>
    this.session.get(url, config);
  post = (url: string, config?: AxiosRequestConfig | undefined) =>
    this.session.post(url, config);
  put = (url: string, config?: AxiosRequestConfig | undefined) =>
    this.session.put(url, config);
  patch = (url: string, config?: AxiosRequestConfig | undefined) =>
    this.session.patch(url, config);
  delete = (url: string, config?: AxiosRequestConfig | undefined) =>
    this.session.delete(url, config);
}

export default ApiService.instance;
