import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {apiRequest} from "../../../api_request/api-request.ts";
import styled from "styled-components";
import {changeIcon, iconCheckError, iconCheckOk, plusIcon, removeBasketIcon} from "../../../assets/img.ts";
import {ModalMessageWindow} from "../../modal_windows/ModalMessageWindow.tsx";
import {ModalAddNewCircle} from "../../modal_windows/ModalAddNewCircle.tsx";
import {strings} from "../../../assets/strings/strings.ts";
import {appStore} from "../../../data/stores/app.store.ts";
import {ModalDelete} from "../../modal_windows/ModalAllowDeleteObject.tsx";
import {ModalAddStudentsInLesson} from "../../modal_windows/ModalAddStudentsInLesson.tsx";

export const CircleBody = observer(() => {
    const [isOpenAddNewCircle, setIsOpenAddNewCircle] = useState(false);
    const [isOpenModalMessage, setIsOpenModalMessage] = useState(false);
    const [messageModelWindow, setMessageModalWindow] = useState('');
    const [isOpenModalDelete, setInOpenModalDelete] = useState(false);

    const [isOpenModalAddStudentInLesson, setIsOpenModalAddStudentInLesson] = useState(false);

    const [selectedIdCircle, setSelectedIdCircle] = useState<number | null>(null);
    const [iconMessage, setIconMessage] = useState(iconCheckOk);
    const user = appStore.getUserInfo;

    const [circle, setCircle] = useState<{
        hoursNumber: number,
        id: number,
        name: string
    }[] | null>(null);

    useEffect(() => {
        getAllCircle();
    }, []);

    const getAllCircle = async () => {
        if (!appStore.getUserInfo) return;

        const circles = await apiRequest.getAllSocietys(appStore.getUserInfo?.id!);
        setCircle(circles);
    };

    const isOkAddNewCircle = (isOk: boolean) => {
        if (isOk) setMessageModalWindow(strings.completeAddCircle);
        else setMessageModalWindow(strings.erroeAddCircle2);

        setIsOpenModalMessage(true);
        getAllCircle();
    }

    const onClickDeleteCircle = (idCircle: number) => {
        setSelectedIdCircle(idCircle);
        setInOpenModalDelete(true);
    }

    const callbackDelete = async () => {
        if (!selectedIdCircle) return
        const isOk = await apiRequest.deleteCircle(selectedIdCircle);
        await getAllCircle();

        if (isOk) {
            setMessageModalWindow('Кружок успешно удален.')
            setIconMessage(iconCheckOk);
        } else {
            setMessageModalWindow('Кружок не был удален.')
            setIconMessage(iconCheckError);
        }
        setIsOpenModalMessage(true);
    };

    const onClickAddStudentsInCircle = (idCircle: number) => {
        setSelectedIdCircle(idCircle);
        setIsOpenModalAddStudentInLesson(true);
    }

    return (
        <>
            <Wrapper>
                {
                    user?.id_role == 1 &&
                    <Btn onClick={() => setIsOpenAddNewCircle(true)}>
                        <img src={plusIcon} alt=""/>
                    </Btn>

                }
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Id</TableHeaderCell>
                            <TableHeaderCell>Наименование</TableHeaderCell>
                            <TableHeaderCell>Кол-во часов</TableHeaderCell>
                            {
                                user?.id_role == 1 &&
                                <>
                                    <TableHeaderCell></TableHeaderCell>
                                </>
                            }
                            <TableHeaderCell></TableHeaderCell>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {circle && circle.map((x, i) => (
                            <TableRow key={i}>
                                <TableCell>{x.id}</TableCell>
                                <TableCell>{x.name}</TableCell>
                                <TableCell>{x.hoursNumber}</TableCell>
                                {
                                    user?.id_role == 1 &&
                                    <>
                                        <TableCell><Icon src={changeIcon}/></TableCell>
                                        <TableCell>
                                            <Icon src={removeBasketIcon}
                                                  onClick={() => onClickDeleteCircle(x.id)}/>
                                        </TableCell>
                                    </>

                                }
                                {user?.id_role != 1 &&
                                    <TableCell>
                                        <Icon src={changeIcon} onClick={() => onClickAddStudentsInCircle(x.id)}/>
                                    </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Wrapper>
            {
                isOpenAddNewCircle &&
                <ModalAddNewCircle setCloseModal={setIsOpenAddNewCircle} isOkAddNewCircle={isOkAddNewCircle}/>
            }
            {isOpenModalMessage &&
                <ModalMessageWindow setCloseModal={setIsOpenModalMessage} message={messageModelWindow}
                                    icon={iconMessage}
                                    isOpenModalMessage={true}/>}
            {
                isOpenModalDelete &&
                <ModalDelete setCloseModal={setInOpenModalDelete} callBackDelete={callbackDelete}/>
            }
            {
                isOpenModalAddStudentInLesson &&
                <ModalAddStudentsInLesson setCloseModal={setIsOpenModalAddStudentInLesson} idCircle={selectedIdCircle} />
            }
        </>
    );
});

CircleBody.displayName = 'CircleBody';

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
  padding: 10px 0;
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