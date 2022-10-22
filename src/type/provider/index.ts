import { ReactElement, ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
}

export interface ProviderType {
  (props: ProviderProps): ReactElement;
}
