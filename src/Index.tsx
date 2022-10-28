import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppRegistry } from 'react-native';

import { HomeScreen } from './component/HomeScreen';
import { MeasureScreen } from './component/MeasureScreen';
import { MeasuresProvider } from './provider/measuresProvider';
import { UserProvider } from './provider/userProvider';
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
    <UserProvider>
      <MeasuresProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
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
  );
};

AppRegistry.registerComponent('Daily Tracker', () => App);
