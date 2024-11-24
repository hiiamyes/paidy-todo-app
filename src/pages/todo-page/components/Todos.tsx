import React from 'react';

import {Button, SizableText, YStack, XStack, ScrollView} from 'tamagui';
import {tokens} from '@tamagui/config/v3';

import useTodoPageStore from '../hooks/useTodoPageStore';

const Todos = (): React.JSX.Element => {
  const {todos, removeTodo, toggleTodo, selectedTodoIndex} = useTodoPageStore();

  return (
    <ScrollView padding="$4">
      <YStack gap="$3">
        {todos.map((todo, index) => {
          const isSelected = selectedTodoIndex === index;
          return (
            <XStack
              key={`${todo}-${index}`}
              gap="$4"
              paddingLeft="$5"
              paddingVertical="$3"
              backgroundColor="$white1"
              borderRadius="$8"
              alignItems="center"
              borderWidth="$0.75"
              borderColor={`${isSelected ? '$gray10Light' : '$white1'}`}
              onPress={() => toggleTodo(index)}>
              <XStack
                width="$2"
                height="$2"
                backgroundColor="$blue11Light"
                borderRadius="100%"
              />
              <SizableText flex={1}>{todo}</SizableText>
              <Button
                chromeless
                style={{backgroundColor: tokens.color.white1.val}}
                borderWidth="$0"
                onPress={() => removeTodo(index)}>
                REMOVE
              </Button>
            </XStack>
          );
        })}
      </YStack>
    </ScrollView>
  );
};

export default Todos;
