import {observer} from 'mobx-react-lite';
import styled from 'styled-components';
import {HTMLAttributes, useState} from 'react';
import {closeIcon, iconCheckError} from "../../assets/img.ts";
import {ModalMessageWindow} from "./ModalMessageWindow.tsx";
import {apiRequest} from "../../api_request/api-request.ts";
import {strings} from "../../assets/strings/strings.ts";

type ModalAddNewEmployeeWindow = HTMLAttributes<HTMLDivElement> & {
    setCloseModal: (isClose: boolean) => void;
    isOkAddEmployee: (isOk: boolean) => void;
};

export const ModalAddNewEmployeeWindow = observer(
    ({setCloseModal, isOkAddEmployee}: ModalAddNewEmployeeWindow) => {
        const [isOpenModalMessage, setIsOpenModalMessage] = useState(false);

        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [surname, setSurname] = useState('');
        const [login, setLogin] = useState('');
        const [password, setPassword] = useState('');

        const addNewEmployee = async () => {
            if (firstName == '' || lastName == '' || surname == '' || login == '' || password == '') {
                setIsOpenModalMessage(true);
                return;
            }

            const isCreateEmloyee = await apiRequest.postEmployee({
                username: login,
                password: password,
                surname: surname,
                first_name: firstName,
                last_name: lastName
            })

            if(!isCreateEmloyee) {
                setIsOpenModalMessage(true);
                return;
            }

            setCloseModal(false);
            isOkAddEmployee(true);
        };

        return (
            <>
                <Wrapper>
                    <WrapperBody>
                        <BodyModal>
                            <Title>
                                <span>Добавление нового сотрудника</span>
                                <img src={closeIcon} onClick={() => setCloseModal(false)} alt=""/>
                            </Title>
                            <WrapperContent>
                                <WrapperInput>
                                    <InputName placeholder="Имя" value={firstName}
                                               onChange={(e) => setFirstName(e.target.value)}></InputName>
                                    <DownInputSpan>Имя</DownInputSpan>
                                </WrapperInput>
                                <WrapperInput>
                                    <InputName placeholder="Фамилия" value={lastName}
                                               onChange={(e) => setLastName(e.target.value)}></InputName>
                                    <DownInputSpan>Фамилия</DownInputSpan>
                                </WrapperInput>
                                <WrapperInput>
                                    <InputName placeholder="Отчество" value={surname}
                                               onChange={(e) => setSurname(e.target.value)}></InputName>
                                    <DownInputSpan>Отчество</DownInputSpan>
                                </WrapperInput>
                            </WrapperContent>
                            <WrapperContent>
                                <WrapperInput>
                                    <InputName placeholder="Логин" value={login}
                                               onChange={(e) => setLogin(e.target.value)}></InputName>
                                    <DownInputSpan>Логин</DownInputSpan>
                                </WrapperInput>
                                <WrapperInput>
                                    <InputName placeholder="Пароль" type="password" value={password}
                                               onChange={(e) => setPassword(e.target.value)}></InputName>
                                    <DownInputSpan>Пароль</DownInputSpan>
                                </WrapperInput>
                            </WrapperContent>
                            <WrapperInput>
                                <ButtonWrapper>
                                    <Btn onClick={() => setCloseModal(false)}>
                                        <span>Отмена</span>
                                    </Btn>
                                    <Btn onClick={addNewEmployee}>
                                        <span>Добавить</span>
                                    </Btn>
                                </ButtonWrapper>
                            </WrapperInput>
                        </BodyModal>
                    </WrapperBody>
                </Wrapper>

                {isOpenModalMessage &&
                    <ModalMessageWindow setCloseModal={setIsOpenModalMessage} message={strings.errorAddEmloyee}
                                        icon={iconCheckError}
                                        isOpenModalMessage={true}/>}
            </>

        );
    }
);

ModalAddNewEmployeeWindow.displayName = 'ModalAddNewEmployeeWindow';

const WrapperContent = styled.div.attrs({className: 'wrapper-content'})`
  padding: 20px 10px 20px 10px;
  display: flex;
  gap: 5px;
  object-fit: contain;
`;

const WrapperInput = styled.div`
`;

const Btn = styled.button.attrs({className: 'btn-primary'})`
  height: 40px;
  width: 100px;
  margin-left: auto;
  margin-right: -20px;
  margin-top: 10px;
  border-radius: 10px;

  span {
    font-size: 16px;
  }
`;

const ButtonWrapper = styled.div.attrs({className: 'buttons-wrapper'})`
  display: flex;
  margin-bottom: 10px;
  margin-right: 30px;
  margin-top: -10px;
  float: right;
  gap: 40px;

  ${Btn}:first-child {
    background-color: var(--disabled-primary-btn);
    color: var(--pressed-primary-btn);
    border: 2px solid #8b8b8b;
    width: 80px;
  }
`;

const Wrapper = styled.div.attrs({className: 'wrapper-modal-window'})``;

const InputName = styled.input.attrs({className: 'input-name'})`
  padding: 9px 10px;
  border: 1px #79747e double;
  height: 35px;
  width: 80%;
  background: #f6f6f8;
  border-radius: 5px;
  text-indent: 5px;
  font-weight: 400;
  font-size: 16px;
  margin: auto;
  display: block;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--pressed-primary-btn);
  }
`;


const DownInputSpan = styled.span.attrs({className: 'down-input-span'})`
  font-size: 12px;
  margin-left: 15px;
`;

const WrapperBody = styled.div.attrs({className: 'modal-wrapper-body'})`
  position: relative;
  top: 25%;
`;

const BodyModal = styled.div.attrs({className: 'body-modal'})`
  background-color: var(--color-white);
  width: 40vw;
  height: fit-content;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div.attrs({className: 'title-modal'})``;