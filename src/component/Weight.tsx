import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import { getLastMeasure } from '../lib/measure';
import { useMeasures } from '../provider/measuresProvider';

export const Weight = () => {
  const { measures } = useMeasures();
  const measure = getLastMeasure(measures);

  if (!measure) {
    return <></>;
  }

  return (
    <Surface style={styles.surface}>
      <Text variant="headlineMedium">Weight</Text>
      <Text variant="headlineMedium">{measure.weight} kg</Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginTop: 0,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
    borderRadius: 10,
  },
});
