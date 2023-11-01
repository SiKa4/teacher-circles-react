import {observer} from "mobx-react-lite";
import {HTMLAttributes, useEffect, useState} from "react";
import styled from "styled-components";
import {closeIcon, iconCheckError} from "../../assets/img.ts";
import {apiRequest} from "../../api_request/api-request.ts";
import {ModalMessageWindow} from "./ModalMessageWindow.tsx";

type ModalAddStudentsInLesson = HTMLAttributes<HTMLDivElement> & {
    setCloseModal: (isClose: boolean) => void;
    idCircle: number | null;
    isLesson?: boolean;
};


export const ModalAddStudentsInLesson = observer(
    ({setCloseModal, idCircle, isLesson}: ModalAddStudentsInLesson) => {
        const [isOpenModalMessage, setIsOpenModalMessage] = useState(false);

        const [students, setStudents] = useState<{
            id: number,
            surname: string,
            first_name: string,
            last_name: string,
            birth_date: string
            isInSociety: boolean
        }[] | null>();

        const [studentsLesson, setStudentsLesson] = useState<{
            student: {
                id: number,
                surname: string,
                first_name: string,
                last_name: string,
                birth_date: string,
            }
            isInSociety: boolean
        }[] | null>();

        useEffect(() => {
            if (isLesson) getStudentsInLesson();
            else getStudents();
        }, []);

        const getStudents = async () => {
            if (!idCircle) return;
            setStudents(await apiRequest.GetStudentsSociety(idCircle));
        };

        const getStudentsInLesson = async () => {
            if (!idCircle) return;
            const isOk = await apiRequest.GetStudentsInLesson(idCircle);

            if(!isOk) {
                setCloseModal(false);
                return;
            }

            setStudentsLesson(await apiRequest.GetStudentsInLesson(idCircle));
        };

        const onClickCheckBoxLesson = async (isChecked: boolean, idStudent: number) => {
            if (!studentsLesson || !idCircle) return;

            const student = studentsLesson.find(x => x.student.id == idStudent);

            if (!student) return;
            student.isInSociety = isChecked;

            const newArray = [...studentsLesson];
            newArray[newArray.findIndex(x => x.student.id == idStudent)] = student;

            setStudentsLesson(newArray);
        };

        const onClickSaveVisit = async () => {
            if (!studentsLesson || !idCircle) return;

            const transformedStudents = studentsLesson.map((student) => ({
                studentVisits:
                    {
                        studentId: student.student.id,
                        visit: student.isInSociety ? 1 : 0,
                    },
            }));

            const answer = {lessonId: idCircle, studentVisits: transformedStudents.map(x => x.studentVisits)};

            const isOk = await apiRequest.AddVisit(answer);

            setCloseModal(false);
        };

        const onClickCheckBox = async (isChecked: boolean, idStudent: number) => {
            if (!students || !idCircle) return;

            const body = {
                society_id: idCircle,
                student_id: idStudent
            };

            let isOk;
            if (isChecked) isOk = await apiRequest.AddStydentInSociety(body);
            else isOk = await apiRequest.DeleteStydentInSociety(body);

            if (!isOk) {
                setIsOpenModalMessage(true);
                return;
            }

            const student = students.find(x => x.id == idStudent);

            if (!student) return;
            student.isInSociety = isChecked;

            const newArray = [...students];
            newArray[newArray.findIndex(x => x.id == idStudent)] = student;

            setStudents(newArray);
        };

        return (
            <>
                <Wrapper>
                    <WrapperBody>
                        <BodyModal>
                            <Title>
                                <span>Добавление студентов в кружок</span>
                                <img src={closeIcon} onClick={() => setCloseModal(false)} alt=""/>
                            </Title>
                            <WrapperContent>
                                <div style={{overflow: "auto", height: '30vh'}}>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHeaderCell>Id</TableHeaderCell>
                                                <TableHeaderCell>Имя</TableHeaderCell>
                                                <TableHeaderCell>Фамилия</TableHeaderCell>
                                                <TableHeaderCell>Отчество</TableHeaderCell>
                                                <TableHeaderCell>Дата рождения</TableHeaderCell>
                                                <TableHeaderCell></TableHeaderCell>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {students && students.map((x, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>{x.id}</TableCell>
                                                    <TableCell>{x.first_name}</TableCell>
                                                    <TableCell>{x.last_name}</TableCell>
                                                    <TableCell>{x.surname}</TableCell>
                                                    <TableCell>{x.birth_date}</TableCell>
                                                    <TableCell>
                                                        <CheckBox type='checkbox'
                                                                  checked={x.isInSociety}
                                                                  onClick={(e) =>
                                                                      onClickCheckBox(e.target!.checked! as boolean, x.id)}/>

                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {studentsLesson && studentsLesson.map((x, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>{x.student.id}</TableCell>
                                                    <TableCell>{x.student.first_name}</TableCell>
                                                    <TableCell>{x.student.last_name}</TableCell>
                                                    <TableCell>{x.student.surname}</TableCell>
                                                    <TableCell>{x.student.birth_date}</TableCell>
                                                    <TableCell>
                                                        <CheckBox type='checkbox'
                                                                  checked={x.isInSociety}
                                                                  onClick={(e) =>
                                                                      onClickCheckBoxLesson(e.target!.checked! as boolean, x.student.id)}/>

                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <WrapperInput>
                                    <ButtonWrapper>
                                        <Btn onClick={() => setCloseModal(false)}>
                                            <span>Отмена</span>
                                        </Btn>
                                        {isLesson &&
                                            <Btn onClick={onClickSaveVisit}>
                                                <span>Сохранить</span>
                                            </Btn>}
                                    </ButtonWrapper>
                                </WrapperInput>
                            </WrapperContent>
                        </BodyModal>
                    </WrapperBody>
                </Wrapper>
                {isOpenModalMessage &&
                    <ModalMessageWindow setCloseModal={setIsOpenModalMessage}
                                        message={'Превышено макс. кол-во человек в этом занятии.'}
                                        icon={iconCheckError}
                                        isOpenModalMessage={true}/>}
            </>

        );
    });

ModalAddStudentsInLesson.displayName = 'ModalAddStudentsInLesson';

const Wrapper = styled.div.attrs({className: 'wrapper-modal-window'})``;

const WrapperBody = styled.div.attrs({className: 'modal-wrapper-body'})`
  position: relative;
  top: 10%;
`;

const CheckBox = styled.input`
  display: block;
  margin: 10px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  box-shadow: none;
  outline: none;
  transition: accent-color 0.3s ease-in-out;
  accent-color: var(--primary-btn);
`;


const BodyModal = styled.div.attrs({className: 'body-modal'})`
  background-color: var(--color-white);
  width: 40vw;
  height: 50%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div.attrs({className: 'title-modal'})`
`;

const WrapperContent = styled.div.attrs({className: 'wrapper-content'})`
  padding: 20px 10px 20px 10px;
  display: flex;
  gap: 5px;
  object-fit: contain;
  flex-direction: column;
`;

const WrapperInput = styled.div`
`;

const Btn = styled.button.attrs({className: 'btn-primary'})`
  height: 40px;
  width: 100px;
  border-radius: 10px;
  margin: 30px -20px 0 auto;

  span {
    font-size: 16px;
  }
`;

const ButtonWrapper = styled.div.attrs({className: 'buttons-wrapper'})`
  display: flex;
  margin-right: 30px;
  float: right;
  gap: 40px;

  ${Btn}:first-child {
    background-color: var(--disabled-primary-btn);
    color: var(--pressed-primary-btn);
    border: 2px solid #8b8b8b;
    width: 80px;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 95%;
  margin: 0 auto 0;
`;

const TableHeader = styled.thead`
  background-color: var(--primary-btn);
  color: #fff;
`;

const TableHeaderCell = styled.th`
  padding: 10px 0;
  text-align: center;
`;

const TableBody = styled.tbody`
`;

const TableRow = styled.tr`
`;

const TableCell = styled.td`
  border: 1px solid #ccc;
  text-align: center;

  input {
    align-items: center;
    align-content: center;
    justify-content: center;
  }
`;
