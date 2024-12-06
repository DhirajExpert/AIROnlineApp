import { Provider as ReduxProvider } from "react-redux";
import { store } from './app/store/store';
import { Provider } from "react-native-paper";
import { theme } from "./app/core/theme";
import { AppNavigator } from "./app/navigation";

export default function App() {
  return (
    <ReduxProvider store={store} >
      <Provider theme={theme}>
        <AppNavigator />
      </Provider>
    </ReduxProvider >
  );
}
