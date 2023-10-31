import {observer} from 'mobx-react-lite';
import styled, {css} from 'styled-components';
import {HTMLAttributes, useEffect, useState} from 'react';
import {sleep} from "../../untils/sleep.ts";
import {closeIcon} from "../../assets/img.ts";

type ModalCreateLesson = HTMLAttributes<HTMLDivElement> & {
    setCloseModal: (isClose: boolean) => void;
    numberDayOfTheWeek: number
};

export const ModalCreateLesson = observer(
    ({setCloseModal, numberDayOfTheWeek}: ModalCreateLesson) => {
        const dayOfTheWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

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
                                        <InputName placeholder="Номер кабинета" type='number'></InputName>
                                        <DownInputSpan>Номер кабинета</DownInputSpan>
                                    </WrapperInput>
                                    <WrapperInput isFixedWidth={true}>
                                        <InputName placeholder="Время начала"></InputName>
                                        <DownInputSpan>Время начала</DownInputSpan>
                                    </WrapperInput>
                                </WrapperContent>

                                <InputNameMaxWidth placeholder="Время начала"/>
                                <DownInputSpan>Время начала</DownInputSpan>

                                <InputNameMaxWidth placeholder="Преподаватель"/>
                                <DownInputSpan>Время начала</DownInputSpan>
                                <WrapperInput>
                                    <ButtonWrapper>
                                        <Btn onClick={() => setCloseModal(false)}>
                                            <span>Отмена</span>
                                        </Btn>
                                        <Btn>
                                            <span>Добавить</span>
                                        </Btn>
                                    </ButtonWrapper>
                                </WrapperInput>

                            </WrapperPadding>

                        </BodyModal>
                    </WrapperBody>
                </Wrapper>
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

const WrapperInput = styled.div<{ isFixedWidth?: boolean }>`

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

const InputNameMaxWidth = styled(InputName)`
  width: 90%;
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
  top: 25%;
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