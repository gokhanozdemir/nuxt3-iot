// It will be available as authState() (camelCase of file name without extension)
export default function () {
  return useState("authState", () => ({
    user: null,
    loading: false,
    auth0: null,
    isAuthenticated: false,
  }));
}
