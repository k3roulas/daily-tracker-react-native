import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { HomeScreen } from './component/HomeScreen';
import { MeasureScreen } from './component/MeasureScreen';
import { MeasuresProvider } from './provider/measuresProvider';
import { UserProvider } from './provider/userProvider';
import { navTheme } from './style/navTheme';
import { RootStackParamList } from './type/navigation';

export const App = () => {
  GoogleSignin.configure({
    scopes: [
      // doc : https://developers.google.com/drive/api/guides/api-specific-auth
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive.appfolder',
      'https://www.googleapis.com/auth/drive.install',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive.resource',
    ],
  });

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <PaperProvider>
      <UserProvider>
        <MeasuresProvider>
          <NavigationContainer theme={navTheme}>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: 'white',
                },
                headerTintColor: 'black',
              }}>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: 'My home',
                }}
              />
              <Stack.Screen name="Measure" component={MeasureScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </MeasuresProvider>
      </UserProvider>
    </PaperProvider>
  );
};

AppRegistry.registerComponent('Daily Tracker', () => App);
