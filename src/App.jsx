import React, { useState } from 'react';
import { Container, Box, Card, CardBody, Switch, CardHeader, Heading, Text, Stack, StackDivider, FormControl, FormLabel, Input, Textarea, Button, HStack, Flex } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from './redux/todo';
import { DeleteIcon } from '@chakra-ui/icons';

const App = () => {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector(state => state.todo.todos);

  const newTodo = () => {

    if (title.trim().length === 0 || body.trim().length === 0) {
      alert("Task Title and Body cannot be empty")
      return;
    }

    dispatch(
      addTodo({
        id: Date.now(),
        title,
        body,
        completed: false,
      }));

  }

  return (
    <Container maxW="1250px">

      <Card my="4">
        <CardHeader>
          <Heading size="md" textAlign="center">Add new task:</Heading>
        </CardHeader>
        <CardBody>

          <FormControl>
            <Stack spacing='4'>

              <Box>
                <FormLabel htmlFor='title'>Enter Task Title</FormLabel>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} id='title' type="text" placeholder="Task Title" />
              </Box>

              <Box>
                <FormLabel htmlFor='body'>Enter Task Body</FormLabel>
                <Textarea value={body} onChange={(e) => setBody(e.target.value)} id='body' type="text" placeholder="Task Title" />
              </Box>

              <Button onClick={newTodo} colorScheme="teal" type='submit'>Add new Task</Button>

            </Stack>

          </FormControl>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size='md'>Tasks</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>

            {todos.length &&
              todos.map((item) => (
                <Box key={item.id}>

                  <Flex justifyContent="space-between">

                    <Box >
                      <Heading size='xs' textDecoration={item.completed ? "line-through" : "none"} textTransform='uppercase'>
                        {item?.title}
                      </Heading>
                      <Text pt='2' fontSize='sm'>
                        {item?.body}
                      </Text>
                    </Box>

                    <Flex gap="4" alignItems="center">
                      <Switch onChange={() => dispatch(updateTodo(item.id))} isChecked={item.completed} />
                      <Button leftIcon={<DeleteIcon />} onClick={()=>dispatch(deleteTodo(item.id))} colorScheme='red'>Delete Task</Button>
                    </Flex>

                  </Flex>

                </Box>
              ))}

          </Stack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default App;