import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/authContext';
import 'react-native-gesture-handler';
import MainNavigation from './navigation/MainNavigation';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}
