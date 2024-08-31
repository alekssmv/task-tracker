import React from 'react';
import styled from 'styled-components';

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
    padding: 50px 75px;
`;

const UserLabel = styled.h1`
    font-size: 20px;
    align-self: start;
    margin-top: 40px;
`;

const AuthorizationBox = styled.section`
    border-radius: 20px;
    background-color: #d9d9d9;
    display: flex;
    flex-direction: column;
    justify-content: right;
    font-size: 36px;
    width: 500px;
    padding: 131px 80px;
`;

const AuthorizationTitle = styled.h2`
    border-radius: 20px;
    font-size: 24px;
    background-color: #fff;
    padding: 10px;
`;

const Field = styled.div`
    border-radius: 20px;
    background-color: #fff;
    color: rgba(255, 255, 255, 0.4);
    padding: 10px;
`;

const LoginField = styled(Field)`
    margin-top: 60px;
`;

const PasswordField = styled(Field)`
    margin-top: 24px;
`;

const ButtonField = styled(Field)`
    margin-top: 60px;
    margin-left: auto;
    width: 80px;
    text-align: left;
`;

const Input = styled.input`
    width: 100%;
    text-align: left;
    background-color: transparent;
    font-size: 24px;
    border: none;
    &:focus {
        outline: none;
    }
`;

const Button = styled.button`
    ${Input};
    align-self: flex-end;
    cursor: pointer;
`;

const Authorization: React.FC = () => {
    return (
        <MainContainer>
            <UserLabel>Админ</UserLabel>
            <AuthorizationBox>
                <AuthorizationTitle>Авторизация</AuthorizationTitle>
                <form>
                    <LoginField>
                        <Input type="text" id="login" placeholder="Логин" aria-label="Логин" />
                    </LoginField>
                    <PasswordField>
                        <Input type="password" id="password" placeholder="Пароль" aria-label="Пароль" />
                    </PasswordField>
                    <ButtonField>
                        <Button type="submit">Войти</Button>
                    </ButtonField>
                </form>
            </AuthorizationBox>
        </MainContainer>
    );
};

export default Authorization;
