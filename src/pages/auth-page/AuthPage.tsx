import React from 'react';

import {Button, SizableText, YStack} from 'tamagui';
import {tokens} from '@tamagui/config/v3';

import useAuthStore from '../../hooks/useAuthStore';

const AuthPage = (): React.JSX.Element | null => {
  const {isAuthenticated, authenticate} = useAuthStore();

  if (isAuthenticated) {
    return null;
  }

  return (
    <YStack
      height="100%"
      alignItems="center"
      justifyContent="flex-end"
      paddingBottom="$10"
      gap="$4">
      <SizableText size="$8">Set Authentication to Proceed</SizableText>
      <Button
        style={{backgroundColor: tokens.color.blue11Light.val}}
        color="$white1"
        fontWeight="bold"
        borderRadius="$8"
        onPress={() => authenticate()}>
        Go to Settings
      </Button>
    </YStack>
  );
};

export default AuthPage;
