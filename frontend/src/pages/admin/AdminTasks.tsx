import styled from 'styled-components';
import userStore from '../../stores/UserStore';
import Api from '../../utils/Api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ColumnMinWidths = {
    name: 200,
    type: 140,
    assignee: 200,
    progress: 100,
    deadline: 200
}

const TaskListContainer = styled.section`
    border-radius: 20px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    min-width: 1200px;
    gap: 20px;
    overflow: hidden;
    flex-wrap: wrap;
    padding: 150px 350px;
    margin: 0 auto;
`;

const PageHeader = styled.header`
    // end
    margin-left: 110px;
    display: flex;
`;

const TaskContentIcons = styled.div`
    gap: 10px;
    display: flex;
    flex-direction: row;
`;

const TaskIcon = styled.img`
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 60px;
    border-radius: 20px;
    align-self: start;
`;

const TaskContent = styled.div`
    border-radius: 20px;
    background-color: #d9d9d9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-grow: 1;
    flex-basis: 0;
    width: fit-content;
    padding: 20px 30px 32px;
`;

const TaskHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-self: stretch;
`;

const TaskHeaderRow = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
`;

const TaskListTitle = styled.h2`
    align-self: start;
    border-radius: 20px;
    background-color: #d9d9d9;
    padding: 10px;
`;

const TaskActions = styled.div`
    margin-left: auto;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`;

const Button = styled.button`
    align-self: stretch;
    border-radius: 30px;
    background-color: #fff;
    // make button font bigger
    font-size: 18px;
    border: none;

    padding: 15px;
    flex-grow: 1;
    flex-basis: auto;
`;

// Filters

const TaskFilterRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`;

const Filter = styled.div`
    align-self: stretch;
    border-radius: 20px;
    background-color: #fff;
    padding: 10px;
`;

const FilterTitle = styled(Filter)`
    min-width: ${ColumnMinWidths.name}px;
    text-align: center;
`;

const FilterType = styled(Filter)`
    min-width: ${ColumnMinWidths.type}px;
    text-align: center;
`;

const FilterProgress = styled(Filter)`
    min-width: ${ColumnMinWidths.progress}px;
    text-align: center;
`;

const FilterAssignee = styled(Filter)`
    min-width: ${ColumnMinWidths.assignee}px;
    text-align: center;
`;

const FilterDeadline = styled(Filter)`
    min-width: ${ColumnMinWidths.deadline}px;
    text-align: center;
`;

// Task item

const TaskItem = styled.article`
    border-radius: 30px;
    background-color: #fff;
    margin-top: 20px;
    padding: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: stretch;
`;

const TaskNameColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: normal;
    min-width: 210px;
`;

const TaskTypeColumn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    line-height: normal;
    min-width: 100px;
    text-align: center;
`;

const TaskAssigneeColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 210px;
    max-width: 210px;
    text-align: center;
`;

const TaskProgressColumn = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    min-width: 75px;
    justify-content: center;
    line-height: normal;
`;

const TaskDeadlineColumn = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    min-width: 210px;
    max-width: 210px;
`;

// Task item content

const TaskName = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 20px;

    background-color: #d9d9d9;
    padding: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    // overflow: hidden;
`;

const TaskType = styled.div`
    align-self: stretch;
    border-radius: 20px;
    padding: 10px;
    background-color: ${(props) => props.color};
`;

const TaskAssignee = styled.div`
    align-self: stretch;
    border-radius: 20px;
    background-color: #d9d9d9;
    padding: 10px;

    white-space: nowrap;
    text-overflow: ellipsis;
`;

const TaskProgress = styled.div`
    align-self: stretch;
    border-radius: 20px;
    padding: 10px;
    background-color: ${(props) => props.color};
`;

interface TaskDeadlineProps {
    overdue: boolean;
}

interface Task {
    name: string;
    type: { label: string; color: string };
    assignee: string;
    progress: { label: string; color: string };
    title: string;
  }


const TaskDeadline = styled.div<TaskDeadlineProps>`
  align-self: stretch;
  border-radius: 20px;
  background-color: ${(props) => (props.overdue ? 'rgba(255, 0, 0, 0.5)' : '#d9d9d9')};
  text-align: center;
  color: #000;
  padding: 10px;
`;

const  TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
          const response = await Api.getAdminTasks(localStorage.getItem("access_token")!);
          setTasks(response);
        };
        fetchTasks();
      }, []);

    return (
        <TaskListContainer>
            <PageHeader>
                <h2>{userStore.getLogin()}</h2>
            </PageHeader>
            <TaskContentIcons>
                <TaskIcon src="/home.svg" alt="" />
                <TaskContent>
                    <TaskHeader>
                        <TaskHeaderRow>
                            <TaskListTitle>Список задач:</TaskListTitle>
                            <TaskActions>
                                <Button>Настроить фильтр</Button>
                                {/* redirect to create task */}
                                <Button onClick={() => navigate('/admin/task/create')}>Создать задачу</Button>
                            </TaskActions>
                        </TaskHeaderRow>
                        <TaskFilterRow>
                            <FilterTitle>Название</FilterTitle>
                            <FilterType>Тип</FilterType>
                            <FilterAssignee>Исполнитель</FilterAssignee>
                            <FilterProgress>Прогресс</FilterProgress>
                            <FilterDeadline>Сроки</FilterDeadline>
                        </TaskFilterRow>
                    </TaskHeader>
                    
                    {
                    // [{
                    //     name: 'Название задачи',
                    //     type: { label: 'Task', color: '#8292ff' },
                    //     assignee: 'Иванов И.И.',
                    //     progress: { label: '50%', color: 'rgba(255, 234, 0, 0.5)' },
                    //     deadline: { date: '20.09.2024', overdue: true }
                    // }, {
                    //     name: 'Название задачи 2',
                    //     type: { label: 'Feature', color: '#ffae47' },
                    //     assignee: 'Петров П.П.',
                    //     progress: { label: '25%', color: 'rgba(255, 0, 0, 0.5)' },
                    //     deadline: { date: '15.10.2024', overdue: false }
                    // }, {
                    //     name: 'Название задачи 3',
                    //     type: { label: 'Bug', color: '#e53935' },
                    //     assignee: 'Сидоров С.С.',
                    //     progress: { label: '75%', color: 'rgba(0, 255, 0, 0.5)' },
                    //     deadline: { date: '05.11.2024', overdue: false }
                    // }, {
                    //     name: 'Название задачи 4',
                    //     type: { label: 'Release', color: '#3f51b5' },
                    //     assignee: 'Кузнецов К.К.',
                    //     progress: { label: '100%', color: 'rgba(0, 0, 255, 0.5)' },
                    //     deadline: { date: '01.12.2024', overdue: false }
                    // }, {
                    //     name: 'Название задачи 5',
                    //     type: { label: 'Feature', color: '#ffae47' },
                    //     assignee: 'Петров П.П.',
                    //     progress: { label: '0%', color: 'rgba(255, 0, 0, 0.5)' },
                    //     deadline: { date: '05.01.2025', overdue: false }
                    // },]
                    
                    tasks.map(task => (
                        <TaskItem key={task.name}>
                            <TaskNameColumn >
                                <TaskName>{task.title}</TaskName>
                            </TaskNameColumn>
                            <TaskTypeColumn>
                                <TaskType color={task.type.color}>{task.type}</TaskType>
                            </TaskTypeColumn>
                            <TaskAssigneeColumn>
                                <TaskAssignee>{task.assignee_name}</TaskAssignee>
                            </TaskAssigneeColumn>
                            <TaskProgressColumn>
                                <TaskProgress color={task.progress.color}>{task.progress}</TaskProgress>
                            </TaskProgressColumn>
                            <TaskDeadlineColumn>
                                <TaskDeadline overdue={task.deadline.overdue}>{task.deadline}</TaskDeadline>
                            </TaskDeadlineColumn>
                        </TaskItem>
                    ))}
                </TaskContent>
            </TaskContentIcons>
        </TaskListContainer>
    );
};

export default TaskList;
