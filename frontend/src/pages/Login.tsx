import styled from 'styled-components';
import api from '../utils/Api';
import { FormEvent, useState } from 'react';
import UserStore from '../stores/UserStore';
import { useNavigate } from 'react-router-dom';
import tasksStore from '../stores/TasksStore';

const MainContainer = styled.main`
    border-radius: 20px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
    color: #000;
    padding: 20px;
`;

const UserLabel = styled.h1`
    font-size: 20px;
    align-self: start;
    margin-left: 200px;
    cursor: pointer;
`;

const ErrorMessage = styled.div`
    margin-top: -23px;
    color: red;
`;

const AuthorizationBox = styled.section`
    border-radius: 20px;
    background-color: #d9d9d9;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: right;
    font-size: 36px;
    padding: 30px;
    align-items: center;

    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;

const AuthorizationTitle = styled.h2`
    border-radius: 20px;
    background-color: #fff;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
`;

const Input = styled.input`
    border-radius: 20px;
    padding: 10px;
    text-align: left;
    font-size: 18px;
    border: none;
    &:focus {
        outline: none;
    }
`;

const Button = styled.button`
    width: 100%;
    border-radius: 30px;
    padding: 15px;
    text-align: center;
    border: none;
    cursor: pointer;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
`;

const Authorization = () => {

    const [error, setError] = useState<string | null>(null);
    const [role, setRole] = useState('assignee');

    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const login = form.elements.namedItem('login') as HTMLInputElement;
        const password = form.elements.namedItem('login') as HTMLInputElement;
        if (!login.value && !password.value) {
            setError('Не все поля заполнены.');
            return;
        }

        const response = await api.login(login.value, password.value, role);
        if (response.success === false) {
            setError(response.message);
        }
        localStorage.setItem('access_token', response.access_token);
        UserStore.setLogin(login.value);
        UserStore.setRoles(response.roles);

        if (response.roles === "admin") {
            api.getAdminTasks(localStorage.getItem('access_token')!).then((response) => {
                tasksStore.setTasks(response.data);
                navigate('/admin');
            })
        }
        if (response.roles === "assignee") {
            api.getAssigneeTasks(localStorage.getItem('access_token')!).then((response) => {
                tasksStore.setTasks(response.data);
                navigate('/assignee');
            })
        }
    }
    const handleClick = () => {
        if (role === 'admin') {
            setRole('assignee');
        } else {
            setRole('admin');
        }
    };

    return (
        <MainContainer>
            <UserLabel onClick={handleClick}>{role === 'admin' ? 'Администратор' : 'Пользователь'}</UserLabel>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <AuthorizationBox>
                <AuthorizationTitle>Авторизация</AuthorizationTitle>
                <Form onSubmit={handleSubmit}>
                    <Input type="text" id="login" placeholder="Логин" aria-label="Логин" />
                    <Input type="password" id="password" placeholder="Пароль" aria-label="Пароль" />
                    <Button type="submit">Войти</Button>
                </Form>
            </AuthorizationBox>
        </MainContainer>
    );
};

export default Authorization;
