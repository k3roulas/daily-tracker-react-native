import { FC, useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useNavigate } from 'react-router';

import { getCurrentDate, getDateWithOffset } from '../lib/date';
import { MeasureType } from '../type/provider/measuresProvider';

interface Props {
  measure: MeasureType;
  handleChangeDate: (date: string) => void;
  handleOk: (measure: MeasureType) => void;
}

export const Measure: FC<Props> = ({ measure, handleChangeDate, handleOk }) => {
  const [date, setDate] = useState(measure.date);
  const [weight, setWeight] = useState(measure.weight);
  const navigate = useNavigate();

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
    navigate('/');
  };

  return (
    <View>
      <Text>Date</Text>
      <Text>{measure.date}</Text>
      <Button title="Today" onPress={handleDateToday} />
      <Button title=">" onPress={handleDateIncrease} />
      <Button title="<" onPress={handleDateDecrease} />
      <Text>Weight</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={handleChangeWeight}
        value={weight}
        maxLength={5}
      />
      <Button title=">" onPress={handleIncreaseWeight} />
      <Button title="<" onPress={handleDecreaseWeight} />
      <Text>Action</Text>
      <Button
        title="OK"
        onPress={() =>
          handleOk({
            date,
            weight,
          })
        }
      />
      <Button title="Cancel" onPress={() => handleCancel()} />
    </View>
  );
};
