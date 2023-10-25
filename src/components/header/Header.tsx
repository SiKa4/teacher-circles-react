import {observer} from "mobx-react-lite";
import styled, {css} from "styled-components";
import {hamburgerIcon} from "../../assets/img.ts";
import {appStore} from "../../data/stores/app.store.ts";


export const Header = observer(() => {
    return (
        <HeaderS>
            <HamburgerIcon isOpen={appStore.getIsOpenLeftSidebar} src={hamburgerIcon} alt=""
                           onClick={() => appStore.setIsOpenLeftSidebar()}/>
        </HeaderS>
    );
});


const HamburgerIcon = styled.img.attrs({className: 'hamburger-icon'})<{ isOpen: boolean }>`
  height: 24px;
  width: 24px;
  cursor: pointer;
  transition: transform 0.5s ease, all 0.5s ease-out;;
  filter: invert(1);
  background: #242424;
  border-radius: 50px;
  padding: 13px;


  &:hover {
    background: #545454;
  }

  ${({isOpen}) =>
          !isOpen &&
          css`
            transform: rotate(90deg);
          `}

  ${({isOpen}) =>
          isOpen &&
          css`
            transform: rotate(0deg);
          `}
  z-index: 0;
  position: absolute;
  margin-left: 15px;
  margin-top: 10px;
`;

const HeaderS = styled.div.attrs({className: 'header'})`
  height: 56px;
  align-items: center;
  display: flex;
  background-color: transparent;
  background: var(--color-background);

  img {
    user-select: none;
  }
`;