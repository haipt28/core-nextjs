import { enqueueSnackbar } from "notistack";

const useErrorSnackbar = () => {
  const showErrorSnackbar = (error: any) => {
    if (Array.isArray(error?.response?.data?.message)) {
      error?.response?.data?.message.forEach((item: any) => {
        enqueueSnackbar(item, { variant: "error" });
      });
    } else {
      let errorText = error?.response
        ? error?.response?.data?.message ?? "Không thành công"
        : error?.message ?? "Không thành công";
      enqueueSnackbar(errorText, { variant: "error" });
    }
  };

  return { showErrorSnackbar };
};

export default useErrorSnackbar;
// example:
//          const { showErrorSnackbar } = useErrorSnackbar();
//          showErrorSnackbar(error);
