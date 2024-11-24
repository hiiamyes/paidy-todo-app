import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {screen, userEvent, waitFor} from '@testing-library/react-native';

import {renderWithProvider} from '../../test/test-utils';
import TodoPage from './TodoPage';
import {STORAGE_KEY} from './hooks/useTodoPageStore';

describe('TodoPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(['First Item']));
  });

  it('should initialize with todos from AsyncStorage', async () => {
    renderWithProvider(<TodoPage />);
    await waitFor(() => {
      expect(screen.getByText('First Item')).toBeTruthy();
    });
  });

  it('should handle add todo user flow correctly', async () => {
    renderWithProvider(<TodoPage />);
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('Enter here'), 'Second Item');
    await user.press(screen.getByText('ADD'));
    expect(screen.getByText('First Item')).toBeOnTheScreen();
    expect(screen.getByText('Second Item')).toBeOnTheScreen();
  });

  it('should handle update todo user flow correctly', async () => {
    renderWithProvider(<TodoPage />);
    const user = userEvent.setup();
    await user.press(screen.getByText('First Item'));
    await user.type(screen.getByPlaceholderText('Enter here'), ' Updated');
    await user.press(screen.getByText('UPDATE'));
    expect(screen.getByText('First Item Updated')).toBeOnTheScreen();
  });

  it('should handle remove todo user flow correctly', async () => {
    renderWithProvider(<TodoPage />);
    const user = userEvent.setup();
    await user.press(screen.getByText('REMOVE'));
    expect(screen.queryByText('First Item Updated')).not.toBeOnTheScreen();
  });
});
