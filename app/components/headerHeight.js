import { Platform, StatusBar } from 'react-native';

const headerHeight = Platform.select({
  ios: 44, // Standard iOS header height
  android: 56, // Standard Android header height
});

const headerStyle = {
  height: headerHeight + (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0),
};

export default headerStyle;