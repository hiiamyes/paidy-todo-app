import React from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

import {screen, userEvent} from '@testing-library/react-native';

import {renderWithProvider} from '../../test/test-utils';
import useAuthStore from '../../hooks/useAuthStore';
import AuthPage from './AuthPage';

jest.mock('expo-local-authentication', () => ({
  __esModule: true,
  authenticateAsync: jest.fn(),
}));

describe('AuthPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      isAuthenticated: false,
    });
  });

  it('should handle authenticate success', async () => {
    (LocalAuthentication.authenticateAsync as jest.Mock).mockResolvedValue({
      success: true,
    });
    renderWithProvider(<AuthPage />);
    const user = userEvent.setup();
    await user.press(screen.getByText('Go to Settings'));
    expect(LocalAuthentication.authenticateAsync).toHaveBeenCalledTimes(1);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(screen.queryByText('Go to Settings')).not.toBeOnTheScreen();
  });

  it('should handle authenticate failure', async () => {
    (LocalAuthentication.authenticateAsync as jest.Mock).mockResolvedValue({
      success: false,
    });
    renderWithProvider(<AuthPage />);
    const user = userEvent.setup();
    await user.press(screen.getByText('Go to Settings'));
    expect(LocalAuthentication.authenticateAsync).toHaveBeenCalledTimes(1);
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(screen.getByText('Go to Settings')).toBeOnTheScreen();
  });
});
