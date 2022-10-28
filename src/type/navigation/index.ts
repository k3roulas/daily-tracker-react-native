import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Measure: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type MeasureScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Measure'
>;
