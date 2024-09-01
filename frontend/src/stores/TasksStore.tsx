import { makeAutoObservable } from "mobx";
import Task from "./interfaces/TaskInterface";

class TasksStore {

    tasks: Task[] = [];

    constructor() {
        makeAutoObservable(this); // Automatically converts properties to observables and actions
    }

    setTasks(tasks: Task[]) {
        this.tasks = tasks;
    }

    getTasks() {
        return this.tasks;
    }

    getTask(id: number): Task | undefined {
        const task = this.tasks.find((task) => task.id === id);
        return task;
    }

    deleteTask(id: number) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }

    sortBy(attribute: string) {

        if (attribute === 'progress') {
            return this.tasks.sort((a, b) => a.progress - b.progress);
      }
    }

}

const tasksStore = new TasksStore();
export default tasksStore;
