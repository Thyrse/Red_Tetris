export const hydrateStore = async (dispatch) => {
  // console.log("HYDRATESTORE");
  try {
    // fill store
    await Promise.all([
      dispatch(fetchWorkspaces()),
      dispatch(fetchChatrooms()),
    ]);
  } catch (e) {
    console.error("HYDRATESTORE_ERROR", e);
  }
};
