import { Provider as StoreProvider  } from "react-redux";
import { Provider } from "react-native-paper";
import { store } from './app/store/store';
import { theme } from "./app/core/theme";
import { AppNavigator } from "./app/navigation";

export default function App() {
  return (
    <StoreProvider store={store} >
      <Provider theme={theme}>
        <AppNavigator />
      </Provider>
    </StoreProvider>
  );
}
