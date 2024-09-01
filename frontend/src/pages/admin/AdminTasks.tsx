import styled from 'styled-components';
import userStore from '../../stores/UserStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskInterface from '../../stores/interfaces/TaskInterface';
import tasksStore from '../../stores/TasksStore';
import strUtil from '../../utils/StringUtility';
import Buttons from '../../components/Buttons';
import SortSvg from '../../svg/Sort';
import Api from '../../utils/Api';

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
    max-width: 1200px;
    gap: 20px;
    overflow: hidden;
    flex-wrap: wrap;
    padding: 150px 350px;
    margin: 0 auto;
`;

const Input = styled.input`
    border-radius: 20px;
    width: 100%;
    align-self: center;
    text-align: left;
    font-size: 18px;
    border: none;
    &:focus {
        outline: none;
    }
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
    cursor: pointer;
    align-self: stretch;
    border-radius: 30px;
    background-color: #fff;
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
    gap: 20px;
    flex-direction: row;
`;

const StyledSortSvg = styled.div`
    cursor: pointer;
`;

const Filter = styled.div`
    gap: 10px;
    align-self: stretch;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 10px;
    display: flex;
    text-align: center;
`;

const FilterTitle = styled(Filter)`
    min-width: ${ColumnMinWidths.name}px;
    max-width: ${ColumnMinWidths.name}px;
    text-align: center;
`;

const FilterType = styled(Filter)`
    max-width: 110px;
    min-width: 100px;
    text-align: center;
`;

const FilterProgress = styled(Filter)`
    min-width: ${ColumnMinWidths.progress}px;
    text-align: center;
`;

const FilterAssignee = styled(Filter)`
    min-width: ${ColumnMinWidths.assignee}px;
    margin-right: 20px;
    text-align: center;
`;

const FilterDeadline = styled(Filter)`
    min-width: ${ColumnMinWidths.deadline}px;
    text-align: start;
`;

// Task item

const TaskItem = styled.article`
    cursor: pointer;
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
    margin-right: 60px;
    text-align: center;
`;

const TaskProgressColumn = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    min-width: 100px;
    margin-right: 30px;
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
    min-width: 180px;

    background-color: #d9d9d9;
    padding: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    // overflow: hidden;
`;

const TaskType = styled.div`
    align-self: stretch;
    border-radius: 20px;
    min-width: 100px;
    padding: 10px;
    background-color: ${(props) => props.color};
`;

const TaskAssignee = styled.div`
    align-self: stretch;
    border-radius: 20px;
    background-color: #d9d9d9;
    min-width: 200px;
    padding: 10px;;
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

const TaskDeadline = styled.div<TaskDeadlineProps>`
  align-self: stretch;
  border-radius: 20px;
  background-color: ${(props) => (props.overdue ? 'rgba(255, 0, 0, 0.5)' : '#d9d9d9')};
  text-align: center;
  color: #000;
  padding: 10px;
`;

const TaskList = () => {

    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const navigate = useNavigate();
    const [filter, setFilter] = useState({
        title: '',
        type: '',
        progress: '',
        assignee: '',
        deadline: '',
    })

    const goToAdminTask = (taskId: number) => {
        navigate(`/admin/task/${taskId}`);
    };

    const isOverDue = (deadline: string) => {
        const deadlineDate = new Date(deadline);
        const currentDate = new Date();
        return currentDate > deadlineDate;
    }

    const getProgressColor = (progress: number) => {
        if (progress === 0) {
            return "#FF000080";
        }
        if (progress === 25) {
            return "#FF000060";
        }
        if (progress === 50) {
            return "#ff8f00";
        }
        if (progress === 75) {
            return "#ffc107";
        }
        return "#2AFF0080";
    }

    const getTypeColor = (type: string) => {
        if (type === 'Milestone') {
            return '#FFC482';
        }
        if (type === 'Task') {
            return '#8292FF';
        }
        if (type === 'Epic') {
            return '#FF82F2';
        }
        return '#FF000080';
    }

    const sortTasks = (criterion: any) => {
        const sortedTasks = [...tasks].sort((a: any, b: any) => {
            if (a[criterion] < b[criterion]) return -1;
            if (a[criterion] > b[criterion]) return 1;
            return 0;
        });
        tasksStore.setTasks(sortedTasks);
        setTasks(sortedTasks);
    };

    const sortTasksByAssignee = () => {
        const sortedTasks = [...tasks].sort((a: any, b: any) => {
            if (a.assignee.login < b.assignee.login) return -1;
            if (a.assignee.login > b.assignee.login) return 1;
            return 0;
        });
        tasksStore.setTasks(sortedTasks);
        setTasks(sortedTasks);
    }

    const filterTasks = (filter: any) => {
        const filteredTasks = tasks.filter((task) => {
            if (filter.title !== '') {
                if (!task.title.toLowerCase().includes(filter.title.toLowerCase())) {
                    return false;
                }
            }
            if (filter.type !== '') {
                if (task.type !== filter.type) {
                    return false;
                }
            }
            if (filter.progress !== '') {
                if (task.progress !== +filter.progress) {
                    return false;
                }
            }
            if (filter.assignee !== '') {
                if (task.assignee.login !== filter.assignee) {
                    return false;
                }
            }
            if (filter.deadline !== '') {
                if (task.deadline.split('T')[0] !== filter.deadline) {
                    return false;
                }
            }
            return true;
        });
        tasksStore.setTasks(filteredTasks);
        setTasks(filteredTasks);
    }

    const handleChange = (criterion: any, event: any) => {
        const value = event.target.value;
        setFilter({ ...filter, [criterion]: value });
    };

    const resetFilter = () => {
        setFilter({
            title: '',
            type: '',
            progress: '',
            assignee: '',
            deadline: '',
        })
        const token = localStorage.getItem('access_token');
        Api.getAdminTasks(token!).then((response) => {
            tasksStore.setTasks(response.data);
            setTasks(response.data);
        })
    };

    useEffect(() => {
        const fetchTasks = async () => {
            setTasks(tasksStore.getTasks());
            console.log('tasts',tasksStore.getTasks());
        };

        fetchTasks();
    }, [tasks]);

    return (
        <TaskListContainer>
            <PageHeader>
                <h2>{userStore.getLogin()}</h2>
            </PageHeader>
            <TaskContentIcons>
                <Buttons />
                <TaskContent>
                    <TaskHeader>

                        <TaskHeaderRow>
                            <TaskListTitle>Список задач:</TaskListTitle>
                            <TaskActions>
                                <Button onClick={() => resetFilter()} >Сброс фильтра</Button>
                                <Button onClick={() => filterTasks(filter)}>Применить фильтр</Button>
                                {/* redirect to create task */}
                                <Button onClick={() => navigate('/admin/task/create')}>Создать задачу</Button>
                            </TaskActions>
                        </TaskHeaderRow>
                        <TaskFilterRow>

                            <FilterTitle>
                                <Input type="text" placeholder='Имя' onChange={(event) => {
                                    handleChange('title', event);
                                }} value={filter?.title} />
                                <StyledSortSvg onClick={() => sortTasks('title')}>
                                    <SortSvg />
                                </StyledSortSvg>
                            </FilterTitle>

                            <FilterType>
                                <Input type="text" placeholder='Тип' onChange={(event) => {
                                    handleChange('type', event);
                                }}
                                    value={filter?.type}
                                />
                                <StyledSortSvg onClick={() => sortTasks('type')}>
                                    <SortSvg />
                                </StyledSortSvg>
                            </FilterType>

                            <FilterAssignee>
                                <Input type="text"
                                    placeholder='Исполнитель'
                                    onChange={(event) => {
                                        handleChange('assignee', event);
                                    }}
                                    value={filter?.assignee}
                                />
                                <StyledSortSvg onClick={() => sortTasksByAssignee()}>
                                    <SortSvg />
                                </StyledSortSvg>
                            </FilterAssignee>

                            <FilterProgress>
                                <Input type="text"
                                    min="0"
                                    max="100"
                                    placeholder='Прогресс'
                                    onChange={(event) => {
                                        handleChange('progress', event);
                                    }}
                                    value={filter?.progress}
                                />
                                <StyledSortSvg onClick={() => sortTasks('progress')}>
                                    <SortSvg />
                                </StyledSortSvg>
                            </FilterProgress>

                            <FilterDeadline>
                                <Input
                                    type="date"
                                    placeholder="Select a date"
                                    onChange={(event) => {
                                        handleChange('deadline', event);
                                    }}
                                    value={filter?.deadline}
                                />
                                <StyledSortSvg onClick={() => sortTasks('deadline')}>
                                    <SortSvg />
                                </StyledSortSvg>
                            </FilterDeadline>
                        </TaskFilterRow>

                    </TaskHeader>
                    {tasks.length === 0 ? (
                        <h1>Список задач пуст</h1>
                    ) : (
                        tasks.map((task) => (
                            <TaskItem key={task.name} onClick={() => goToAdminTask(task.id)}>
                                <TaskNameColumn >
                                    <TaskName>{task.title}</TaskName>
                                </TaskNameColumn>
                                <TaskTypeColumn>
                                    <TaskType color={getTypeColor(task.type)}>{task.type}</TaskType>
                                </TaskTypeColumn>
                                <TaskAssigneeColumn>
                                    <TaskAssignee>{task.assignee.login}</TaskAssignee>
                                </TaskAssigneeColumn>
                                <TaskProgressColumn>
                                    <TaskProgress color={getProgressColor(task.progress)}>{task.progress + '%'}</TaskProgress>
                                </TaskProgressColumn>
                                <TaskDeadlineColumn>
                                    <TaskDeadline overdue={isOverDue(strUtil.stringToDate(task?.deadline))}>{strUtil.stringToDate(task?.deadline)}</TaskDeadline>
                                </TaskDeadlineColumn>
                            </TaskItem>
                        ))
                    )}



                    {/* map(task => (
                        <TaskItem key={task.name} onClick={() => goToAdminTask(task.id)}>
                            <TaskNameColumn >
                                <TaskName>{task.title}</TaskName>
                            </TaskNameColumn>
                            <TaskTypeColumn>
                                <TaskType color={getTypeColor(task.type)}>{task.type}</TaskType>
                            </TaskTypeColumn>
                            <TaskAssigneeColumn>
                                <TaskAssignee>{task.assignee.login}</TaskAssignee>
                            </TaskAssigneeColumn>
                            <TaskProgressColumn>
                                <TaskProgress color={getProgressColor(task.progress)}>{task.progress + '%'}</TaskProgress>
                            </TaskProgressColumn>
                            <TaskDeadlineColumn>
                                <TaskDeadline overdue={isOverDue(strUtil.stringToDate(task?.deadline))}>{strUtil.stringToDate(task?.deadline)}</TaskDeadline>
                            </TaskDeadlineColumn>
                        </TaskItem>
                    ))} */}


                </TaskContent>
            </TaskContentIcons>
        </TaskListContainer>
    );
};

export default TaskList;
