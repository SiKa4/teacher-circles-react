import {observer} from "mobx-react-lite";
import styled from "styled-components";
import {iconCheckOk, plusIcon} from "../../../assets/img.ts";
import {ModalMessageWindow} from "../../modal_windows/ModalMessageWindow.tsx";
import {useState} from "react";
import {ModalCreateLesson} from "../../modal_windows/ModalCreateLesson.tsx";

export const ScheduleBody = observer(() => {
    const [isOpenModalMessage, setIsOpenModalMessage] = useState(false);
    const [isOpenModalCreateLesson, setIsOpenModalCreateLesson] = useState(false);
    const [messageModelWindow, setMessageModalWindow] = useState('');

    const [numberDayOfTheWeek, setNumberDayOfTheWeek] = useState(0);

    const dayOfTheWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

    const onClickAddLesson = (index: number) => {
        setNumberDayOfTheWeek(index);
        setIsOpenModalCreateLesson(true);
    };

    const addNewLessonCallback = (isOk: boolean) => {

    }

    return (
        <>
            <Wrapper>
                <WrapperContent>
                    {
                        dayOfTheWeek.map((x, i) => (
                            <DayOfTheWeek key={i}>
                                <DivWeekWrapper>
                                    <SpanTextWeek>{x}</SpanTextWeek>
                                </DivWeekWrapper>
                                <DivWeekWrapper onClick={() => onClickAddLesson(i + 1)}>
                                    <Icon src={plusIcon}/>
                                </DivWeekWrapper>
                            </DayOfTheWeek>
                        ))
                    }

                </WrapperContent>
            </Wrapper>
            {isOpenModalMessage &&
                <ModalMessageWindow setCloseModal={setIsOpenModalMessage}
                                    message={messageModelWindow}
                                    icon={iconCheckOk}
                                    isOpenModalMessage={true}/>
            }
            {
                isOpenModalCreateLesson &&
                <ModalCreateLesson setCloseModal={setIsOpenModalCreateLesson}
                                   numberDayOfTheWeek={numberDayOfTheWeek}
                                   isOkAddNewLesson={addNewLessonCallback}/>
            }
        </>
    );
});

ScheduleBody.displayName = 'ScheduleBody';

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 20px;
`;

const DivWeekWrapper = styled.div.attrs({className: 'div-week-wrapper'})`
  background-color: var(--primary-btn);
  min-width: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transition: all 0.5s ease-out;
`;

const DayOfTheWeek = styled.div.attrs({className: 'day-of-the-week'})`
  border-radius: 20px;
  border: var(--primary-btn) 1px solid;
  min-width: 220px;
  color: white;

  ${DivWeekWrapper}:last-child {
    border-radius: 0 0 20px 20px;

    &:hover {
      background: var(--hover-primary-btn);
      cursor: pointer;
    }

    &:active {
      background: var(--pressed-primary-btn);
    }
  }
`;

const Icon = styled.img`
  height: 24px;
  width: 24px;
  cursor: pointer;
  border-radius: 50px;
  padding: 13px;
`;


const WrapperContent = styled.div.attrs({className: 'wrapper-content'})`
  display: flex;
  gap: 2vw;
`;


const SpanTextWeek = styled.span.attrs({className: 'span-text-week'})`
`;