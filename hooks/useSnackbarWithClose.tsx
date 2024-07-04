import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import {
  OptionsWithExtraProps,
  VariantType,
  closeSnackbar,
  enqueueSnackbar,
} from "notistack";

export const showSnackbarWithClose = (
  title: string,
  options: OptionsWithExtraProps<VariantType>
) => {
  if (title) {
    enqueueSnackbar(title, {
      ...options,
      action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)} size="small">
          <ClearIcon htmlColor="#ffffff" />
        </IconButton>
      ),
    });
  }
};
