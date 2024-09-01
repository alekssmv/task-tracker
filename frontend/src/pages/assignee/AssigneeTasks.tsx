import styled from 'styled-components';
import Buttons from '../../components/Buttons';
import { useEffect, useState } from 'react';
import TaskInterface from '../../stores/interfaces/TaskInterface';
import tasksStore from '../../stores/TasksStore';
import userStore from '../../stores/UserStore';
import { useNavigate } from 'react-router-dom';

// Styled Components
const TaskBoard = styled.section`
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

const MainContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const UserLogin = styled.div`
    gap: 10px;
    margin-top: 200px;
    margin-right: 900px;
`;

const TaskContainer = styled.div`
    margin: 0 auto;
    margin-right: 1400px;
    display: flex;
    justify-content: top;
    align-items: top;
    background-color: #d9d9d9;
    max-width: 1200px;
    border-radius: 20px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-left: 1300px;
    margin-right: 10px;
    margin-bottom: 125px;
`;

const TaskColumn = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  padding: 10px;
  min-width: 300px;
  margin-left: 0;
`;

const ColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
`;

const ColumnHeader = styled.div`
  width: 100%;
  padding: 5px;
  border-radius: 30px;
  text-align: center;
`;

const CreatedHeader = styled(ColumnHeader)`
  background-color: rgba(255, 0, 0, 0.5);
`;

const InProgressHeader = styled(ColumnHeader)`
  background-color: rgba(255, 234, 0, 0.5);
`;

const CompletedHeader = styled(ColumnHeader)`
  background-color: rgba(42, 255, 0, 0.5);
`;

const TaskCard = styled.article`
  cursor: pointer;
  border-radius: 20px;
  background-color: #fffbfb;
  min-width: 300px;

`;

const TaskTitle = styled.h2`

`;

const TaskDescription = styled.p`
  color: rgba(0, 0, 0, 0.5);
  margin-left: 10px;
`;

// React Component
const AssigneeTasks = () => {
    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const navigate = useNavigate();
    
    const goToAssigneeTask = (id: number) => {
        navigate(`/assignee/task/${id}`);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            setTasks(tasksStore.getTasks());
        };
        fetchTasks();
    }, [tasks]);

    return (
        <MainContainer>

            <UserLogin>
                <h2>{userStore.getLogin()}</h2>
            </UserLogin>
            <RowContainer>
                <ButtonsContainer>
                    <Buttons />
                </ButtonsContainer>

                <TaskContainer>
                    <TaskBoard>
                        <TaskColumn>
                            <ColumnContent>
                                <CreatedHeader>Создана</CreatedHeader>
                                {tasks
                                    .filter((task) => task.status === 'Создана')
                                    .map((task) => (
                                        <TaskCard key={task.id} onClick={() => goToAssigneeTask(task.id)}>
                                            <TaskTitle>{task.title}</TaskTitle>
                                            <TaskDescription>{task.description}</TaskDescription>
                                        </TaskCard>
                                    ))}
                            </ColumnContent>
                        </TaskColumn>

                        <TaskColumn>
                            <ColumnContent>
                                <InProgressHeader>В работе</InProgressHeader>
                                {tasks
                                    .filter((task) => task.status === 'В работе')
                                    .map((task) => (
                                        <TaskCard key={task.id} onClick={() => goToAssigneeTask(task.id)}>
                                            <TaskTitle>{task.title}</TaskTitle>
                                            <TaskDescription>{task.description}</TaskDescription>
                                        </TaskCard>
                                    ))}
                            </ColumnContent>
                        </TaskColumn>

                        <TaskColumn>
                            <ColumnContent>
                                <CompletedHeader>Завершена</CompletedHeader>
                                {tasks
                                    .filter((task) => task.status === 'Завершена')
                                    .map((task) => (
                                        <TaskCard key={task.id} onClick={() => goToAssigneeTask(task.id)}>
                                            <TaskTitle>{task.title}</TaskTitle>
                                            <TaskDescription>{task.description}</TaskDescription>
                                        </TaskCard>
                                    ))}
                            </ColumnContent>
                        </TaskColumn>
                    </TaskBoard>
                </TaskContainer>
            </RowContainer>
        </MainContainer>)
}

export default AssigneeTasks;
