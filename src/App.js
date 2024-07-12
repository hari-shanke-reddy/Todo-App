import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './redux/todosSlice';
import { useForm } from 'react-hook-form';
import {
  Container,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    minWidth: '500px',
  },
}));

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [editingTodo, setEditingTodo] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd },
    reset: resetAdd,
  } = useForm();
  
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
  } = useForm();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Handle opening add todo dialog
  const handleOpenAddTodoDialog = () => {
    setAddDialogOpen(true);
  };

  // Confirm adding a new todo
  const confirmAddTodo = (data) => {
    const newTodoItem = { id: Date.now(), todo: data.newTodo };
    dispatch(addTodo(newTodoItem));
    setAddDialogOpen(false);
    resetAdd();
  };

  // Handle deleting a todo
  const handleDeleteTodo = (id) => {
    setTodoToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Confirm deletion of the todo
  const confirmDeleteTodo = () => {
    dispatch(deleteTodo(todoToDelete));
    setDeleteDialogOpen(false);
    setTodoToDelete(null);
  };

  // Handle editing a todo
  const handleEditTodo = (id, todo) => {
    setEditingTodo({
      id,
      todo,
    });
    setEditDialogOpen(true);
    resetEdit({ editTodo: todo });
  };

  // Confirm edit of the todo
  const confirmEditTodo = (data) => {
    const updatedTodoItem = { id: editingTodo.id, todo: data.editTodo };
    dispatch(updateTodo(updatedTodoItem));
    setEditDialogOpen(false);
    setEditingTodo(null);
    resetEdit();
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenAddTodoDialog}>
          Add Todo
        </Button>
      </Box>
      <Box mb={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    Todo
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell>{todo.id}</TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
                      {todo.todo}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditTodo(todo.id, todo.todo)}
                      style={{ marginRight: '10px' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDeleteTodo(todo.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
      
      <StyledDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add Todo</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmitAdd(confirmAddTodo)}>
            <TextField
              {...registerAdd('newTodo', { required: 'Field is required' })}
              label="New Todo"
              fullWidth
              margin="normal"
              error={!!errorsAdd.newTodo}
              helperText={errorsAdd.newTodo ? errorsAdd.newTodo.message : ''}
            />
            <DialogActions>
              <Button onClick={() => setAddDialogOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </StyledDialog>

      
      <StyledDialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmitEdit(confirmEditTodo)}>
            <TextField
              {...registerEdit('editTodo', { required: 'Field is required' })}
              label="Edit Todo"
              fullWidth
              margin="normal"
              error={!!errorsEdit.editTodo}
              helperText={errorsEdit.editTodo ? errorsEdit.editTodo.message : ''}
            />
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </StyledDialog>

     
      <StyledDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this todo?</Typography>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={confirmDeleteTodo} color="primary">
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </StyledDialog>
    </Container>
  );
};

export default App;
