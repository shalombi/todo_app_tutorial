import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const todoService = {
    getById,
    query,
    remove,
    getTasks,
    getNextTodoId,
    save,
    getEmptyTodo,
}

const KEY = 'todosDB'
var gTodos = ['wash the dishes', 'Taking out the trash', 'to travel', 'take a trip to America']

function query(filterBy) {
    let todos = _loadFromStorage()
    if (!todos || !todos.length) {
        todos = _createTodos()
        _saveToStorage(todos)
    }

    if (filterBy) {
        let { task, minSpeed, maxSpeed } = filterBy
        if (!minSpeed) minSpeed = 0;
        if (!maxSpeed) maxSpeed = Infinity
        todos = todos.filter(todo => (
            todo.task.includes(task) &&
            todo.speed >= minSpeed &&
            todo.speed <= maxSpeed
        ))
    }

    return Promise.resolve(todos)
}

function getById(todoId) {
    if (!todoId) return Promise.resolve(null)
    const todos = _loadFromStorage()
    const todo = todos.find(todo => todoId === todo._)
    return Promise.resolve(todo)
}

function getNextTodoId(todoId) {
    let todos = _loadFromStorage()
    const todoIdx = todos.findIndex(todo => todo._ === todoId)
    const nextTodoIdx = todoIdx + 1 === todos.length ? 0 : todoIdx + 1
    return todos[nextTodoIdx]._
}

function remove(todoId) {
    let todos = _loadFromStorage()
    todos = todos.filter(todo => todo._id !== todoId)
    _saveToStorage(todos)
    return Promise.resolve()
}

function save(todo) {
    if (todo._id) return _update(todo)
    else return _add(todo)
}

function _add({ task, speed }) {
    let todos = _loadFromStorage()
    const todo = _createTodo(task, speed)
    todos = [todo, ...todos]
    _saveToStorage(todos)
    return Promise.resolve(todo)
}

function _update(todoToUpdate) {
    let todos = _loadFromStorage()
    todos = todos.map(todo => todo._id === todoToUpdate._id ? todoToUpdate : todo)
    _saveToStorage(todos)
    return Promise.resolve(todoToUpdate)
}

function getTasks() {
    return gTodos
}

function _createTodo(task, speed = utilService.getRandomIntInclusive(1, 200)) {
    return {
        _id: utilService.makeId(),
        task,
        speed,
        desc: utilService.makeLorem(),
        isDone: false
    }
}

function _createTodos() {
    const todos = []
    for (let i = 0; i < 5; i++) {
        const task = gTodos[utilService.getRandomIntInclusive(0, gTodos.length - 1)]
        todos.push(_createTodo(task))
    }
    return todos
}

function _saveToStorage(todos) {
    storageService.saveToStorage(KEY, todos)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}

function getEmptyTodo() {
    return {
        isDone: false,
        desc: utilService.makeLorem(),
    }
}
