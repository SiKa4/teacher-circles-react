import {observer} from "mobx-react-lite";
import styled, {css} from "styled-components";
import {exitIconAdd, hamburgerIcon} from "../../assets/img.ts";
import {appStore} from "../../data/stores/app.store.ts";
import {useCookies} from "react-cookie";


export const Header = observer(() => {
    const [, setCookie] = useCookies(["user"]);
    const userInfo = appStore.getUserInfo;

    const logOut = () => {
        setCookie("user", null, {path: "/"});
        appStore.setUserInfo(null);
    }

    return (
        <HeaderS>
            <HamburgerIcon isOpen={appStore.getIsOpenLeftSidebar} src={hamburgerIcon} alt=""
                           onClick={() => appStore.setIsOpenLeftSidebar()}/>
            <DivRight>
                <Span>{userInfo?.first_name} {userInfo?.surname} {userInfo?.last_name}</Span>
                <HamburgerIcon isOpen={true} src={exitIconAdd} alt="" onClick={logOut}/>
            </DivRight>

        </HeaderS>
    );
});

const Span = styled.span.attrs({className: 'span-text'})`
  color: black;
  margin-top: 25px;
  margin-right: 15px;
`;

const HamburgerIcon = styled.img.attrs({className: 'hamburger-icon'})<{ isOpen: boolean }>`
  height: 24px;
  width: 24px;
  cursor: pointer;
  transition: transform 0.5s ease, all 0.5s ease-out;;
  background: #d2d2d2;
  border-radius: 50px;
  padding: 13px;


  &:hover {
    background: #b1b1b1;
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
  margin-top: 10px;
`;

const DivRight = styled.div`
  margin-left: auto;
  margin-right: 17px;
  display: flex;
`;

const HeaderS = styled.div.attrs({className: 'header'})`
  height: 56px;
  align-items: center;
  display: flex;
  background-color: transparent;
  background: var(--color-background);
  padding-left: 17px;

  img {
    user-select: none;
  }
`;