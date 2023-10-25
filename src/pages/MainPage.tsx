import styled, {css} from "styled-components";
import {LeftSidebar} from "../components/sidebar/LeftSidebar.tsx";
import {Header} from "../components/header/Header.tsx";
import {Body} from "../components/Body.tsx";

export function MainPage() {
    return (
        <>
            <Header/>
            <Wrapper>
                <LeftSidebar/>
                <WrapperColumn isMobile={false}>
                    <Body/>
                </WrapperColumn>
            </Wrapper>
        </>

    );
}

const Wrapper = styled.div.attrs({className: 'main-wrapper'})`
  display: flex;
  overflow: hidden;
  background: var(--color-background);
`;

const WrapperColumn = styled.div.attrs({className: 'wrapper-column'})<{
    isMobile: boolean;
}>`
  display: block;
  overflow: hidden;
  width: 100%;
  ${({isMobile}) =>
          isMobile &&
          css`
            width: calc(100%);
          `}
`;