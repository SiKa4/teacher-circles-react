import {observer} from "mobx-react-lite";
import styled, {css} from "styled-components";
import {changeIcon, iconCheckError, iconCheckOk, plusIcon, removeBasketIcon} from "../../../assets/img.ts";
import {ModalMessageWindow} from "../../modal_windows/ModalMessageWindow.tsx";
import {useEffect, useState} from "react";
import {ModalCreateLesson} from "../../modal_windows/ModalCreateLesson.tsx";
import {apiRequest} from "../../../api_request/api-request.ts";
import {appStore} from "../../../data/stores/app.store.ts";
import {ModalDelete} from "../../modal_windows/ModalAllowDeleteObject.tsx";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {ModalAddStudentsInLesson} from "../../modal_windows/ModalAddStudentsInLesson.tsx";

export const ScheduleBody = observer(() => {
    const [isOpenModalMessage, setIsOpenModalMessage] = useState(false);
    const [isOpenModalCreateLesson, setIsOpenModalCreateLesson] = useState(false);
    const [messageModelWindow, setMessageModalWindow] = useState('');
    const [messageIcon, setMessageIcon] = useState(iconCheckOk);
    const [isOpenModalDelete, setInOpenModalDelete] = useState(false);
    const [isOpenModalAddStudentInLesson, setIsOpenModalAddStudentInLesson] = useState(false);

    const [numberDayOfTheWeek, setNumberDayOfTheWeek] = useState(0);

    const dayOfTheWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
    const [lessons, setLessons] = useState<{
        weekDay: number,
        lessons: {
            id: number,
            room_number: number,
            start_date: string,
            week_day: number,
            societyName: string,
            employee_id: number
        }[]
    }[] | null>(null);
    const user = appStore.getUserInfo;
    const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

    useEffect(() => {
        getLessons();
    }, []);

    const getLessons = async () => {
        if (!user) return;
        setLessons(await apiRequest.GetLessons(user.id))
    }

    const onClickAddLesson = (index: number) => {
        setNumberDayOfTheWeek(index);
        setIsOpenModalCreateLesson(true);
    };

    const addNewLessonCallback = (isOk: boolean) => {
        if (isOk) {
            setMessageModalWindow(`Урок успешно создан в ${dayOfTheWeek[numberDayOfTheWeek]}!`);
            setMessageIcon(iconCheckOk);
        } else {
            setMessageModalWindow('Ошибка при создании урока!')
            setMessageIcon(iconCheckError);
        }
        getLessons();
        setIsOpenModalMessage(true);
    }

    const getLessonsInWeekDay = (dayIndex: number) => {
        if (!lessons) return;

        const getLessonsInWeekDay = lessons.find(x => x.weekDay == dayIndex);

        if (!getLessonsInWeekDay) return;

        return getLessonsInWeekDay.lessons;
    }

    const callbackDelete = async () => {
        if (!selectedLesson) return
        await apiRequest.DeleteLesson(selectedLesson);
        await getLessons();
    }

    const onDragEnd = async (result: any) => {
        if (!result.destination) {
            return;
        }

        const weekDay = parseInt(result.destination.droppableId) + 1;
        const lessonDragId = parseInt(result.draggableId);

        await apiRequest.UpdateLesson({week_day: weekDay}, lessonDragId)
        await getLessons();
    };

    const setSelectedLessonId = async (idLesson: number) => {
        setSelectedLesson(idLesson);
        if (user?.id_role != 1) {
            const isOk = await apiRequest.GetStudentsInLesson(idLesson);
            if (isOk) setIsOpenModalAddStudentInLesson(true);
            else callBackMessage(false);
        }
    }

    const callBackMessage = (isOk: boolean) => {
        if(isOk) {
            setMessageModalWindow('Списки присутствующих обновлены.')
            setMessageIcon(iconCheckOk);
            setIsOpenModalMessage(true);
        }
        else {
            setMessageModalWindow('Ошибка. Занятие либо прошло, либо еще не наступило.')
            setMessageIcon(iconCheckError);
        }

        setIsOpenModalMessage(true);
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper>
                    <WrapperContent>
                        {dayOfTheWeek.map((day, dayIndex) => (
                            <Droppable droppableId={`${dayIndex}`} key={dayIndex}
                                       isDropDisabled={!getLessonsInWeekDay(dayIndex + 1)}>
                                {(provided) => (
                                    <DayOfTheWeek ref={provided.innerRef}>
                                        <DivWeekWrapper isBackgroundColor={true}>
                                            <SpanTextWeek>{day}</SpanTextWeek>
                                        </DivWeekWrapper>
                                        <WrapperContentWeek>
                                            {getLessonsInWeekDay(dayIndex + 1) &&
                                                getLessonsInWeekDay(dayIndex + 1)!.map((lesson) => (
                                                    <Draggable
                                                        key={`${lesson.id}`}
                                                        draggableId={`${lesson.id}`}
                                                        index={lesson.id}
                                                        isDragDisabled={user?.id_role != 1}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <DivWeekWrapper
                                                                key={`${lesson.id}`}
                                                                isActiveWeekLesson={user?.id_role != 1 || selectedLesson !== lesson.id}
                                                                onClick={() => setSelectedLessonId(lesson.id)}
                                                                isOpen={selectedLesson === lesson.id}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    cursor: snapshot.isDragging ? 'grabbing' : 'pointer',
                                                                    backgroundColor: snapshot.isDragging ? '#d9d9d9' : '',
                                                                }}
                                                            >
                                                                <SpanName>{lesson.societyName}</SpanName>
                                                                <SpanTime>Время: {lesson.start_date}</SpanTime>
                                                                <SpanRoom>№
                                                                    кабинета: {lesson.room_number}</SpanRoom>
                                                                {user?.id_role == 1 && selectedLesson === lesson.id && (
                                                                    <div style={{display: 'flex', gap: '20px'}}>
                                                                        <Icon src={changeIcon} isHovered={true}/>
                                                                        <Icon src={removeBasketIcon}
                                                                              isHovered={true}
                                                                              onClick={() => setInOpenModalDelete(true)}/>
                                                                    </div>
                                                                )}
                                                            </DivWeekWrapper>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </WrapperContentWeek>
                                        {user?.id_role == 1 &&
                                            <DivWeekWrapper
                                                onClick={() => onClickAddLesson(dayIndex + 1)}
                                                isBackgroundColor={true}
                                                isActive={true}
                                            >
                                                <Icon src={plusIcon}/>
                                            </DivWeekWrapper>
                                        }

                                    </DayOfTheWeek>
                                )}
                            </Droppable>
                        ))}

                    </WrapperContent>
                </Wrapper>
            </DragDropContext>

            {isOpenModalMessage &&
                <ModalMessageWindow setCloseModal={setIsOpenModalMessage}
                                    message={messageModelWindow}
                                    icon={messageIcon}
                                    isOpenModalMessage={true}/>
            }
            {
                isOpenModalCreateLesson &&
                <ModalCreateLesson setCloseModal={setIsOpenModalCreateLesson}
                                   numberDayOfTheWeek={numberDayOfTheWeek}
                                   isOkAddNewLesson={addNewLessonCallback}/>
            }
            {
                isOpenModalDelete &&
                <ModalDelete setCloseModal={setInOpenModalDelete} callBackDelete={callbackDelete}/>
            }
            {
                isOpenModalAddStudentInLesson && selectedLesson &&
                <ModalAddStudentsInLesson setCloseModal={setIsOpenModalAddStudentInLesson} idCircle={selectedLesson}
                                          isLesson={true} callBackMessage={callBackMessage}/>
            }
        </>
    );
});

ScheduleBody.displayName = 'ScheduleBody';

const Wrapper = styled.div`
  width: 90%;
  height: fit-content;
  padding: 20px;
`;

const Icon = styled.img<{
    isHovered?: boolean
}>`
  height: 24px;
  width: 24px;
  cursor: pointer;
  border-radius: 50px;
  padding: 13px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background: ${props => props.isHovered ? 'var(--color-span-background-hover)' : ''};
  }
`;

const DivWeekWrapper = styled.div.attrs({className: 'div-week-wrapper'})<{
    isBackgroundColor?: boolean,
    isActive?: boolean,
    isActiveWeekLesson?: boolean,
    isOpen?: boolean,
}>`
  background-color: ${props => props.isBackgroundColor ? 'var(--primary-btn)' : ''};
  min-width: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 80px;
  min-height: 40px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transition: all 0.5s ease-out;
  border: ${props => props.isBackgroundColor ? '' : 'var(--primary-btn) 0.2px solid'};
  border-radius: ${props => props.isBackgroundColor ? '' : '20px'};
  padding: ${props => props.isBackgroundColor ? '0' : '10px'};
  user-select: none;

  ${({isActive}) => isActive && css`
    border-radius: 0 0 20px 20px;

    &:hover {
      background: var(--hover-primary-btn);
      cursor: pointer;
    }

    &:active {
      background: var(--pressed-primary-btn);
    }
  `}

  ${({isActiveWeekLesson}) => isActiveWeekLesson && css`
    &:hover {
      background: #d9d9d9;
      cursor: pointer;
    }

    &:active {
      background: var(--pressed-primary-btn);
    }
  `}

  ${({isOpen}) => isOpen && css`
    max-height: 120px;
  `}
`;

const WrapperContentWeek = styled.div.attrs({className: 'wrapper-content-week'})`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 250px);
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 2px;
  margin-right: 2px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DayOfTheWeek = styled.div.attrs({className: 'day-of-the-week'})`
  border-radius: 22px;
  border: var(--primary-btn) 2px solid;
  min-width: 220px;
  color: white;
  height: 100%;
  max-height: calc(100vh - 150px);
`;


const WrapperContent = styled.div.attrs({className: 'wrapper-content'})`
  display: flex;
  gap: 2vw;
`;


const SpanTextWeek = styled.span.attrs({className: 'span-text-week'})`
`;


const SpanTime = styled.span.attrs({className: 'span-time'})`
  color: #1B1918;
  font-weight: 600;
`;

const SpanName = styled.span.attrs({className: 'span-name'})`
  color: #1B1918;
  font-weight: 500;
`;

const SpanRoom = styled.span.attrs({className: 'span-room'})`
  color: #1B1918;
  font-weight: 400;
`;