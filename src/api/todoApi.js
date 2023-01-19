import axios from 'axios';

export const getTodoList = () => {
    return axios
        .get('https://jsonplaceholder.typicode.com/todos?_limit=10')
        .then(({ data }) => data);
}

export const addTodoList = (data) => {
    return axios
        .post('https://jsonplaceholder.typicode.com/todos',{data})
        .then(({ data }) => data);
}


export const deleteTodoList = (id) => {
    return axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(({ data }) => data);
}
