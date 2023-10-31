import {observer} from "mobx-react-lite";
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import styled, {css} from "styled-components";
import {useEffect, useState} from "react";
import {apiRequest} from "../../../api_request/api-request.ts";


export const MainBody = observer(() => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const [statistics, setStatistics] = useState<{
        totalVisits: number,
        totalAbsent: number,
        totalLessons: number,
        totalSocieties: number,
        totalTeachers: number,
        attendancePercent: number,
        absentPercent: number
    } | null>(null);

    useEffect(() => {
        getStatisctics();
    }, []);

    const getStatisctics = async () => {
        const data = await apiRequest.GetStatistics();
        setStatistics(data);
    }

    const dataAbsentAndVisits = {
        labels: ['Прогулы (Кол-во)', 'Пришедшие (Кол-во)'],
        datasets: [
            {
                data: [statistics?.totalAbsent, statistics?.totalVisits],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };

    const dataPercentAbsentAndVisits = {
        labels: ['Прогулы (% прогулов)', 'Пришедшие (% пришедших)'],
        datasets: [
            {
                data: [statistics?.absentPercent, statistics?.attendancePercent],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };

    return (
        <Wrapper>
            <DivDiagramWrapper isDiagram={true}>
                <Pie data={dataAbsentAndVisits}/>
                <DivDiagramWrapper style={{margin: '20px'}}>
                    <DownInputSpan>Кол-во прогулов в количестве</DownInputSpan>
                </DivDiagramWrapper>
            </DivDiagramWrapper>
            <div style={{display: "flex", flexDirection: "column", gap: '20px'}}>
                <DivDiagramWrapper>
                    <SpanTime>Кол-во преподавателей : {statistics?.totalTeachers} чел.</SpanTime>
                </DivDiagramWrapper>
                <DivDiagramWrapper>
                    <SpanTime>Кол-во уроков : {statistics?.totalLessons} шт.</SpanTime>
                </DivDiagramWrapper>
                <DivDiagramWrapper>
                    <SpanTime>Кол-во кружков : {statistics?.totalSocieties} шт.</SpanTime>
                </DivDiagramWrapper>
            </div>
            <DivDiagramWrapper isDiagram={true}>
                <Pie data={dataPercentAbsentAndVisits}/>
                <DivDiagramWrapper style={{margin: '20px'}}>
                    <DownInputSpan>Кол-во прогулов в процентах</DownInputSpan>
                </DivDiagramWrapper>
            </DivDiagramWrapper>
        </Wrapper>
    );
});

MainBody.displayName = 'MainBody';

const Wrapper = styled.div.attrs({className: 'wrapper'})`
  width: 90%;
  display: flex;
  height: fit-content;
  padding: 20px;
  gap: 40px;
  justify-content: center;
`;

const SpanTime = styled.span.attrs({className: 'span-time'})`
  padding: 20px;
  line-height: 40px;
  font-size: 18px;
  font-weight: 500;
  color: var(--primary-btn);
  text-align: center;
`;

const DownInputSpan = styled.span.attrs({className: 'down-input-span'})`
  font-size: 16px;
  color: var(--primary-btn);
`;

const DivDiagramWrapper = styled.div.attrs({className: 'div-diagram-wrapper'})<{ isDiagram?: boolean }>`
  border-radius: 20px;
  border: var(--primary-btn) 1px solid;
  ${({isDiagram}) => isDiagram && css`
    min-width: 25%;
    min-height: 25%;
  `}
  
  ${SpanTime} {
    justify-content: center;
    display: flex;
  }
  
  ${DownInputSpan} {
    justify-content: center;
    display: flex;
    padding: 10px;
  }
  
  ${this} {
  }
`;



