import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import BmiRangeImage from '../static/bmi_slider_adult_2.png';

export const Bmi = () => {
  const defaultWidth = 822;
  const [widthImage, setWidthImage] = useState(0);
  const weight = 85.5;
  const height = 181;
  const bmi = (weight / height / height) * 10000;
  const categories = [
    { max: 18, label: 'underweighted' },
    { max: 25, label: 'healthly' },
    { max: 30, label: 'overweighted' },
    { max: 40, label: 'obese' },
    { max: 100, label: 'extemely obese' },
  ];

  const healthlyRange = {
    min: (18.5 * height * height) / 10000,
    max: (25 * height * height) / 10000,
  };

  const minGraph = 16.64;
  const cursorPosition = ((bmi - minGraph) * 58 * widthImage) / defaultWidth;
  const position18 = ((18.5 - minGraph) * 58 * widthImage) / defaultWidth - 14;
  const position25 = ((25 - minGraph) * 58 * widthImage) / defaultWidth - 7;
  const position30 = ((30 - minGraph) * 58 * widthImage) / defaultWidth - 7;

  const category = categories.find(cat => bmi < cat.max);

  const onLayout = event => {
    const { width } = event.nativeEvent.layout;
    setWidthImage(width);
  };

  return (
    <View onLayout={onLayout} style={{ margin: 10 }}>
      <Text>Your weight : {weight} kg</Text>
      <Text>
        BMI : {bmi.toFixed(2)} {category.label}
      </Text>
      <Text>
        Healthly weight should be between {healthlyRange.min.toFixed(2)} kg and{' '}
        {healthlyRange.max.toFixed(2)} kg
      </Text>

      <View>
        <Text style={{ marginLeft: cursorPosition }}>I</Text>
        <Image
          style={{
            width: widthImage,
            height: (widthImage * 41) / 825,
            resizeMode: 'contain',
            margin: 0,
            padding: 0,
          }}
          source={BmiRangeImage}
        />
        <View>
          <Text style={{ marginLeft: position18 }}>18.5</Text>
          <Text style={{ marginLeft: position25, position: 'absolute' }}>
            25
          </Text>
          <Text style={{ marginLeft: position30, position: 'absolute' }}>
            30
          </Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({});
