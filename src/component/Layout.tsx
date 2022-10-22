import { Button, Text, View } from 'react-native';
import { Link, Outlet } from 'react-router-native';

import { useUser } from '../provider/userProvider';
import { styles } from '../styles';

export const Layout = () => {
  const { user, error, signOut } = useUser();

  if (error !== null) {
    return <Text>An error occured : {error}, restart the application</Text>;
  }

  if (!user) {
    return <Text>Authentication in progress...</Text>;
  }

  return (
    <>
      <View style={styles.nav}>
        <Link to="/" style={styles.navItem}>
          <Text>Home</Text>
        </Link>
        <Link to="/add" style={styles.navItem}>
          <Text>Add</Text>
        </Link>
        <Button onPress={signOut} title="Logout" />
      </View>
      <View>
        <Outlet />
      </View>
    </>
  );
};
