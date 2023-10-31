import {observer} from "mobx-react-lite";
import {changeIcon, iconCheckOk, plusIcon, removeBasketIcon} from "../../../assets/img.ts";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {apiRequest} from "../../../api_request/api-request.ts";
import {ModalAddNewEmployeeWindow} from "../../modal_windows/ModalAddNewEmployeeWindow.tsx";
import {ModalMessageWindow} from "../../modal_windows/ModalMessageWindow.tsx";
import {strings} from "../../../assets/strings/strings.ts";

export const EmployeeBody = observer(() => {
    const [isOpenAddNewEmployee, setIsOpenAddNewEmployee] = useState(false);
    const [isOpenModalMessage, setIsOpenModalMessage] = useState(false);
    const [messageModelWindow, setMessageModalWindow] = useState('');

    const [employees, setEmployees] = useState<{
        first_name: string,
        last_name: string,
        surname: string,
        id: number, id_role: number,
        password: string, username: string,
    }[] | null>(null);

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = async () => {
        const employees = await apiRequest.getAllEmployee();
        setEmployees(employees);
    };

    const onClickAddNewEmployee = () => {
        setIsOpenAddNewEmployee(true);
    };

    const isOkAddEmployee = (isOk: boolean) => {
        if (isOk) setMessageModalWindow(strings.completeAddEmloyee);
        else setMessageModalWindow(strings.errorAddEmloyee);

        setIsOpenModalMessage(true);
        getAllEmployees();
    };

    const onClickDeleteEmployee = async (idEmployee: number) => {
        const isOk = await apiRequest.deleteEmployeByid(idEmployee);

        if (!isOk) setMessageModalWindow(strings.errorDeleteEmployee);
        else setMessageModalWindow(strings.completeAddEmoloyee);

        getAllEmployees();
        setIsOpenModalMessage(true);
    };

    return (
        <>
            <Wrapper>
                <Btn onClick={onClickAddNewEmployee}>
                    <img src={plusIcon} alt=""/>
                </Btn>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Id</TableHeaderCell>
                            <TableHeaderCell>Имя</TableHeaderCell>
                            <TableHeaderCell>Фамилия</TableHeaderCell>
                            <TableHeaderCell>Отчество</TableHeaderCell>
                            <TableHeaderCell>Логин</TableHeaderCell>
                            <TableHeaderCell>Пароль</TableHeaderCell>
                            <TableHeaderCell></TableHeaderCell>
                            <TableHeaderCell></TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees && employees.map((x, i) => (
                            <TableRow key={i}>
                                <TableCell>{x.id}</TableCell>
                                <TableCell>{x.first_name}</TableCell>
                                <TableCell>{x.last_name}</TableCell>
                                <TableCell>{x.surname}</TableCell>
                                <TableCell>{x.username}</TableCell>
                                <TableCell>{x.password}</TableCell>
                                <TableCell><Icon src={changeIcon}/></TableCell>
                                <TableCell><Icon src={removeBasketIcon}
                                                 onClick={() => onClickDeleteEmployee(x.id)}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Wrapper>
            {
                isOpenAddNewEmployee &&
                <ModalAddNewEmployeeWindow setCloseModal={setIsOpenAddNewEmployee}
                                           isOkAddEmployee={isOkAddEmployee}/>
            }
            {isOpenModalMessage &&
                <ModalMessageWindow setCloseModal={setIsOpenModalMessage} message={messageModelWindow}
                                    icon={iconCheckOk}
                                    isOpenModalMessage={true}/>}
        </>

    );
});

EmployeeBody.displayName = 'EmployeeBody';

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

  &:hover {
    background: var(--color-span-background-hover);
  }
`;

const TableCell = styled.td`
  border: 1px solid #ccc;
  text-align: center;
`;