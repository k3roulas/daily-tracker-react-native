import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export const Hello: FC = () => {
  return (
    <Text variant="displayLarge" style={styles.hello}>
      Hello
    </Text>
  );
};

const styles = StyleSheet.create({
  hello: {
    margin: 20,
  },
});
