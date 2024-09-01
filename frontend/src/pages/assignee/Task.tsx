import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import tasksStore from '../../stores/TasksStore';
import TaskInterface from '../../stores/interfaces/TaskInterface';
import { useEffect, useState } from 'react';
import api from '../../utils/Api';
import ButtonsComp from '../../components/Buttons';

const StyledButtonsComp = styled.div`
    margin-left: 200px;
`;

const TaskContainer = styled.section`
    border-radius: 20px;
    background-color: #fff;
    display: flex;
    min-width: 1200px;
    gap: 20px;
    overflow: hidden;
    flex-wrap: wrap;
    padding: 150px 350px;
    margin: 0 auto;
`;

const ButtonWhite = styled.button`
    align-self: stretch;
    border-radius: 30px;
    background-color: #fff;
    font-size: 18px;
    border: none;
    padding: 15px;
    flex-grow: 1;
    flex-basis: auto;
    cursor: pointer;
`;

const ButtonGrey = styled.button`
    cursor: pointer;
    align-self: stretch;
    border-radius: 30px;
    background-color: #d9d9d9;
    font-size: 18px;
    border: none;
    padding: 15px;
    flex-grow: 1;
    flex-basis: auto;
`;

const TextArea = styled.textarea`
    margin-top: 20px;
    align-self: stretch;
    border-radius: 20px;
    background-color: #d9d9d9;
    text-align: center;
    color: #000000;
    padding: 14px;
    width: 97%;
    border: none;
    resize: none;
    outline: none;
    font-size: 18px;
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
    max-width: 1200px;
    padding: 20px 30px 32px;
`;

const Form = styled.form`
    width: 100%;
`;

// Header.

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

const Input = styled.input`
    border-radius: 30px;
    background-color: #d9d9d9;
    text-align: center;
    color: #000000;
    padding: 14px;
    max-width: 920px;
    border: none;
    outline: none;
    font-size: 18px;
    width: 100%;
`;

const Select = styled.select`
    align-self: start;
    border-radius: 30px;
    background-color: #d9d9d9;
    text-align: center;
    color: #000000;
    padding: 14px;
    max-width: 920px;
    border: none;
    outline: none;
    font-size: 18px;
    width: 100%;
`;

const TaskHeaderTitle = styled.input`
    align-self: start;
    border-radius: 30px;
    background-color: #fff;
    text-align: center;
    color: #000000;
    padding: 14px;
    max-width: 920px;
    border: none;
    outline: none;
    font-size: 18px;
    width: 100%;
`;

const TaskActions = styled.div`
    margin-left: auto;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
`;

// Details.

const TaskDetails = styled.div`
    background-color: #FFFBFB;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: stretch;
    padding: 50px;
    border-radius: 30px;
`;

const Columns = styled.div`
    display: flex;
    flex-direction: row;
`

// Column one.

const ColumnOne = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    gap: 20px;
`;

const TypeRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    white-space: nowrap;
`;

const StatusRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    white-space: nowrap;
`;

const AssigneeRow = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    flex-direction: row;
`;


// Clolumn two.

const ColumnTwo = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    margin-left: auto;
    max-width: 200px;
    gap: 20px;
`;

const DeadlineRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
`;

const CreatedRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
`;

const ProgressRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
`;

//

const Description = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    gap: 20px;
    justify-content: flex-end;
`;

const Task = () => {
    const { id } = useParams();
    const [task, setTask] = useState<TaskInterface | any>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== undefined) {
            setTask(tasksStore.getTask(Number(id!)));
        }
    }, []);

    const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data = {
            status: formData.get('status')?.toString(),
            progress: Number(formData.get('progress')),
        };

        const token = localStorage.getItem('access_token');
        api.updateProgress(token!, data, task?.id).then((response) => {
            if (response.success) {
                tasksStore.deleteTask(task?.id);
                tasksStore.addTask(response.data);
                navigate('/assignee');
            }
        });
    };

    /**
     * Для изменения значений формы.
     */
    const handleChange = (attribute: any, event: any) => {
        const updatedTask = { ...task, [attribute]: event.target.value };
        setTask(updatedTask);

    };
    return (
        <TaskContainer>
            <StyledButtonsComp>
                <ButtonsComp />
            </StyledButtonsComp>
            <TaskContent>
                <Form onSubmit={(event) => handleEdit(event)}>
                    <TaskHeader>
                        <TaskHeaderRow>
                            <TaskHeaderTitle name='title'
                                value={task?.title} placeholder='Название задачи' />
                            <TaskActions>
                                <ButtonWhite onClick={() => navigate('/admin')}>Закрыть</ButtonWhite>
                            </TaskActions>
                        </TaskHeaderRow>
                    </TaskHeader>
                    <TaskDetails>
                        <Columns>
                            <ColumnOne>
                                <TypeRow>
                                    <h2>Тип задачи</h2>
                                    <Input type="text" name='assignee' value={task?.type} />
                                </TypeRow>
                                <StatusRow>
                                    <h2>Статус</h2>
                                    <Select name="status" value={task?.status} onChange={(event) => handleChange('status', event)}>
                                        <option>Создана</option>
                                        <option>В работе</option>
                                        <option>Завершена</option>
                                    </Select>
                                </StatusRow>
                                <AssigneeRow>
                                    <h2>Исполнитель</h2>
                                    <Input type="text" name='assignee' value={task?.assignee?.login} />
                                </AssigneeRow>
                            </ColumnOne>

                            <ColumnTwo>

                                <DeadlineRow>
                                    <h2>Срок выполнения</h2>
                                    <Input type="date" name='deadline' value={task?.deadline?.split('T')[0]} />
                                </DeadlineRow>
                                <CreatedRow>
                                    <h2>Создана</h2>
                                    <Input type="date" name='created' value={task?.created?.split('T')[0]} />
                                </CreatedRow>
                                <ProgressRow>
                                    <h2>Прогресс</h2>
                                    <Select name="progress" value={task?.progress} onChange={(event) => handleChange('progress', event)}>
                                        <option>0</option>
                                        <option>25</option>
                                        <option>50</option>
                                        <option>75</option>
                                        <option>100</option>
                                    </Select>
                                </ProgressRow>
                            </ColumnTwo>

                        </Columns>

                        <Description>
                            <h2>Описание</h2>
                            <TextArea name='description' value={task?.description} placeholder='Введите текст'></TextArea>
                            <Buttons>
                                <ButtonGrey type="submit">Сохранить</ButtonGrey>
                            </Buttons>
                        </Description>
                    </TaskDetails>
                </Form>
            </TaskContent>
        </TaskContainer>
    );
}

export default Task;
