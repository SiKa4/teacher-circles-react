import {observer} from "mobx-react-lite";
import styled from "styled-components";

export const Body = observer(() => {
    return (
        <Wrapper></Wrapper>
    );
});

const Wrapper = styled.div.attrs({className: 'wrapper-body'})<{}>`
  background: var(--color-white);
  width: calc(100% - 15px);
  height: calc(100vh - 70px);
  border-radius: 20px;
  box-shadow: 5px 5px 5px #cecece;
`;

