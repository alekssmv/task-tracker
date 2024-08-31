import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Api from '../../utils/Api';

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
    resize: none;
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

const AssigneeRow = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    flex-direction: row;
`;

// Clolumn two.

const ColumnTwo = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 200px;
    margin-left: 300px;
    gap: 20px;
`;

const DeadlineRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`;

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
`;

const TaskList = () => {

  const navigate = useNavigate();

  const [assignees, setAssignees] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await Api.getAssignees(localStorage.getItem("access_token")!);
      setAssignees(response);
    }
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      title: formData.get('title')?.toString() || "",
      type: formData.get('type')?.toString() || "",
      assignee_id: formData.get('assignee')?.toString() || "",
      deadline: formData.get('deadline')?.toString() || "",
      description: formData.get('description')?.toString() || ""
    };
    Api.createTask(localStorage.getItem("access_token")!,data);
    navigate(-1);
  };

  return (
    <TaskContainer>
      <TaskIcon src="/home.svg" alt="" />
      <TaskContent>
        <Form onSubmit={handleSubmit}>
          <TaskHeader>
            <TaskHeaderRow>
              <TaskHeaderTitle name='title' placeholder='Название задачи' />
              <TaskActions>
                {/* Возвращаемся на предыдущую страницу */}
                <ButtonWhite onClick={() => navigate(-1)}>Закрыть</ButtonWhite>
              </TaskActions>
            </TaskHeaderRow>
          </TaskHeader>
          <TaskDetails>

            <Columns>
              <ColumnOne>
                <TypeRow>
                  <h2>Тип задачи</h2>
                  <Select name="type">
                    <option value={'Milestone'}>Milestone</option>
                    <option value={'Task'}>Task</option>
                    <option value={'Epic'}>Epic</option>
                  </Select>
                </TypeRow>
                <AssigneeRow>
                  <h2>Исполнитель</h2>
                  <Select name="assignee">
                    {assignees.map((assignee) => (
                      <option value={assignee.id}>{assignee.login}</option>
                    ))}
                  </Select>
                </AssigneeRow>
              </ColumnOne>
              <ColumnTwo>
                <DeadlineRow>
                  <h2>Срок выполнения</h2>
                  <Input type="date" name="deadline" placeholder='20.09.2024' />
                </DeadlineRow>
              </ColumnTwo>
            </Columns>
            <Description>
              <h2>Описание</h2>
              <TextArea name="description" placeholder='Введите текст'></TextArea>
              <Buttons>
                <ButtonGrey type="submit">Сохранить</ButtonGrey>
                {/* Возвращаемся на предыдущую страницу */}
                <ButtonGrey onClick={() => navigate(-1)}>Отменить</ButtonGrey>
              </Buttons>
            </Description>

          </TaskDetails>
        </Form>
      </TaskContent>
    </TaskContainer>
  );
};

export default TaskList;
