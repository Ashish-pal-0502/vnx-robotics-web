import { create } from "apisauce";

const apiClient = create({
  // baseURL: "http://13.233.80.197:7071/api/v1",
  // baseURL: "http://localhost:7071/api/v1",
  baseURL: "https://vnx-robotics-server.onrender.com/api/v1",

  withCredentials: false,
  headers: { Accept: "application/json" },
});

const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

const removeAccessToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

if (typeof window !== "undefined") {
  apiClient.addAsyncRequestTransform(async (request) => {
    const token = getAccessToken();
    if (token) {
      request.headers["Authorization"] = token;
    }
  });
}

apiClient.axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute =
      originalRequest?.url?.includes("/login") ||
      originalRequest?.url?.includes("/register") ||
      originalRequest?.url?.includes("/verify");

    if (error.response?.status === 401 && !isAuthRoute) {
      console.log("🔄 Token expired or invalid, logging out...");

      removeAccessToken();

      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
