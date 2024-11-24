import React, {useEffect} from 'react';

import {YStack} from 'tamagui';

import Header from './components/Header';
import Footer from './components/Footer';
import Todos from './components/Todos';
import useTodoPageStore from './hooks/useTodoPageStore';

const TodoPage = (): React.JSX.Element => {
  const {initTodoPage} = useTodoPageStore();

  useEffect(() => {
    initTodoPage();
  }, [initTodoPage]);

  return (
    <YStack height="100%">
      <Header />
      <Todos />
      <Footer />
    </YStack>
  );
};

export default TodoPage;
