import {observer} from 'mobx-react-lite';
import styled, {css} from 'styled-components';
import {HTMLAttributes, useEffect, useState} from 'react';
import {closeIcon, iconCheckError} from "../../assets/img.ts";
import {DropDownList} from "../drop_down_list/DropDownList.tsx";
import {apiRequest} from "../../api_request/api-request.ts";
import {appStore} from "../../data/stores/app.store.ts";
import InputMask from 'react-input-mask';
import {ModalMessageWindow} from "./ModalMessageWindow.tsx";

type ModalCreateLesson = HTMLAttributes<HTMLDivElement> & {
    setCloseModal: (isClose: boolean) => void;
    numberDayOfTheWeek: number;
    isOkAddNewLesson: (isOk: boolean) => void;
};

export const ModalCreateLesson = observer(
    ({setCloseModal, numberDayOfTheWeek, isOkAddNewLesson}: ModalCreateLesson) => {
        const [isOpenModalMessage, setIsOpenModalMessage] = useState(false);
        const [societys, setSocietys] = useState<{
            id: number,
            name: string
        }[] | null>(null);

        const [employes, setEmployes] = useState<{
            id: number,
            name: string
        }[] | null>(null);

        const [selectedSociety, setSelectedContentSociety] = useState<{
            id: number,
            name: string
        } | null>(null);

        const [selectedTeacher, setSelectedContentTeacher] = useState<{
            id: number,
            name: string
        } | null>(null);

        const dayOfTheWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']

        const [numberRoom, setNumberRoom] = useState(0);
        const [timeStarted, setTimeStarted] = useState('');
        const [isValidTimeStarted, setIsValidTimeStarted] = useState(true);

        useEffect(() => {
            (async () => {
                const array = await apiRequest.getAllSocietys(appStore.getUserInfo?.id!);

                if (!array) return;

                const newArray = array.map(item => {
                    return {id: item.id, name: item.name};
                });
                setSocietys(newArray);
            })();

            (async () => {
                const array = await apiRequest.getAllEmployee();

                if (!array) return;

                const newArray = array.map(item => {
                    return {id: item.id, name: `${item.first_name} ${item.last_name} ${item.surname}`};
                });
                setEmployes(newArray);
            })();
        }, []);

        useEffect(() => {
            isValidTime(timeStarted);
        }, [timeStarted]);

        const isValidTime = (time: string) => {
            const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

            if (timePattern.test(time)) {

                const [hours, minutes] = time.split(":");

                const hoursNum = parseInt(hours, 10);
                const minutesNum = parseInt(minutes, 10);

                if (hoursNum >= 0 && hoursNum <= 23 && minutesNum >= 0 && minutesNum <= 59) {
                    setIsValidTimeStarted(true);
                    return;
                }
            }

            setIsValidTimeStarted(false);
        }

        const createLessons = async () => {
            if (!selectedSociety || !selectedTeacher
                || !isValidTimeStarted || numberRoom == 0) {
                setIsOpenModalMessage(true);
                return;
            }

            const isOk = await apiRequest.createLesson({
                room_number: numberRoom,
                start_date: timeStarted,
                week_day: numberDayOfTheWeek,
                employee_id: selectedTeacher.id,
                society_id: selectedSociety.id
            });

            if (!isOk) {
                setIsOpenModalMessage(true);
                return;
            }

            setCloseModal(false);
            isOkAddNewLesson(true);
        };

        return (
            <>
                <Wrapper>
                    <WrapperBody>
                        <BodyModal>
                            <Title>
                                <span>Добавление нового занятия на {dayOfTheWeek[numberDayOfTheWeek - 1]}</span>
                                <img src={closeIcon} onClick={() => setCloseModal(false)} alt=""/>
                            </Title>
                            <WrapperPadding>
                                <WrapperContent>
                                    <WrapperInput isFixedWidth={true}>
                                        <InputName placeholder="Номер кабинета"
                                                   type='number'
                                                   value={numberRoom}
                                                   onChange={(e) => setNumberRoom(parseInt(e.target.value))}/>
                                        <DownInputSpan>Номер кабинета</DownInputSpan>
                                    </WrapperInput>
                                    <WrapperInput isFixedWidth={true}>
                                        <InputMaskK
                                            mask="99:99"
                                            maskPlaceholder="XX:XX"
                                            placeholder="XX:XX"
                                            value={timeStarted}
                                            {...{isValid: isValidTimeStarted}}
                                            onChange={(e) => setTimeStarted(e.target.value)}
                                        />
                                        <DownInputSpan>Время начала</DownInputSpan>
                                    </WrapperInput>
                                </WrapperContent>

                                <DropDownList contents={societys} textInit={'Выберите кружок'}
                                              setContents={setSelectedContentSociety}/>
                                <DownInputSpan>Кружок</DownInputSpan>

                                <DropDownList contents={employes} textInit={'Выберите преподавателя'}
                                              setContents={setSelectedContentTeacher}/>
                                <DownInputSpan>Время начала</DownInputSpan>
                                <WrapperInput>
                                    <ButtonWrapper>
                                        <Btn onClick={() => setCloseModal(false)}>
                                            <span>Отмена</span>
                                        </Btn>
                                        <Btn>
                                            <span onClick={() => createLessons()}>Добавить</span>
                                        </Btn>
                                    </ButtonWrapper>
                                </WrapperInput>

                            </WrapperPadding>

                        </BodyModal>
                    </WrapperBody>
                </Wrapper>
                {isOpenModalMessage &&
                    <ModalMessageWindow setCloseModal={setIsOpenModalMessage}
                                        message={"Ошибка при создании. Попробуйте заполнить все поля."}
                                        icon={iconCheckError}
                                        isOpenModalMessage={true}/>
                }
            </>
        );
    }
);

ModalCreateLesson.displayName = 'ModalCreateLesson';

const WrapperContent = styled.div.attrs({className: 'wrapper-content'})`
  padding: 20px 10px 20px 10px;
  display: flex;
  gap: 5px;
`;

const WrapperInput = styled.div<{
    isFixedWidth?: boolean
}>`

  ${({isFixedWidth}) => isFixedWidth && css`
    width: 90%;
  `}
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

const InputName = styled.input.attrs({className: 'input-name'})`
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

const InputMaskK = styled(InputMask)<{
    isValid: boolean
}>`
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

  ${({isValid}) => !isValid && css`
    border: 1px red double;
  `}
`;

const WrapperPadding = styled.div.attrs({className: 'wrapper-padding'})`
  padding: 20px;
`;

const Wrapper = styled.div.attrs({className: 'wrapper-modal-window'})``;


const DownInputSpan = styled.span.attrs({className: 'down-input-span'})`
  font-size: 12px;
  margin-left: 15px;
`;

const WrapperBody = styled.div.attrs({className: 'modal-wrapper-body'})`
  position: relative;
  top: 10%;
`;

const BodyModal = styled.div.attrs({className: 'body-modal'})`
  background-color: var(--color-white);
  width: 30vw;
  height: fit-content;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div.attrs({className: 'title-modal'})``;