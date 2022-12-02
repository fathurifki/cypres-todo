import React from 'react';
import { Input, Button, Text } from '@chakra-ui/react';

export default function App() {
  const [state, setState] = React.useState({
    todos: '',
    todosList: [],
    index: 0,
    valueEdit: '',
    edit: false,
  });

  const handleInputState = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addTodosToList = () => {
    setState((prev) => ({
      ...prev,
      todosList: [...prev.todosList, state.todos],
      todos: '',
    }));
  };

  const handleEditTodos = (value) => {
    const arr = [...state.todosList];
    const findIndex = arr.indexOf(value);
    if (findIndex > -1 && !state.edit) {
      arr.splice(findIndex, 1, value);
      setState((prev) => ({
        ...prev,
        index: findIndex,
        edit: !state.edit,
      }));
    } else {
      arr.splice(findIndex, 1, state.valueEdit);
      setState((prev) => ({
        ...prev,
        index: findIndex,
        edit: !state.edit,
        todosList: arr,
      }));
    }
  };

  const handleDeleteTodos = (value) => {
    const array = [...state.todosList];
    const findIndex = array.indexOf(value);
    if (findIndex > -1) {
      array.splice(findIndex, 1);
      setState((prev) => ({
        ...prev,
        todosList: array,
      }));
    }
  };

  console.log('State', state);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          padding: '30px',
        }}
      >
        <Text as="b" fontSize="3xl">
          Cypress Todo 👳🏻
        </Text>
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <Input
            value={state.todos}
            onChange={(e) => handleInputState('todos', e.target.value)}
          />
          <Button colorScheme="green" onClick={addTodosToList}>
            Add ✨
          </Button>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        {state?.todosList?.map((v, i) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div>
              {state.index === i && state.edit ? (
                <Input
                  defaultValue={v}
                  onChange={(e) =>
                    handleInputState('valueEdit', e.target.value)
                  }
                />
              ) : (
                <span>{v}</span>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '20px',
              }}
            >
              <Button
                disabled={state.edit && state.index !== i}
                onClick={() => handleEditTodos(v)}
                colorScheme="teal"
              >
                Edit
              </Button>
              <Button colorScheme="red" onClick={() => handleDeleteTodos(v)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
