import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {apiRequest} from "../../../api_request/api-request.ts";
import {appStore} from "../../../data/stores/app.store.ts";

export const HistoryBody = observer(() => {
    const [history, setHistory] = useState<{
        history: {
            lesson: {
                id: number,
                room_number: number,
                start_date: string,
                societyName: string,
                latestVisitDate: string
            },
            studentVisits: {
                surname: string,
                first_name: string,
                last_name: string,
                visit: boolean
            }[],
        }[]
    } | null>();
    const user = appStore.getUserInfo;

    useEffect(() => {
        getHistiry();
    }, []);

    const getHistiry = async () => {
        if (!user) return;
        setHistory(await apiRequest.GetHistoryLessons(user!.id));
    };

    return (
        <Wrapper>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Id</TableHeaderCell>
                        <TableHeaderCell>Наименование</TableHeaderCell>
                        <TableHeaderCell>Номер комнаты</TableHeaderCell>
                        <TableHeaderCell>Дата</TableHeaderCell>
                        <TableHeaderCell>Время начала</TableHeaderCell>
                        <TableHeaderCell>Студенты</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {history && history.history.map((x, i) => (
                        <TableRow key={i}>
                            <TableCell>{x.lesson.id}</TableCell>
                            <TableCell>{x.lesson.societyName}</TableCell>
                            <TableCell>{x.lesson.room_number}</TableCell>
                            <TableCell>{x.lesson.latestVisitDate}</TableCell>
                            <TableCell>{x.lesson.start_date}</TableCell>
                            <TableCell>
                                {x.studentVisits.map((x, i) => (
                                    <DivFlex key={i}>
                                        <Span>{x.first_name} {x.last_name} {x.surname}</Span>
                                        <CheckBox type='checkbox'
                                                  checked={x.visit}/>
                                    </DivFlex>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Wrapper>
    );
});

HistoryBody.displayName = 'HistoryBody';

const DivFlex = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  padding-top: 20px;
  width: 100%;
  height: fit-content;
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

const TableCell = styled.td`
  border: 1px solid #ccc;
  text-align: center;
  padding: 10px;
`;

const Span = styled.span`
  width: 80%;
  text-align: left;
`;

const CheckBox = styled.input`
  border-radius: 50%;
  width: 25px;
  height: 25px;
  box-shadow: none;
  outline: none;
  transition: accent-color 0.3s ease-in-out;
  accent-color: var(--primary-btn);
  margin-top: 0;
`;
