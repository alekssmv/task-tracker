import AssigneeInterface from "./AssigneeInterface";
interface TaskInterface {
    id: number;
    name: string;
    type: string;
    deadline: string;
    assignee: AssigneeInterface;
    progress: number;
    title: string;
    created: string;
    description: string;
    status: string;
}

export default TaskInterface;