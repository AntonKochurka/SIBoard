import { RouterProvider } from "react-router-dom";
import { router } from "@src/router";
import { configureApi } from "./shared/api";
import { Provider } from "react-redux";
import { store } from "./shared/store";

configureApi(
  () => store.getState().auth.accessToken,
  async () => {
    const token = ""; // when i'll add thunks i'll dispatch here refreshing token thunk and unwrap it
    return token;
  }
)

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  );
}

export default App
