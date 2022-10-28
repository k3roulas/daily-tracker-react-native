import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { Button, Text, View } from 'react-native';

import { useUser } from '../provider/userProvider';
import { styles } from '../styles';
import { HomeScreenProps } from '../type/navigation';

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.header}>Hello {user?.givenName}</Text>
      <Button title="Measure" onPress={() => navigation.navigate('Measure')} />
    </View>
  );
};
