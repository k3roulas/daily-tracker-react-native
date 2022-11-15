import { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Provider,
  TextInput,
} from 'react-native-paper';

export const Height = () => {
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState<string>('');

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleChange = (text: string) => {
    setHeight(text.replace(/[^0-9]/g, ''));
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
              value={height}
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
