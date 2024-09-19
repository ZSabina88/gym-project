import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./features/store";

describe("App", () => {
  it("renders", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
