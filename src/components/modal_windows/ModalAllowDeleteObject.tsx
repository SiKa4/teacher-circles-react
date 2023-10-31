import {observer} from 'mobx-react-lite';
import styled, {css} from 'styled-components';
import {HTMLAttributes} from 'react';
import {closeIcon} from "../../assets/img.ts";

type ModalDelete = HTMLAttributes<HTMLDivElement> & {
    setCloseModal: (isClose: boolean) => void;
    callBackDelete: () => void;
};

export const ModalDelete = observer(
    ({setCloseModal, callBackDelete}: ModalDelete) => {
        const deleteObjectFun = () => {
            callBackDelete();
            setCloseModal(false);
        };

        return (
            <Wrapper>
                <WrapperBody>
                    <BodyModal>
                        <Title>
                            <span>Вы уверены что хотите удалить?</span>
                            <img src={closeIcon} alt="" onClick={() => setCloseModal(false)}/>
                        </Title>
                        <WrapperPadding>
                            <WrapperContent>
                                <Span>Вы точно уверены ?</Span>
                                <WrapperInput>
                                    <ButtonWrapper>
                                        <Btn onClick={() => setCloseModal(false)}>
                                            <span>Отмена</span>
                                        </Btn>
                                        <Btn onClick={deleteObjectFun}>
                                            <span>Удалить</span>
                                        </Btn>
                                    </ButtonWrapper>
                                </WrapperInput>
                            </WrapperContent>
                        </WrapperPadding>

                    </BodyModal>
                </WrapperBody>
            </Wrapper>
        );
    }
);

ModalDelete.displayName = 'ModalDelete';

const Wrapper = styled.div.attrs({className: 'wrapper-modal-window'})``;

const WrapperBody = styled.div.attrs({className: 'modal-wrapper-body'})`
  position: fixed;
  top: 15vw;
`;

const WrapperInput = styled.div<{
    isFixedWidth?: boolean
}>`

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
  float: right;
  gap: 30px;
  padding-right: 20px;

  ${Btn}:first-child {
    background-color: var(--disabled-primary-btn);
    color: var(--pressed-primary-btn);
    border: 2px solid #8b8b8b;
    width: 80px;
  }

  ${Btn}:last-child {
    background-color: var(--color-red);

    &:hover {
      background-color: #720000;
    }
`;

const BodyModal = styled.div.attrs({className: 'body-modal'})`
  background-color: var(--color-white);
  width: 30vw;
  height: fit-content;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;

const WrapperPadding = styled.div.attrs({className: 'wrapper-padding'})`
  padding: 20px;
`;


const Title = styled.div.attrs({className: 'title-modal'})``;

const Span = styled.span.attrs({className: 'span-text'})``;
const WrapperContent = styled.div.attrs({className: 'wrapper-content'})`
  & ${Span} {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    text-align: left;
  }

  p {
    margin-top: 5px;
  }
`;
