import { Text } from 'react-native';

import { useUser } from '../provider/userProvider';
import { styles } from '../styles';

export const Home = () => {
  const { user } = useUser();
  return <Text style={styles.header}>Hello {user?.givenName}</Text>;
};
