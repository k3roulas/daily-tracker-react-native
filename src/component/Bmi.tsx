import { FC, useState } from 'react';
import { Image, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import { useSettings } from '../provider/settingsProvider';
import BmiRangeImage from '../static/bmi_slider_adult_2.png';
import BmiPointerImage from '../static/pointer.png';
import { Height } from './Height';

const categories = [
  { max: 18, label: 'an underweighted' },
  { max: 25, label: 'a healthly' },
  { max: 30, label: 'an overweighted' },
  { max: 40, label: 'an obese' },
  { max: 100, label: 'an extemely obese' },
];

type BmiProps = {
  height: string;
  weight: string;
  hasHeight: boolean;
  hasWeight: boolean;
};

export const Bmi: FC<BmiProps> = ({ height, weight, hasHeight, hasWeight }) => {
  const defaultWidth = 822;
  const [widthImage, setWidthImage] = useState(0);
  const { settings, saveSettings } = useSettings();

  const hasBmi = hasHeight && hasWeight;

  const bmi = hasBmi
    ? (Number(weight) / Number(height) / Number(height)) * 10000
    : 0;

  const healthlyRange = {
    min: (18.5 * Number(height) * Number(height)) / 10000,
    max: (25 * Number(height) * Number(height)) / 10000,
  };

  const minGraph = 16.64;
  const cursorPosition = ((bmi - minGraph) * 58 * widthImage) / defaultWidth;
  const position18 = ((18.5 - minGraph) * 58 * widthImage) / defaultWidth - 14;
  const position25 = ((25 - minGraph) * 58 * widthImage) / defaultWidth - 7;
  const position30 = ((30 - minGraph) * 58 * widthImage) / defaultWidth - 7;
  const category = categories.find(cat => bmi < cat.max);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setWidthImage(width - 40);
  };

  const newHeight = (value: string) => {
    saveSettings({ ...settings, height: value });
  };

  return (
    <Surface onLayout={onLayout} style={styles.surface}>
      {!hasHeight && <Height height={height} setHeight={newHeight} />}
      {hasHeight && !hasWeight && (
        <Text style={styles.noWeight}>
          Click "Measure" button below to add weight
        </Text>
      )}

      {hasBmi && category && (
        <>
          <View style={styles.header}>
            <Text variant="headlineMedium">BMI</Text>
            <Text variant="headlineMedium">{bmi.toFixed(2)}</Text>
          </View>

          <Text>It suggests you have {category.label} weight.</Text>
          <Text>
            Healthly weight should be between {healthlyRange.min.toFixed(1)} kg
            and {healthlyRange.max.toFixed(1)} kg.
          </Text>
          <View>
            <Image
              style={{
                marginLeft: cursorPosition - 4,
                ...styles.cursor,
              }}
              source={BmiPointerImage}
            />
            <Image
              style={{
                ...{
                  width: widthImage,
                  height: (widthImage * 41) / 825,
                },
                ...styles.image,
              }}
              source={BmiRangeImage}
            />
            <View>
              <Text style={{ marginLeft: position18 }}>18.5</Text>
              <Text
                style={{
                  ...{ marginLeft: position25 },
                  ...styles.labelAxis,
                }}>
                25
              </Text>
              <Text
                style={{
                  ...{ marginLeft: position30 },
                  ...styles.labelAxis,
                }}>
                30
              </Text>
            </View>
          </View>
        </>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
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
  image: {
    resizeMode: 'contain',
    margin: 0,
    padding: 0,
  },
  cursor: {
    resizeMode: 'contain',
    height: 15,
    width: 10,
  },
  labelAxis: {
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  noWeight: {
    textAlign: 'center',
  },
});
