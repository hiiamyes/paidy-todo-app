import AsyncStorage from '@react-native-async-storage/async-storage';

import {create} from 'zustand';

export const STORAGE_KEY = 'paidtodo-app-todos';

interface TodoPageState {
  inputText: string;
  onInputTextChange: (text: string) => void;
  onSubmitButtonPress: () => void;

  todos: string[];
  selectedTodoIndex: number | null;
  initTodoPage: () => Promise<void>;
  addTodo: (todo: string) => void;
  removeTodo: (index: number) => void;
  toggleTodo: (index: number | null) => void;
  updateTodo: (index: number, newTodo: string) => void;
}

const useTodoPageStore = create<TodoPageState>((set, get) => ({
  inputText: '',
  onInputTextChange: text => set(() => ({inputText: text})),
  onSubmitButtonPress: () => {
    const {inputText, selectedTodoIndex, addTodo, updateTodo} = get();
    if (selectedTodoIndex === null) {
      addTodo(inputText);
    } else {
      updateTodo(selectedTodoIndex, inputText);
    }
    set(() => ({inputText: '', selectedTodoIndex: null}));
  },

  todos: [],
  selectedTodoIndex: null,
  initTodoPage: async () => {
    try {
      const todos = await AsyncStorage.getItem(STORAGE_KEY);
      set(() => ({todos: todos ? JSON.parse(todos) : []}));
    } catch (error) {
      console.error('Error initializing todo page:', error);
    }
  },
  addTodo: async todo => {
    const newTodos = [...get().todos, todo];
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
      set(() => ({todos: newTodos}));
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  },
  removeTodo: async index => {
    const newTodos = get().todos.filter((_, i) => i !== index);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
      set(() => ({todos: newTodos, selectedTodoIndex: null, inputText: ''}));
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  },
  toggleTodo: index =>
    set(state => {
      if (index === state.selectedTodoIndex) {
        return {selectedTodoIndex: null, inputText: ''};
      }
      return {
        selectedTodoIndex: index,
        inputText: index !== null ? get().todos[index] : '',
      };
    }),
  updateTodo: async (index, newTodo) => {
    const newTodos = [...get().todos];
    newTodos[index] = newTodo;
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
      set(() => ({todos: newTodos}));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  },
}));

export default useTodoPageStore;
