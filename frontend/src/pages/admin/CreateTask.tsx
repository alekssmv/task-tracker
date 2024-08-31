import styled from 'styled-components';

const TaskCreation = styled.section`
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  font-family: 'Inter', sans-serif;
  color: #000;
  font-weight: 400;
  justify-content: center;
  padding: 50px 80px;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const TaskContainer = styled.div`
  border-radius: 20px;
  background-color: #d9d9d9;
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
  padding: 21px 19px;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const TaskHeader = styled.header`
  display: flex;
  width: 100%;
  gap: 20px;
  font-size: 36px;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-right: 3px;
  }
`;

const TaskTitle = styled.h1`
  align-self: stretch;
  border-radius: 20px;
  background-color: #fff;
  flex-grow: 1;
  flex-basis: auto;
  padding: 10px;
`;

const CloseButton = styled.button`
  align-self: stretch;
  border-radius: 20px;
  background-color: #fff;
  white-space: nowrap;
  padding: 10px;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const TaskForm = styled.form`
  border-radius: 20px;
  background-color: #fffbfb;
  display: flex;
  margin-top: 14px;
  width: 100%;
  flex-direction: column;
  font-size: 32px;
  padding: 19px 0;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FormContent = styled.div`
  z-index: 10;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 23px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding-left: 20px;
  }
`;

const FormRow = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FormGroup = styled.div`
  display: flex;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FormLabel = styled.label`
  align-self: stretch;
  border-radius: 20px;
  padding: 10px;
`;

const FormSelect = styled.select`
  align-self: stretch;
  border-radius: 20px;
  background-color: #d9d9d9;
  padding: 10px;
`;

const FormDate = styled.input`
  align-self: stretch;
  border-radius: 20px;
  background-color: #d9d9d9;
  white-space: nowrap;
  padding: 10px;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const AssigneeGroup = styled.div`
  display: flex;
  margin-top: 20px;
  width: 602px;
  max-width: 100%;
  flex-wrap: wrap;
`;

const AssigneeLabel = styled.label`
  align-self: stretch;
  border-radius: 20px;
  white-space: nowrap;
  padding: 10px;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const AssigneeSelect = styled.select`
  align-self: stretch;
  border-radius: 20px;
  background-color: #d9d9d9;
  flex-grow: 1;
  flex-basis: auto;
  padding: 10px;
`;

const DescriptionLabel = styled.label`
  align-self: start;
  border-radius: 20px;
  background-color: #d9d9d9;
  margin-top: 85px;
  font-size: 36px;
  padding: 10px 9px;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const DescriptionTextarea = styled.textarea`
  flex: 1;
  min-height: 300px;
  font-size: 36px;
  padding: 10px;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-right: 10px;
  }
`;

const FormActions = styled.div`
  align-self: end;
  display: flex;
  width: 388px;
  max-width: 100%;
  gap: 17px;
  white-space: nowrap;
  margin: -5px 20px 0 0;

  @media (max-width: 991px) {
    margin-right: 10px;
    white-space: initial;
  }
`;

const SaveButton = styled.button`
  align-self: stretch;
  border-radius: 20px;
  background-color: #d9d9d9;
  min-height: 60px;
  padding: 11px 10px;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const CancelButton = styled.button`
  align-self: stretch;
  width: 163px;
  border-radius: 20px;
  background-color: #d9d9d9;
  min-height: 60px;
  padding: 11px 10px;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const TaskFormComponent = () => {
  return (
    <TaskCreation>
      <TaskContainer>
        <TaskHeader>
          <TaskTitle>Название задачи</TaskTitle>
          <CloseButton>Закрыть</CloseButton>
        </TaskHeader>
        <TaskForm>
          <FormContent>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="taskType">Тип задачи:</FormLabel>
                <FormSelect id="taskType">
                  <option>Выбрать тип</option>
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="dueDate">Срок выполнения:</FormLabel>
                <FormDate type="date" id="dueDate" placeholder="ДД.ММ.ГГГГ" />
              </FormGroup>
            </FormRow>
            <AssigneeGroup>
              <AssigneeLabel htmlFor="assignee">Исполнитель:</AssigneeLabel>
              <AssigneeSelect id="assignee">
                <option>Выбрать исполнителя</option>
              </AssigneeSelect>
            </AssigneeGroup>
            <DescriptionLabel htmlFor="taskDescription">Описание задачи</DescriptionLabel>
            <DescriptionTextarea id="taskDescription" placeholder="Введите текст"></DescriptionTextarea>
          </FormContent>
          <FormActions>
            <SaveButton type="submit">Сохранить</SaveButton>
            <CancelButton type="button">Отменить</CancelButton>
          </FormActions>
        </TaskForm>
      </TaskContainer>
    </TaskCreation>
  );
};

export default TaskFormComponent;
