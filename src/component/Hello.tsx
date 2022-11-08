import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import { useUser } from '../provider/userProvider';

export const Hello: FC = () => {
  const { user } = useUser();
  return (
    <Text variant="displayLarge" style={styles.hello}>
      Hello {user?.givenName}
    </Text>
  );
};

const styles = StyleSheet.create({
  hello: {
    margin: 20,
  },
});
