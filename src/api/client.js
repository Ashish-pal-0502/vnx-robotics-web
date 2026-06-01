import { create } from "apisauce";

// ---- Create API instance ----
const apiClient = create({
  // baseURL: "http://localhost:7071/api/v1",
  baseURL: "https://vnx-robotics-server.onrender.com/api/v1",
  withCredentials: true, // send cookies (refresh token)
  headers: { Accept: "application/json" },
});

// ---- Token Helpers ----
const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

const setAccessToken = (token) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
};

const removeAccessToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
};

// ---- Attach access token to every request ----
if (typeof window !== "undefined") {
  apiClient.addAsyncRequestTransform(async (request) => {
    const token = getAccessToken();
    if (!token) return;

    request.headers["x-auth-token"] = token;
  });
}

// ---- Response Interceptor (Refresh Logic) ----
apiClient.axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🚫 Skip refresh for auth routes
    const isAuthRoute =
      originalRequest?.url?.includes("/login") ||
      originalRequest?.url?.includes("/register") ||
      originalRequest?.url?.includes("/verify");

    // 🚫 Skip if no token exists
    const hasToken = !!getAccessToken();

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      hasToken
    ) {
      originalRequest._retry = true;

      try {
        // 🔁 Call refresh API (cookie will be sent automatically)
        const refreshResponse = await apiClient.post("/user/refresh-tokens");

        const newToken = refreshResponse?.data?.data?.accessToken;

        if (refreshResponse.ok && newToken) {
          // ✅ Save new token
          setAccessToken(newToken);

          // ✅ Update header and retry original request
          originalRequest.headers["x-auth-token"] = newToken;

          return apiClient.axiosInstance(originalRequest);
        } else {
          throw new Error("Refresh token invalid");
        }
      } catch (err) {
        console.error("❌ Token refresh failed:", err);

        // साफ logout
        removeAccessToken();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(err);
      }
    }

    // ❗ For other errors (403, 400 etc.)
    return Promise.reject(error);
  },
);

export default apiClient;
