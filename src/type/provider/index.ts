import { ReactElement, ReactNode } from 'react';

type ProviderProps = {
  children: ReactNode;
};

export type ProviderType = {
  (props: ProviderProps): ReactElement;
};
