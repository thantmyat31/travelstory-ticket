export const checkAuth = () => {
    try {
        const token = localStorage.getItem("auth-token");
        if(!token) return false;
    } catch (error) {
        return false;
    }
    return true;
}