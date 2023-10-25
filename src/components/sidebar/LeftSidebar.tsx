import styled, {css} from 'styled-components';
import {HTMLAttributes} from "react";
import {observer} from "mobx-react-lite";
import {appStore} from "../../data/stores/app.store.ts";

type LeftSidebar = HTMLAttributes<HTMLDivElement> & {};

export const LeftSidebar = observer(() => {
    return (
        <Wrapper isMobile={false} isOpen={appStore.getIsOpenLeftSidebar}>
        </Wrapper>
    );
});

LeftSidebar.displayName = 'LeftSidebar';

const AllCategoriesContent = styled.div.attrs({className: 'all-categories'})`
  overflow-y: auto;
  margin-top: -3.9px;
  overflow-x: hidden;
  height: calc(100% - 55px - 213px);
  border-right: #e7e7e7 2px solid;
  background: var(--color-white);

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 8px;
    border-right: 2px white solid;
  }
`;

const Wrapper = styled.div.attrs({className: 'sidebar-wrapper'})<{
    isMobile: boolean;
    isOpen: boolean;
}>`
  height: 100vh;
  width: 250px;
  overflow: hidden;
  display: block;
  z-index: 3;

  & img {
    -webkit-app-region: no-drag;
    pointer-events: all;
  }

  ${({isOpen}) =>
          !isOpen &&
          css`
            transition: width 1s;
            width: 80px;
          `}

  ${({isOpen}) =>
          isOpen &&
          css`
            transition: width 1s;
          `}
`;
