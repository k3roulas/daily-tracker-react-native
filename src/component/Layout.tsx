import { Button, Text, View } from 'react-native';
import { Link, Outlet } from 'react-router-native';

import { useMeasures } from '../provider/measuresProvider';
import { useUser } from '../provider/userProvider';
import { styles } from '../styles';

export const Layout = () => {
  const { user, error, signOut } = useUser();
  const { measures } = useMeasures();

  if (error !== null) {
    return <Text>An error occured : {error}, restart the application</Text>;
  }

  if (!user) {
    return <Text>Authentication in progress...</Text>;
  }

  if (measures === {}) {
    return <Text>Load data ...</Text>;
  }

  return (
    <>
      <View style={styles.nav}>
        <Link to="/" style={styles.navItem}>
          <Text>Home</Text>
        </Link>
        <Link to="/measure" style={styles.navItem}>
          <Text>Measure</Text>
        </Link>
        <Button onPress={signOut} title="Logout" />
      </View>
      <View>
        <Outlet />
      </View>
    </>
  );
};
