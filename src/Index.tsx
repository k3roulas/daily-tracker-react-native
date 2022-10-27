import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GDrive } from '@robinbobin/react-native-google-drive-api-wrapper';
import React from 'react';
import { AppRegistry, SafeAreaView, StyleSheet, Text } from 'react-native';
import { Link, NativeRouter, Outlet, Route, Routes } from 'react-router-native';

import { Home } from './component/Home';
import { Layout } from './component/Layout';
import { MeasureScreen } from './component/MeasureScreen';
import { NoMatch } from './component/NoMatch';
import { MeasuresProvider } from './provider/measuresProvider';
import { UserProvider } from './provider/userProvider';

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

  return (
    <UserProvider>
      <MeasuresProvider>
        <NativeRouter>
          <SafeAreaView>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="measure" element={<MeasureScreen />} />
                <Route path="*" element={<NoMatch />} />
              </Route>
            </Routes>
          </SafeAreaView>
        </NativeRouter>
      </MeasuresProvider>
    </UserProvider>
  );
};

AppRegistry.registerComponent('Daily Tracker', () => App);
