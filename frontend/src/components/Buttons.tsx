import styled from "styled-components";
import userStore from "../stores/UserStore";
import { useNavigate } from "react-router-dom";

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ExitButton = styled.button`
    cursor: pointer;
    background-color: #d9d9d9;
    width: 60px;
    height: 60px;
    border-radius: 20px;
    border: none;
    padding: 0;
`;

const TaskIcon = styled.img`
    cursor: pointer;
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 60px;
    border-radius: 20px;
    align-self: start;
`;

const Buttons = () => {
    const navigate = useNavigate();

    const HandleLogout = () => {
        localStorage.removeItem("access_token");
        userStore.setRoles("");
        userStore.setLogin("");
        navigate("/");
    }

    const HandleHome = () => {
        navigate("/" + userStore.getRoles());
    }

    return (
        <ButtonsContainer>
            <TaskIcon onClick={HandleHome} src="/home.svg" alt="" />
            <ExitButton onClick={HandleLogout}>Выйти</ExitButton>
        </ButtonsContainer>
    )
}

export default Buttons;

