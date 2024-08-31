import styled from 'styled-components';

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
`;

const ButtonGrey = styled.button`
    align-self: stretch;
    border-radius: 30px;
    background-color: #d9d9d9;
    font-size: 18px;
    border: none;
    padding: 15px;
    flex-grow: 1;
    flex-basis: auto;
`;

const TaskIcon = styled.img`
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 60px;
    border-radius: 20px;
    align-self: start;
`;

const TextArea = styled.textarea`
    margin-top: 20px;
    align-self: stretch;
    border-radius: 20px;
    background-color: #d9d9d9;
    text-align: center;
    color: #000000;
    padding: 14px;
    max-width: 920px;
    border: none;
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
    padding: 20px 30px 32px;
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
    margin-left: 500px;
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
    min-width: 500px;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    gap: 20px;
    justify-content: flex-end;
`;

const TaskList = () => {
    return (
        <TaskContainer>
            <TaskIcon src="/home.svg" alt="" />
            <TaskContent>
                <TaskHeader>
                    <TaskHeaderRow>
                        <TaskHeaderTitle placeholder='Название задачи' />
                        <TaskActions>
                            <ButtonWhite>Закрыть</ButtonWhite>
                        </TaskActions>
                    </TaskHeaderRow>
                </TaskHeader>

                <TaskDetails>
                    <Columns>
                        <ColumnOne>
                            <TypeRow>
                                <h2>Тип задачи</h2>

                                <Select>
                                    <option>Тип 1</option>
                                    <option>Тип 2</option>
                                    <option>Тип 3</option>
                                </Select>

                            </TypeRow>
                            <StatusRow>
                                <h2>Статус</h2>
                                <Select>
                                    <option>Тип 1</option>
                                    <option>Тип 2</option>
                                    <option>Тип 3</option>
                                </Select>
                            </StatusRow>
                            <AssigneeRow>
                                <h2>Исполнитель</h2>
                                <Input placeholder='Иванов И.И.' />
                            </AssigneeRow>
                        </ColumnOne>

                        <ColumnTwo>

                            <DeadlineRow>
                                <h2>Срок выполнения</h2>
                                <Input type="date" placeholder='20.09.2024' />
                            </DeadlineRow>
                            <CreatedRow>
                                <h2>Создана</h2>
                                <Input type="date" placeholder='20.09.2024' />
                            </CreatedRow>
                            <ProgressRow>
                                <h2>Прогресс</h2>
                                <Select>
                                    <option>Тип 1</option>
                                    <option>Тип 2</option>
                                    <option>Тип 3</option>
                                </Select>
                            </ProgressRow>
                        </ColumnTwo>

                    </Columns>

                    <Description>
                        <h2>Описание</h2>
                        <TextArea placeholder='Введите текст'></TextArea>
                        <Buttons>
                            <ButtonGrey>Сохранить</ButtonGrey>
                            <ButtonGrey>Удалить</ButtonGrey>
                        </Buttons>
                    </Description>
                </TaskDetails>
            </TaskContent>
        </TaskContainer>
    );
};

export default TaskList;
