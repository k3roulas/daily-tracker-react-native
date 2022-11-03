import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useUser } from '../provider/userProvider';
import { HomeScreenProps } from '../type/navigation';
import { Bmi } from './Bmi';

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user } = useUser();

  return (
    <View>
      <Text variant="displayLarge">Hello {user?.givenName}</Text>
      <Bmi />
      <Button mode="contained" onPress={() => navigation.navigate('Measure')}>
        Measure
      </Button>
    </View>
  );
};
