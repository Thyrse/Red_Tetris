import { createContext, useContext } from "react";

export const SnackbarContext = createContext({
  open: false,
  text: null,
});

export function useSnackbar() {
  return useContext(SnackbarContext);
}
