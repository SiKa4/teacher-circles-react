import styled, {css, keyframes} from "styled-components";
import {FormEvent, useEffect, useState} from "react";
import {strings} from "../assets/strings/strings.ts";
import {iconCheckError, singIn1, singIn2, singIn3} from "../assets/img.ts";
import {ModalMessageWindow} from "../components/modal_windows/ModalMessageWindow.tsx";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {apiRequest} from "../api_request/api-request.ts";

export function Authorization() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isOpenModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const [, setCookie] = useCookies(["user"]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        if (username == "" && password == "") {
            setOpenModal(true);
            return;
        }

        const request = await apiRequest.getUserByLoginPassword(username, password);

        if (!request) {
            setOpenModal(true);
            return;
        }

        navigate("/main", {replace: true});
        setCookie("user", request, { path: "/" });
    };

    return (
        <>
            <ImageContainer key={currentImageIndex} imageUrl={images[currentImageIndex]}/>
            <LoginPage>
                <LoginForm>
                    <Title>{strings.signInSystem}</Title>
                    <Form onSubmit={handleLogin}>
                        <Input
                            type="text"
                            placeholder={strings.login}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder={strings.password}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit">{strings.signIn}</Button>
                    </Form>
                </LoginForm>
            </LoginPage>

            {isOpenModal &&
                <ModalMessageWindow setCloseModal={setOpenModal} message={strings.errorSignIn} icon={iconCheckError}
                                    isOpenModalMessage={true}/>}

        </>
    );
}

const images = [
    singIn1,
    singIn2,
    singIn3
];


const zoomIn = keyframes`
  0% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const ImageContainer = styled.div<{ imageUrl: string }>`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: absolute;
  z-index: -10;

  animation: ${zoomIn} 8s;

  ${({imageUrl}) => imageUrl != '' && css`
    background-image: url(${imageUrl});
  `}
`;

const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--colors-dark-transparent);
`;

const LoginForm = styled.div`
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.8);
  width: 300px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 26px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button.attrs({className: "btn-primary"})`
  width: 50%;
  margin-top: 10px;
  margin-right: auto;
  margin-left: auto;
  min-height: 40px;

`;