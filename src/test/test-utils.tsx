import React from 'react';
import {render} from '@testing-library/react-native';
import {TamaguiProvider, createTamagui} from 'tamagui';
import {config} from '@tamagui/config/v3';

const tamaguiConfig = createTamagui(config);

export const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <TamaguiProvider config={tamaguiConfig}>{component}</TamaguiProvider>,
  );
};
