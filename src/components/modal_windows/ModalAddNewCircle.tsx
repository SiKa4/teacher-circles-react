import {observer} from 'mobx-react-lite';
import styled from 'styled-components';
import {HTMLAttributes, useState} from 'react';
import {closeIcon, iconCheckError} from "../../assets/img.ts";
import {ModalMessageWindow} from "./ModalMessageWindow.tsx";
import {apiRequest} from "../../api_request/api-request.ts";
import {strings} from "../../assets/strings/strings.ts";

type ModalAddNewCircle = HTMLAttributes<HTMLDivElement> & {
    setCloseModal: (isClose: boolean) => void;
    isOkAddNewCircle: (isOk: boolean) => void;
};

export const ModalAddNewCircle = observer(
    ({setCloseModal, isOkAddNewCircle}: ModalAddNewCircle) => {
        const [isOpenModalMessage, setIsOpenModalMessage] = useState(false);

        const [name, setName] = useState('');
        const [hours, setHourcs] = useState(0);

        const addNewEmployee = async () => {
            if (name == '' || !hours || hours == 0) {
                setIsOpenModalMessage(true);
                return;
            }

            const isCreateEmloyee = await apiRequest.addNewSociety({
                name: name,
                hours_number: hours,
            })

            if (!isCreateEmloyee) {
                setIsOpenModalMessage(true);
                return;
            }

            setCloseModal(false);
            isOkAddNewCircle(true);
        };

        return (
            <>
                <Wrapper>
                    <WrapperBody>
                        <BodyModal>
                            <Title>
                                <span>Добавление нового кружка</span>
                                <img src={closeIcon} onClick={() => setCloseModal(false)} alt=""/>
                            </Title>
                            <WrapperContent>
                                <WrapperInput>
                                    <InputName placeholder="Наименование" value={name}
                                               onChange={(e) => setName(e.target.value)}/>
                                    <DownInputSpan>Наименование</DownInputSpan>
                                </WrapperInput>
                                <WrapperInput>
                                    <InputName placeholder="Кол-во часов" value={hours} type='number'
                                               onChange={(e) => setHourcs(parseInt(e.target.value))}/>
                                    <DownInputSpan>Кол-во часов</DownInputSpan>
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
                    <ModalMessageWindow setCloseModal={setIsOpenModalMessage} message={strings.errorAddCircle}
                                        icon={iconCheckError}
                                        isOpenModalMessage={true}/>}
            </>

        );
    }
);

ModalAddNewCircle.displayName = 'ModalAddNewEmployeeWindow';

const WrapperContent = styled.div.attrs({className: 'wrapper-content'})`
  padding: 20px 30px 20px 10px;
  display: flex;
  gap: 30px;
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
  width: 100%;
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
  position: fixed;
  right: 25vw;
  top: 25vh;
`;

const BodyModal = styled.div.attrs({className: 'body-modal'})`
  background-color: var(--color-white);
  width: 35vw;
  height: fit-content;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div.attrs({className: 'title-modal'})``;