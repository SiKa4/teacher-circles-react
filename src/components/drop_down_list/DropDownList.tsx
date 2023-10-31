import {HTMLAttributes, useState} from "react";
import styled, {css} from "styled-components";

type DropDownList = HTMLAttributes<HTMLDivElement> & {
    contents: { id: number, name: string }[] | null,
    textInit: string,
    setContents: (content: { id: number, name: string }) => void,
};

export const DropDownList = ({ contents, textInit, setContents }: DropDownList) => {
    const [textBtn, setTextBtn] = useState<string>(textInit);
    const [selectedContent, setSelectedContent] = useState<{
        id: number,
        name: string
    } | null>(null);

    const [isOpen, setInOpen] = useState(false);

    const onSelectedDropDownList = (content: {
        id: number,
        name: string
    }) => {
        setInOpen(false);
        setSelectedContent(content);
        setContents(content);
        setTextBtn(content.name);
    };

    return (
        <DropdownContainer>
            <ToggleButton onClick={() => setInOpen(!isOpen)}>{textBtn}</ToggleButton>
            <DropdownList isOpen={isOpen}>
                {
                    contents?.map((x, i) => (
                        <DropdownListItem key={i} onClick={() => onSelectedDropDownList(x)} isSelected={selectedContent?.id == x.id}>{x.name}</DropdownListItem>
                    ))
                }
            </DropdownList>
        </DropdownContainer>
    )
};

DropDownList.displayName = 'DropDownList';

const DropdownContainer = styled.div`
  width: 100%;
`;

const ToggleButton = styled.button`
  border: 1px #79747e solid;
  height: 50px;
  min-width: 100%;
  background: #f6f6f8;
  border-radius: 5px;
  text-indent: 5px;
  font-weight: 400;
  font-size: 16px;
  display: block;
  text-align: left;
  padding-left: 10px;

  &:focus {
    outline: none;
  }
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  position: relative;
  list-style: none;
  margin: 0;
  background-color: #f1f1f1;
  min-width: 90%;
  max-height: ${props => (props.isOpen ? '200px' : '0')};
  overflow: auto;
  transition: max-height 0.3s ease-in-out;
  border: ${props => (props.isOpen ? '#79747e 1px solid' : '0')};
  border-radius: 5px;
  border-top-style: none;
  padding: 0;
`;

const DropdownListItem = styled.li<{isSelected: boolean}>`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: rgb(206, 206, 206);
  }

  &:last-child {
    border-bottom: none;
  }
  
  ${({isSelected}) => isSelected && css`
    background-color: rgb(178, 178, 178);;
  `}
`;