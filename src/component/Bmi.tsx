import { FC, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { ScreenStackHeaderRightView } from 'react-native-screens';

import { getHeight, storeHeight } from '../lib/localStore';
import { getLastMeasure } from '../lib/measure';
import { useMeasures } from '../provider/measuresProvider';
import BmiRangeImage from '../static/bmi_slider_adult_2.png';
import { Height } from './Height';

export const Bmi: FC = () => {
  const defaultWidth = 822;
  const [height, setHeight] = useState('');
  const [loading, setLoading] = useState(true);
  const [widthImage, setWidthImage] = useState(0);
  const bmi = (weight / height / height) * 10000;

  const categories = [
    { max: 18, label: 'underweighted' },
    { max: 25, label: 'healthly' },
    { max: 30, label: 'overweighted' },
    { max: 40, label: 'obese' },
    { max: 100, label: 'extemely obese' },
  ];

  const { measures } = useMeasures();
  const weight = getLastMeasure(measures);

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
    setWidthImage(width - 40);
  };

  // storeSettings('185');

  useEffect(() => {
    let ignore = false;
    const callAsync = async () => {
      const settings = await getHeight();
      if (!ignore) {
        setHeight(settings);
        setLoading(false);
      }
      getHeight();
    };
    callAsync();
    return () => {
      ignore = true;
    };
  }, []);

  console.log('height', height);

  return (
    <Surface onLayout={onLayout} style={styles.surface}>
      {loading && <Text>Loading ...</Text>}
      {!loading && height === '' && <Height height={height} />}
      {!loading && height !== '' && (
        <>
          {/* <Text>
            BMI : {bmi.toFixed(2)} {category.label}
          </Text>
          <Text>
            Healthly weight should be between {healthlyRange.min.toFixed(1)} kg
            and {healthlyRange.max.toFixed(1)} kg
          </Text>
          <View>
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
            <Text
              style={{
                ...{
                  marginLeft: cursorPosition,
                },
                ...styles.cursor,
              }}>
              L
            </Text>
            <View>
              <Text style={{ marginLeft: position18 }}>18.5</Text>
              <Text
                style={{ ...{ marginLeft: position25 }, ...styles.labelAxis }}>
                25
              </Text>
              <Text
                style={{ ...{ marginLeft: position30 }, ...styles.labelAxis }}>
                30
              </Text>
            </View>
          </View> */}
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
    position: 'absolute',
    width: 3,
    backgroundColor: 'black',
  },
  labelAxis: {
    position: 'absolute',
  },
});
