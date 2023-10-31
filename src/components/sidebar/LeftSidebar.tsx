import styled, {css} from 'styled-components';
import {HTMLAttributes, JSX, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {appStore} from "../../data/stores/app.store.ts";
import {calendarIcon, employeeIcon, homeIcon, scheduleIcon} from "../../assets/img.ts";
import {EmployeeBody} from "../body/body_pages/EmployeeBody.tsx";
import {MainBody} from "../body/body_pages/MainBody.tsx";
import {CircleBody} from "../body/body_pages/CircleBody.tsx";
import {ScheduleBody} from "../body/body_pages/ScheduleBody.tsx";
import {StudentsBody} from "../body/body_pages/StudentsBody.tsx";

type LeftSidebar = HTMLAttributes<HTMLDivElement> & {
    setBodyContent: (bodyContent: JSX.Element | null) => void;
};

export const LeftSidebar = observer(({setBodyContent}: LeftSidebar) => {
    const [category, setCategory] = useState<{ name: string, icon: string, component: JSX.Element }[] | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const user = appStore.getUserInfo;

    useEffect(() => {
        if (user?.id_role == 1) {
            setCategory([
                {name: 'Главная', icon: homeIcon, component: <MainBody/>},
                {name: 'Сотрудники', icon: employeeIcon, component: <EmployeeBody/>},
                {name: 'Кружки', icon: scheduleIcon, component: <CircleBody/>},
                {name: 'Расписание', icon: calendarIcon, component: <ScheduleBody/>},
            ]);
        } else {
            setCategory([
                {name: 'Расписание', icon: homeIcon, component: <ScheduleBody/>},
                {name: 'Студенты', icon: employeeIcon, component: <StudentsBody/>},
                {name: 'Кружки', icon: scheduleIcon, component: <CircleBody/>}
            ]);
        }
    }, []);

    useEffect(() => {
        setBodyEl();
    }, [category]);

    useEffect(() => {
        setBodyEl();
    }, [selectedIndex]);

    const setBodyEl = () => {
        if (category == null) return;
        setBodyContent(category[selectedIndex].component);
    }

    return (
        <Wrapper isMobile={false} isOpen={appStore.getIsOpenLeftSidebar}>
            {category && category.map((x, i) => (
                <WrapperTextAndIcon key={i} isSelected={selectedIndex == i} onClick={() => setSelectedIndex(i)} isOpenSideBar={appStore.getIsOpenLeftSidebar}>
                    <ImgIcon src={x.icon} alt=''/>
                    <Span>{x.name}</Span>
                </WrapperTextAndIcon>
            ))}
        </Wrapper>
    );
});

LeftSidebar.displayName = 'LeftSidebar';

const WrapperTextAndIcon = styled.div.attrs({className: 'wrapper-text-and-icon'})<{ isSelected: boolean,
    isOpenSideBar: boolean }>`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  line-height: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  transition: width 0.5s ease-in-out, background-color 0.5s ease-in-out;
  width: 170px;
  height: 28px;

  padding: 10px 20px;
  align-content: center;
  align-items: center;
  display: flex;

  &:hover {
    cursor: pointer;
    background: var(--color-span-background-hover);
  }

  ${({isSelected}) => isSelected && css`
    background: var(--color-span-background);
    font-weight: 700;
  `}

  ${({isOpenSideBar}) => !isOpenSideBar && css`
    width: 28px;
    height: 28px;
    border-radius: 50px;
    padding: 10px 10px;
    margin-left: 16px;

    ${ImgIcon} {
      margin-left: 3px;
      margin-right: 25px;
    }
  `}
`;

const Span = styled.span.attrs({className: 'span-text'})`
  color: black;
`;

const ImgIcon = styled.img`
  width: 22px;
  height: 22px;
  margin-bottom: 4px;
  margin-right: 23px;
  margin-left: 10px;
`;

const Wrapper = styled.div.attrs({className: 'sidebar-wrapper'})<{
    isMobile: boolean;
    isOpen: boolean;
}>`
  height: 100vh;
  width: 250px;
  min-width: 250px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  ${WrapperTextAndIcon}:first-child {
    margin-top: 20px;
  }

  & img {
    -webkit-app-region: no-drag;
    pointer-events: all;
  }

  ${({isOpen}) =>
          !isOpen &&
          css`
            transition: width 1s, min-width 1s;
            width: 75px;
            min-width: 75px;
          `}

  ${({isOpen}) =>
          isOpen &&
          css`
            transition: width 1s, min-width 1s;
          `}
`;
