import { Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from 'react';
import { addTodoList, deleteTodoList, getTodoList } from '../api/todoApi';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Todo() {
    const [todoList, setTodoList] = useState([]);
    const [addNewTask, setAddNewTask] = useState({});
    useEffect(() => {
        fetchTodoList();
    }, []);

    const notify = (message) => toast(message);

    const fetchTodoList = () => {
        getTodoList().then((data) => {
            setTodoList(data);
        });
    }

    const deleteListItem = (id) => {
        deleteTodoList(id).then(() => {
            setTodoList(todoList.filter((todo) => todo.id !== id));
            notify("Deleted Successfully");
        });
    }

    const handleChange = (event) => {
        setAddNewTask({ [event.target.name]: event.target.value });
    };

    const addListItem = () => {
        const data = {
            title: addNewTask.title,
            completed: false
        }
        addTodoList(data).then((res) => {
            setTodoList([res.data, ...todoList]);
            notify("Added Successfully");
        });
        setAddNewTask({})
    }
    return (
        <Box sx={{ m: 2, background: 'white', height: '100vh' }}>

            <Box sx={{ marginRight: 4, marginLeft: 4 }}>
                <FormControl fullWidth sx={{ marginTop: 3 }}>
                    <TextField
                        name="title"
                        value={addNewTask?.title || ''}
                        onChange={handleChange}
                        placeholder="Add New Task"
                    />
                </FormControl>
                <Button
                    sx={{ marginTop: 2 }}
                    variant="contained"
                    onClick={addListItem}>
                    <AddCircleOutlineIcon />
                    <Typography sx={{ marginLeft: '10px' }}> Create New Task </Typography>
                </Button>
            </Box>

            <Box sx={{ margin: 5, boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)', overflowY: 'auto', height: '75%' }}>
                {todoList.length > 0 ? (
                    todoList.map((item, index) => (
                        <Box
                            key={index}
                            sx={{ margin: 2, padding: 2, boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)', display: 'flex' }}>
                            <Grid container spacing={2.5} rowSpacing={1.5} sx={{ mt: 0.1 }}>
                                <Grid item xs={10}>
                                    <Typography>{item.title}</Typography>
                                </Grid>
                                <Grid item xs={2} sx = {{textAlign:'end'}}>
                                    <Button onClick={() => deleteListItem(item.id)}>
                                        <DeleteRoundedIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    ))

                ) : ''}
            </Box>
        </Box>
    );
}

export default Todo;
