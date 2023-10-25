import styled, {css} from "styled-components";
import {LeftSidebar} from "../components/sidebar/LeftSidebar.tsx";
import {Header} from "../components/header/Header.tsx";
import {Body} from "../components/body/Body.tsx";
import {JSX, useState} from "react";

export function MainPage() {
    const [bodyContent, setBodyContent] = useState<JSX.Element | null>(null);
    return (
        <>
            <Header/>
            <Wrapper>
                <LeftSidebar setBodyContent={setBodyContent}/>
                <WrapperColumn isMobile={false}>
                    <Body bodyEl={bodyContent}/>
                </WrapperColumn>
            </Wrapper>
        </>

    );
}

MainPage.displayName = 'MainPage';

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