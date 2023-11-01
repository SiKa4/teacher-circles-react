import {observer} from "mobx-react-lite";
import {EmployeeBody} from "./EmployeeBody.tsx";
import styled from "styled-components";
import {changeIcon, iconCheckError, iconCheckOk, plusIcon, removeBasketIcon} from "../../../assets/img.ts";
import {useEffect, useState} from "react";
import {apiRequest} from "../../../api_request/api-request.ts";
import {ModalMessageWindow} from "../../modal_windows/ModalMessageWindow.tsx";
import {ModalDelete} from "../../modal_windows/ModalAllowDeleteObject.tsx";
import {ModalAddNewStudent} from "../../modal_windows/ModalAddNewStudent.tsx";

export const StudentsBody = observer(() => {
    const [isOpenAddNewStudent, setIsOpenAddNewStudent] = useState(false);
    const [isOpenModalMessage, setIsOpenModalMessage] = useState(false);
    const [messageModelWindow, setMessageModalWindow] = useState('');
    const [iconMessage, setIconMessage] = useState(iconCheckOk);
    const [isOpenModalDelete, setInOpenModalDelete] = useState(false);
    const [selectedIdStudent, setSelectedIdStudent] = useState<number | null>(null);

    const [students, setStudents] = useState<{
        id: number,
        surname: string,
        first_name: string,
        last_name: string,
        birth_date: string
    }[] | null>();

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = async () => {
        setStudents(await apiRequest.getAllStudents());
    };

    const isOkAddNewStudent = (isOk: boolean) => {
        setMessageModalWindow(isOk ? "Ученик успешно добавлен." : "Ученик не был добавлен.");

        setIconMessage(isOk ? iconCheckOk : iconCheckError);

        setIsOpenModalMessage(true);
        getStudents();
    }

    const onClickDeleteStudent = async (idStudent: number) => {
        setSelectedIdStudent(idStudent);
        setInOpenModalDelete(true);
    };

    const callbackDelete = async () => {
        if (!selectedIdStudent) return;

        const isOk = await apiRequest.DeleteStudent(selectedIdStudent);

        await getStudents();

        if (isOk) {
            setMessageModalWindow('Ученик успешно удален.')
            setIconMessage(iconCheckOk);
        } else {
            setMessageModalWindow('Ученик не был удален.')
            setIconMessage(iconCheckError);
        }

        setIsOpenModalMessage(true);
    }

    return (
        <>
            <Wrapper>
                <Btn onClick={() => setIsOpenAddNewStudent(true)}>
                    <img src={plusIcon} alt=""/>
                </Btn>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Id</TableHeaderCell>
                            <TableHeaderCell>Имя</TableHeaderCell>
                            <TableHeaderCell>Фамилия</TableHeaderCell>
                            <TableHeaderCell>Отчество</TableHeaderCell>
                            <TableHeaderCell>Дата рождения</TableHeaderCell>
                            <TableHeaderCell></TableHeaderCell>
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
                                <TableCell><Icon src={changeIcon}/></TableCell>
                                <TableCell onClick={() => onClickDeleteStudent(x.id)}><Icon
                                    src={removeBasketIcon}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Wrapper>
            {isOpenModalMessage &&
                <ModalMessageWindow setCloseModal={setIsOpenModalMessage}
                                    message={messageModelWindow}
                                    icon={iconMessage}
                                    isOpenModalMessage={true}/>
            }
            {
                isOpenModalDelete &&
                <ModalDelete setCloseModal={setInOpenModalDelete} callBackDelete={callbackDelete}/>
            }
            {
                isOpenAddNewStudent &&
                <ModalAddNewStudent setCloseModal={setIsOpenAddNewStudent} isOkAddStudents={isOkAddNewStudent}/>
            }
        </>
    );
});

EmployeeBody.displayName = 'StudentsBody';

const Wrapper = styled.div`
  padding-top: 20px;
  width: 100%;
  height: fit-content;
`;

const Btn = styled.button.attrs({className: 'btn-primary'})`
  height: 50px;
  width: 50px;
  margin-left: auto;
  margin-right: 20px;
  margin-bottom: 10px;
  position: absolute;
  right: 1.5%;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 70%;
  margin: 60px auto 0;
`;

const TableHeader = styled.thead`
  background-color: var(--primary-btn);
  color: #fff;
`;

const TableHeaderCell = styled.th`
  padding: 10px 0px;
  text-align: center;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`

`;

const Icon = styled.img`
  height: 24px;
  width: 24px;
  cursor: pointer;
  border-radius: 50px;
  padding: 13px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background: var(--color-span-background-hover);
  }
`;

const TableCell = styled.td`
  border: 1px solid #ccc;
  text-align: center;
`;