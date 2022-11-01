import { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  SegmentedButtons,
  Surface,
  Text,
  TextInput,
  shadow,
} from 'react-native-paper';

import { getCurrentDate, getDateWithOffset } from '../lib/date';
import { MeasureType } from '../type/provider/measuresProvider';

interface Props {
  measure: MeasureType;
  handleChangeDate: (date: string) => void;
  handleOk: (measure: MeasureType) => void;
}

export const Measure: FC<Props> = ({
  measure,
  handleChangeDate,
  handleOk,
  navigation,
}) => {
  const [date, setDate] = useState(measure.date);
  const [weight, setWeight] = useState(measure.weight);
  const [food, setFood] = useState('undefined');
  const [sport, setSport] = useState('undefined');
  const [meditation, setMeditation] = useState('undefined');

  const weightStep = 0.1;

  useEffect(() => {
    setDate(measure.date);
    setWeight(measure.weight);
  }, [measure]);

  const handleIncreaseWeight = () => {
    const newWeight = (Number(weight) + weightStep).toFixed(1);
    setWeight(newWeight.toString());
  };

  const handleDecreaseWeight = () => {
    const newWeight = (Number(weight) - weightStep).toFixed(1);
    setWeight(newWeight.toString());
  };

  const handleChangeWeight = (text: string) => {
    setWeight(text);
  };

  const handleDateIncrease = () => {
    handleChangeDate(getDateWithOffset(measure.date, 1));
  };

  const handleDateDecrease = () => {
    handleChangeDate(getDateWithOffset(measure.date, -1));
  };

  const handleDateToday = () => {
    handleChangeDate(getCurrentDate());
  };

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.dateContainer}>
          <Text variant="displaySmall">{measure.date}</Text>
          <View style={styles.dateButtonsContainer}>
            <Button
              style={styles.dateButton}
              mode="contained"
              onPress={handleDateDecrease}>
              -
            </Button>
            <Button
              style={styles.dateButton}
              mode="contained"
              onPress={handleDateToday}>
              Today
            </Button>
            <Button
              style={styles.dateButton}
              mode="contained"
              onPress={handleDateIncrease}>
              +
            </Button>
          </View>
        </View>
        <Surface style={styles.surface}>
          <Text variant="titleMedium">Weight</Text>
          <View style={styles.weightContainer}>
            <TextInput
              style={styles.weightInput}
              mode="outlined"
              keyboardType="numeric"
              onChangeText={handleChangeWeight}
              value={weight}
              maxLength={5}
            />
            <View style={styles.inputTextButtonsContainer}>
              <Button
                style={styles.inputTextButton}
                mode="contained"
                onPress={handleDecreaseWeight}>
                -
              </Button>
              <Button
                style={styles.inputTextButton}
                mode="contained"
                onPress={handleIncreaseWeight}>
                +
              </Button>
            </View>
          </View>

          <View style={styles.simpleMeasureContainer}>
            <Text variant="titleMedium">Food</Text>
            <SegmentedButtons
              value={food}
              onValueChange={setFood}
              buttons={[
                { value: 'undefined', label: 'undefined' },
                { value: 'good', label: 'good' },
                { value: 'bad', label: 'bad' },
              ]}
            />
          </View>

          <View style={styles.simpleMeasureContainer}>
            <Text variant="titleMedium">Sport</Text>
            <SegmentedButtons
              value={sport}
              onValueChange={setSport}
              buttons={[
                {
                  value: 'undefined',
                  label: 'undefined',
                },
                {
                  value: 'yes',
                  label: 'yes',
                },
                {
                  value: 'no',
                  label: 'no',
                },
              ]}
            />
          </View>

          <View style={styles.simpleMeasureContainer}>
            <Text variant="titleMedium">Meditation</Text>
            <SegmentedButtons
              value={meditation}
              onValueChange={setMeditation}
              buttons={[
                {
                  value: 'undefined',
                  label: 'undefined',
                },
                {
                  value: 'yes',
                  label: 'yes',
                },
                {
                  value: 'no',
                  label: 'no',
                },
              ]}
            />
          </View>
        </Surface>
      </ScrollView>
      <View style={styles.actionsContainer}>
        <Button
          mode="contained"
          onPress={() =>
            handleOk({
              date,
              weight,
            })
          }>
          OK
        </Button>
        <Button mode="text" onPress={() => handleCancel()}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  surface: {
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
  weightContainer: {
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 1,
  },
  dateContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    marginTop: 0,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  dateButtonsContainer: {
    flexDirection: 'row',
  },
  dateButton: {
    margin: 10,
  },
  weightInput: {
    minWidth: 85,
    textAlign: 'center',
  },
  inputTextButtonsContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 0,
    marginTop: 7,
  },
  inputTextButton: {
    marginTop: 4,
    marginRight: 10,
    marginBottom: 3,
    marginLeft: 10,
  },
  simpleMeasureContainer: {
    marginTop: 20,
  },
  actionsContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
