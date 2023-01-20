import { Box, Button, FormControl, Grid, TextField, Typography, Checkbox } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from 'react';
import { addTodoList, deleteTodoList, getTodoList, updateTodoList } from '../api/todoApi';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { toast } from 'react-toastify';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
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
            setTodoList(data.map(obj => ({ ...obj, isEditable: false })));
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
    const handleCheckBox = (event, id) => {
        setTodoList(todoList.map(obj => ({ ...obj, completed: obj.id === id ? event.target.checked : obj.completed })))
    }

    const addListItem = () => {
        const data = {
            title: addNewTask.title,
            completed: false
        }
        if (data.title !== undefined) {
            addTodoList(data).then((res) => {
                setTodoList([res.data, ...todoList]);
                notify("Added Successfully");
            });
            setAddNewTask({})
        }

    }

    const updateListItem = (id) => {
        const data = {
            id: id,
            title: addNewTask.update,
            completed: false
        }
        updateTodoList(id, data).then((res) => {
            setTodoList(todoList.map(obj => ({ ...obj, isEditable: false, title: obj.id === id ? res.data.title : obj.title })));
            notify("Updated Successfully");
            setAddNewTask({})
        });
    }

    const updateCurrentTask = (id) => {
        setTodoList(todoList.map(obj => ({ ...obj, isEditable: obj.id === id ? true : false })))
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

            <Box sx={{ margin: 5, boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)', background: 'black', overflowY: 'auto', height: '75%' }}>
                {todoList.length > 0 ? (
                    todoList.map((item, index) => (
                        <>

                            <Box
                                key={index}
                                sx={{ margin: 2, padding: 2, boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)', display: 'flex', background: 'white' }}>
                                <Grid container spacing={2.5} rowSpacing={1.5} sx={{ mt: 0.1 }}>

                                    <Grid xs={10} sx={{ display: 'flex' }}>
                                        <Checkbox
                                            checked={item.completed}
                                            onChange={(event) => handleCheckBox(event, item.id)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        {item.isEditable ?
                                            (
                                                <TextField
                                                    sx={{ width: '50%' }}
                                                    name="update"
                                                    value={addNewTask?.update || item.title}
                                                    onChange={handleChange}
                                                />
                                            )
                                            :
                                            (<Typography
                                                sx={{
                                                    textDecoration: item.completed ? 'line-through' : 'none',
                                                    mt: 1
                                                }}
                                            >
                                                {item.title}
                                            </Typography>)
                                        }
                                    </Grid>
                                    {item.isEditable ? (
                                        <Grid xs={2} sx={{ textAlign: 'end' }}>
                                            <Button sx={{ mr: 1 }} variant='contained' onClick={() => updateListItem(item.id)}>Save</Button>
                                            <Button
                                                variant='contained'
                                                onClick={() => setTodoList(todoList.map(obj => ({ ...obj, isEditable: false })))}
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                    ) :
                                        (
                                            <Grid xs={2} sx={{ textAlign: 'end' }}>
                                                <Button
                                                    disabled={item.completed ? true : false}
                                                    onClick={() => updateCurrentTask(item.id)}>
                                                    <ModeEditOutlineOutlinedIcon />
                                                </Button>
                                                <Button onClick={() => deleteListItem(item.id)}>
                                                    <DeleteRoundedIcon />
                                                </Button>
                                            </Grid>
                                        )
                                    }
                                </Grid>
                            </Box>
                        </>
                    ))

                ) : ''}
            </Box>
        </Box >
    );
}

export default Todo;
