import {observer} from "mobx-react-lite";
import {plusIcon} from "../../../assets/img.ts";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {apiRequest} from "../../../api_request/api-request.ts";
import {ModalAddNewEmployeeWindow} from "../../modal_windows/ModalAddNewEmployeeWindow.tsx";

export const EmployeeBody = observer(() => {
    const [isOpenAddNewEmployee, setIsOpenAddNewEmployee] = useState(false);
    const [employees, setEmployees] = useState<{
        first_name: String,
        last_name: String,
        surname: String,
        id: number, id_role: number,
        password: string, username: string
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
                            <TableRow>
                                <TableCell>{x.id}</TableCell>
                                <TableCell>{x.first_name}</TableCell>
                                <TableCell>{x.last_name}</TableCell>
                                <TableCell>{x.surname}</TableCell>
                                <TableCell>{x.username}</TableCell>
                                <TableCell>{x.password}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Wrapper>
            {
                isOpenAddNewEmployee &&
                <ModalAddNewEmployeeWindow setCloseModal={setIsOpenAddNewEmployee} isOpenModal={isOpenAddNewEmployee}/>
            }
        </>

    );
});

EmployeeBody.displayName = 'EmployeeBody';

const Wrapper = styled.div`
  padding-top: 20px;
  width: 100%;
  height: 100%;
`;

const Btn = styled.button.attrs({className: 'btn-primary'})`
  height: 50px;
  width: 50px;
  margin-left: auto;
  margin-right: 20px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 70%;
  margin: 0 auto;
`;

const TableHeader = styled.thead`
  background-color: var(--primary-btn);
  color: #fff;
`;

const TableHeaderCell = styled.th`
  padding: 12px;
  text-align: left;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`

`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;