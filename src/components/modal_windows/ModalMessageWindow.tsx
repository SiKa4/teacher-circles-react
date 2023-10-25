import { observer } from 'mobx-react-lite';
import styled, { css } from 'styled-components';
import { HTMLAttributes, useEffect, useState } from 'react';
import {sleep} from "../../untils/sleep.ts";

type ModalMessageWindow = HTMLAttributes<HTMLDivElement> & {
  setCloseModal: (isClose: boolean) => void;
  message: string;
  icon?: string;
  isOpenModalMessage: boolean;
};

export const ModalMessageWindow = observer(
  ({ message, setCloseModal, icon, isOpenModalMessage }: ModalMessageWindow) => {
    const [isDowning, setIsDowning] = useState<null | boolean>(null);

    useEffect(() => {
      if (isOpenModalMessage) {
        (async () => {
          setIsDowning(true);
          await sleep(1500);
          setIsDowning(false);
          await sleep(1000);
          setCloseModal(false);
        })();
      }
    }, [isOpenModalMessage]);

    return (
      <WrapperBody isDowning={isDowning}>
        <BodyModal>
          {icon != null && <img src={icon} alt=""></img>}
          <Span>{message}</Span>
        </BodyModal>
      </WrapperBody>
    );
  }
);

const WrapperBody = styled.div.attrs({ className: 'modal-wrapper-body' })<{ isDowning: boolean | null }>`
  position: absolute;
  top: -20vh;
  right: 60vw;
  z-index: 1000;
  ${({ isDowning }) =>
    isDowning == true &&
    css`
      transition: top 0.5s ease;
      top: 20vh;
    `}

  ${({ isDowning }) =>
    isDowning == false &&
    css`
      transition: top 0.5s ease;
      top: -20vh;
    `}
`;

ModalMessageWindow.displayName = 'ModalMessageWindow';

const Span = styled.span.attrs({ className: 'span-text' })``;

const BodyModal = styled.div.attrs({ className: 'body-modal' })`
  background-color: var(--color-white);
  width: 22vw;
  position: fixed;
  height: fit-content;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 10px 10px;
  border: #1b1918 1px solid;

  & ${Span} {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    text-align: center;
  }
`;
