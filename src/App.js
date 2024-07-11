import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './redux/todosSlice';
import { Container, Typography, TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [addError, setAddError] = useState('');
  const [editError, setEditError] = useState('');

  // Fetch todos when the component mounts
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Handle adding a new todo (open add dialog)
  const handleOpenAddTodoDialog = () => {
    setAddDialogOpen(true);
  };

  // Confirm adding of the todo
  const confirmAddTodo = () => {
    if (newTodo.trim() === '') {
      setAddError('Field is required');
      return; // Do not add if the todo is empty or contains only whitespace
    }
    const newTodoItem = { id: Date.now(), todo: newTodo };
    dispatch(addTodo(newTodoItem));
    setAddDialogOpen(false);
    setNewTodo(''); // Clear the input field after adding
    setAddError(''); // Clear the error message after adding
  };

  // Handle deleting a todo (open confirmation dialog)
  const handleDeleteTodo = (id) => {
    setTodoToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Confirm deletion of the todo
  const confirmDeleteTodo = () => {
    dispatch(deleteTodo(todoToDelete));
    setDeleteDialogOpen(false);
    setTodoToDelete(null); // Reset state after deletion
  };

  // Handle editing a todo (open edit dialog)
  const handleEditTodo = (id, todo) => {
    setEditingTodoText(todo);
    setEditingTodo(id);
    setEditDialogOpen(true);
  };

  // Confirm edit of the todo
  const confirmEditTodo = () => {
    if (editingTodoText.trim() === '') {
      setEditError('Field is required');
      return; // will not save if the todo is empty 
    }
    const updatedTodoItem = { id: editingTodo, todo: editingTodoText };
    dispatch(updateTodo(updatedTodoItem));
    setEditDialogOpen(false);
    setEditingTodoText(''); // Clear the input field after saving
    setEditingTodo(null); // Reset state after saving
    setEditError(''); // Clear the error message after saving
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h3" gutterBottom>
          Todo App
        </Typography>
       
      </Box>
      <Box ml={130}> <Button variant="contained" color="primary" onClick={handleOpenAddTodoDialog}>
          Add Todo
        </Button></Box>
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
                    Todo List
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
                    <Box display="flex" justifyContent="flex-end">
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditTodo(todo.id, todo.todo)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(todo.id)} sx={{ ml: 3 }}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this todo item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={confirmDeleteTodo} color="primary" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Todo"
            type="text"
            fullWidth
            value={editingTodoText}
            onChange={(e) => setEditingTodoText(e.target.value)}
            multiline
            error={!!editError}
            helperText={editError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={confirmEditTodo} color="primary" variant="contained" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Todo"
            type="text"
            fullWidth
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            multiline
            error={!!addError}
            helperText={addError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={confirmAddTodo} color="primary" variant="contained" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
