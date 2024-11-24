import React from 'react';

import {Button, Input, XStack} from 'tamagui';
import {tokens} from '@tamagui/config/v3';

import useTodoPageStore from '../hooks/useTodoPageStore';

const Todo = (): React.JSX.Element => {
  const {selectedTodoIndex, inputText, onInputTextChange, onSubmitButtonPress} =
    useTodoPageStore();

  const isSubmitButtonDisabled = inputText.length === 0;
  return (
    <XStack
      backgroundColor="$white1"
      gap="$4"
      margin="$4"
      padding="$4"
      borderRadius="$8">
      <Input
        flex={1}
        backgroundColor="$white1"
        borderTopWidth={0}
        borderLeftWidth={0}
        borderRightWidth={0}
        borderRadius="$0"
        placeholder="Enter here"
        value={inputText}
        onChangeText={onInputTextChange}
      />
      <Button
        disabled={isSubmitButtonDisabled}
        opacity={isSubmitButtonDisabled ? 0.25 : 1}
        style={{backgroundColor: tokens.color.blue11Light.val}}
        color="$white1"
        fontWeight="bold"
        onPress={onSubmitButtonPress}>
        {selectedTodoIndex === null ? 'ADD' : 'UPDATE'}
      </Button>
    </XStack>
  );
};

export default Todo;
