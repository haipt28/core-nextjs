import { IProfile } from "@/interface";
import { authApi } from "@/api-client/index";
import useSWR from "swr";
import { PublicConfiguration } from "swr/_internal";
import { CookieStoreControl } from "./cookie-storage";
import { showSnackbarWithClose } from "./useSnackbarWithClose";
import { enqueueSnackbar } from "notistack";
import { useCallback } from "react";

const HORSE_TO_MILLISECOND = 3000;

const instance = CookieStoreControl.getInstance();

export function useAuth(options?: Partial<PublicConfiguration>) {
  const {
    data: payload,
    error,
    mutate,
  } = useSWR("/profile", {
    dedupingInterval: HORSE_TO_MILLISECOND,
    revalidateOnFocus: true,
    ...options,
  });

  async function login(payload: { account: string; password: string }) {
    try {
      const {
        data: {
          refeshtoken,
          refeshtokenExprire,
          accessToken,
          accesstokenExprire,
        },
      } = await authApi.login({
        UserName: payload.account,
        password: payload.password,
      });

      if (
        !refeshtoken ||
        !refeshtokenExprire ||
        !accessToken ||
        !accesstokenExprire
      ) {
        showSnackbarWithClose("Tài khoản hoặc mật khẩu không chính xác", {
          variant: "error",
        });
        return false;
      }

      instance.token.set_access_token(accessToken, accesstokenExprire);
      instance.token.set_refresh_token(refeshtoken, refeshtokenExprire);

      await mutate();

      showSnackbarWithClose("Đăng nhập thành công", {
        variant: "success",
      });

      return true;
    } catch (error: any) {
      enqueueSnackbar("Tài khoản hoặc mật khẩu không chính xác.", {
        variant: "error",
      });
      // if (Array.isArray(error?.response?.data?.message)) {
      //     error?.response?.data?.message.forEach((item: any) => {
      //         showSnackbarWithClose(item, {
      //             variant: 'error',
      //         });
      //     });
      // } else {
      //     showSnackbarWithClose(
      //         error?.response ? error.response.data?.message : error.message,
      //         {
      //             variant: 'error',
      //         }
      //     );
      // }
    }
  }

  async function logout() {
    const rfToken = instance.token.get_refresh_token();

    if (rfToken) {
      await authApi.logout(rfToken);
      instance.token.remove_refresh_token();
      instance.token.remove_access_token();

      window.location.replace("/");

      mutate({}, false);
    }
  }

  const firstLoading = payload === undefined && error === undefined;

  return {
    profile: payload?.data,
    error,
    firstLoading,
    login,
    logout,
  };
}
