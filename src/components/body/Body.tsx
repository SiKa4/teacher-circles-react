import {observer} from "mobx-react-lite";
import styled from "styled-components";
import {HTMLAttributes} from "react";

type Body = HTMLAttributes<HTMLDivElement> & {
    bodyEl: JSX.Element | null
};
export const Body = observer(({bodyEl}: Body) => {
    return (
        <Wrapper>
            {bodyEl && bodyEl}
        </Wrapper>
    );
});

Body.displayName = 'EmployeeBody';

const Wrapper = styled.div.attrs({className: 'wrapper-body'})`
  background: var(--color-white);
  width: calc(100% - 15px);
  height: calc(100vh - 80px);
  border-radius: 20px;
  box-shadow: 5px 5px 5px #cecece;
  margin-top: 10px;
  overflow: auto;
`;

