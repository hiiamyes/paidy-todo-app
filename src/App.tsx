import React from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet} from 'react-native';

/**
 * Use Tamagui as the UI library
 * https://tamagui.dev/
 */
import {TamaguiProvider, createTamagui} from '@tamagui/core';
import {config, tokens} from '@tamagui/config/v3';

import useAuthStore from './hooks/useAuthStore';
import AuthPage from './pages/auth-page/AuthPage';
import TodoPage from './pages/todo-page/TodoPage';

const tamaguiConfig = createTamagui(config);

const App = (): React.JSX.Element => {
  const {isAuthenticated} = useAuthStore();

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView style={styles.container}>
          {isAuthenticated ? <TodoPage /> : <AuthPage />}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TamaguiProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.color.gray5Light.val,
  },
});

export default App;
