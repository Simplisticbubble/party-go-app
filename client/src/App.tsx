import { Stack, Container, GridItem, Grid } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import UserForm from './components/UserForm'
import UserList from './components/UserList'


export const BASE_URL = "http://localhost:4000/api";



function App() {
  return (
    <Stack>
      <Navbar/>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {/* User Section */}
        <GridItem colSpan={1}>
          <Container maxWidth={"20%"} borderWidth="1px" borderRadius="md" position="fixed" left={"10%"} backgroundColor={"gray.900"} paddingBottom={4}>
            <UserForm />
            <UserList />
          </Container>
        </GridItem>
        {/* Todo Section */}
        <GridItem colSpan={1}>
          <Container>
            <TodoForm />
            <TodoList />
          </Container>
        </GridItem>
        
      </Grid>
    </Stack>
  )
}

export default App
