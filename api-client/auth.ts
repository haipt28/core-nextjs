import axiosClient from "@/helper/call-center";

export const authApi = {
  login(payload: any) {
    return axiosClient.post("/login", payload);
  },

  logout(token: string) {
    return axiosClient.delete(`/logout/${token}`);
  },
  getProfile() {
    return axiosClient.get("/profile");
  },
};
