import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GDrive,
  MimeTypes,
} from '@robinbobin/react-native-google-drive-api-wrapper';

import { fileName } from '../config';
import { MeasuresType } from '../type/provider/measuresProvider';

export const getGDrive = async (): Promise<GDrive> => {
  const gdrive = new GDrive();
  gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
  return gdrive;
};

export const getFileId = async (gdrive: GDrive) => {
  const files = await gdrive.files.list();
  const file = files.files.find(
    (file: { name: string }) => file.name === fileName,
  );
  return file?.id;
};

export const saveMeasuresToStore = async (measures: MeasuresType) => {
  const gdrive = await getGDrive();
  const id = await getFileId(gdrive);

  if (!id) {
    await gdrive.files
      .newMultipartUploader()
      .setData(JSON.stringify(measures), MimeTypes.JSON)
      .setRequestBody({
        name: fileName,
      })
      .execute();
  } else {
    await gdrive.files
      .newMediaUploader()
      .setData(JSON.stringify(measures), MimeTypes.JSON)
      .setIdOfFileToUpdate(id)
      .execute();
  }
};

export const loadMeasuresFromStore = async () => {
  const gdrive = await getGDrive();
  const id = await getFileId(gdrive);

  return id ? await gdrive.files.getJson(id) : {};
};
