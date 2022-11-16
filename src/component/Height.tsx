import { FC, useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  TextInput,
} from 'react-native-paper';

type HeightProps = {
  height: string;
  setHeight: (h: string) => void;
};

export const Height: FC<HeightProps> = ({ height, setHeight }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(height);

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    setHeight(value);
  };

  const handleChange = (text: string) => {
    setValue(text.replace(/[^0-9]/g, ''));
  };

  return (
    <View>
      <Portal.Host>
        <Button onPress={showDialog}>Set your height</Button>
      </Portal.Host>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>Your height in cm</Paragraph>
            <TextInput
              label="Height"
              mode="outlined"
              value={value}
              keyboardType="number-pad"
              onChangeText={handleChange}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
