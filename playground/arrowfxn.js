const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    }, {
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],
    getTasksTodo () {
        return this.tasks.filter((task) => !task.completed)
    }
};

console.log(tasks.getTasksTodo());