import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { HomeScreenProps } from '../type/navigation';
import { Bmi } from './Bmi';
import { WeightChart } from './Chart/WeightChart';
import { Hello } from './Hello';
import { Weight } from './Weight';

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <Hello />
        <Weight />
        <WeightChart />
        <Bmi />
      </ScrollView>
      <View style={styles.actionsContainer}>
        <Button mode="contained" onPress={() => navigation.navigate('Measure')}>
          Measure
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  actionsContainer: {
    padding: 20,
  },
});
