import React, { useEffect, useMemo, useRef, useState } from 'react';
import { QueryStatus, useQuery } from 'react-query';
import { useTable } from 'react-table'
import { scoreService, ScoreInfo, Score } from '../services/score-service';
import { MOBILE_WIDTH } from '../constants/constants';
import { useWindow } from '../contexts/browser-context';
import { Flex, Box } from 'rebass';
import styles from './score-comparison.module.css'

export enum Tab {
    ASIDE = 'Resultats similaires',
    INNER = `Resultats au sein de ce niveau`,
}

export interface CurrentEntityComparisonProps {
    readonly region: string;
    readonly department: string;
    readonly city: string;
    readonly district: string;
}

export function CurrentEntityComparison({ region, department, city, district }: CurrentEntityComparisonProps) {
    if (region) {
        if (department) {
            if (city) {
                if (district) {
                    return <>{/*NeihgbourScoreComparison*/}</>;
                }
                return <>{/*CityScoreComparison*/}</>;
            }
            return <DepartmentScoreComparison region={region} department={department} />;
        }
        return <RegionScoreComparison region={region} />;
    }

    return <></>;
}

export function DepartmentScoreComparison({region,department}) {
    const [page, setPage] = useState(1);
    const { data: _scoreInfoDepartment } = useQuery<ScoreInfo>(`score-departments-${region}`, () => scoreService.getRegionInScore(region));
    const { data: _scoreInfoInDepartment } = useQuery<ScoreInfo>(`score-in-department-${region}`, () => scoreService.getDeptInScore(department.split(' - ')[0], page));
    const [asideInformation, setAsideInformation] = useState(_scoreInfoDepartment);
    const [insideInformation, setInsideInformation] = useState(_scoreInfoInDepartment);

    useEffect(() => {
        if (_scoreInfoDepartment) {
            setAsideInformation(_scoreInfoDepartment);
        }
        if (_scoreInfoInDepartment) {
            setInsideInformation(_scoreInfoInDepartment);
        }
    }, [_scoreInfoDepartment, _scoreInfoInDepartment]);

    if (!asideInformation || !insideInformation) {
        return <></>;
    }

    return <ScoreComparison
        asideInformation={asideInformation}
        insideInformation={insideInformation}
        onNextPage={() => setPage(p => p + 1)}
        onPreviousPage={() => setPage(p => p > 2 ? p - 1 : 1)}
        page={page}
        filter={department}
    />;
}

export function RegionScoreComparison({region}) {
    const { data: _scoreInfoRegions } = useQuery<ScoreInfo>(`score-regions`, () => scoreService.getRegionsScore());
    const { data: _scoreInfoInRegions } = useQuery<ScoreInfo>(`score-in-regions-${region}`, () => scoreService.getRegionInScore(region));

    const [asideInformation, setAsideInformation] = useState(_scoreInfoRegions);
    const [insideInformation, setInsideInformation] = useState(_scoreInfoInRegions);

    useEffect(() => {
        if (_scoreInfoRegions) {
            setAsideInformation(_scoreInfoRegions);
        }
        if(_scoreInfoInRegions){
            setInsideInformation(_scoreInfoInRegions);
        }
    }, [_scoreInfoRegions, _scoreInfoInRegions]);


    if (!_scoreInfoRegions || !_scoreInfoInRegions) {
        return <></>;
    }

    return <ScoreComparison asideInformation={asideInformation} insideInformation={insideInformation} filter={region} />;
}

function ScoreComparison({ asideInformation, insideInformation, filter, page, onNextPage, onPreviousPage, status = QueryStatus.Idle }: { asideInformation: ScoreInfo, insideInformation: ScoreInfo, filter: string, page?: number, onNextPage?: () => void, onPreviousPage?: () => void, status?: QueryStatus }) {
    const [tab, setTab] = useState<Tab>(Tab.ASIDE);
    const handleTabClick = (event: any) => {
        setTab(event.target.innerText);
    };

    return (
        <>
            <Flex flexDirection="row">
                <Box>
                    <button onClick={handleTabClick} className={styles.tab}>{Tab.ASIDE}</button>
                    <button onClick={handleTabClick} className={styles.tab}>{Tab.INNER}</button>
                </Box>
            </Flex>
            <div style={{ overflowX: "auto" }} >
                {tab === Tab.ASIDE
                    ? <ComparisonTable scoreInfo={asideInformation} filter={filter} />
                    : <ComparisonTable scoreInfo={insideInformation} filter={''} />
                }
            </div>
            {
                page && tab === Tab.INNER && <>
                    <div>Page {page}</div>
                    {onPreviousPage && status !== QueryStatus.Loading && <button className={styles.tab} onClick={() => onPreviousPage()}>Previous</button>}
                    {onNextPage && status !== QueryStatus.Loading && <button className={styles.tab} onClick={() => onNextPage()}>Next</button>}

                </>
            }

        </>
    )

}



function ComparisonTable({ scoreInfo, filter }: { scoreInfo: any, filter: string }) {

    const { innerWidth } = useWindow();
    const isBrowserWidth = innerWidth > MOBILE_WIDTH;

    const columns: any = useMemo(
        () => [
            {
                Header: "Localisation",
                accessor: 'localization'
            },
            {
                Header: "Score gloabam",
                accessor: 'globalScore'
            },
            {
                Header: "Accès à l'information",
                accessor: 'informationAccess'
            },
            {
                Header: "Accès aux interfaces numériques",
                accessor: 'numericInterfacesAccess'
            },
            {
                Header: "Compétences administratives",
                accessor: 'administrativeCompetencies'
            },
            {
                Header: "Compétences numériques",
                accessor: 'numericCompetencies'
            },
        ],
        []
    );

////index/regional/{region}/in

const data = Object.entries(scoreInfo).filter(([key])=>key!==filter).map(([key,value]:[string, any]) => {
    return {
        "localization": key,
        "globalScore": value.global.toFixed(2),
        "informationAccess": value.information_access.global.toFixed(2),
        "numericInterfacesAccess": value.numeric_interfaces_access.global.toFixed(2),
        "administrativeCompetencies": value.administrative_competencies.global.toFixed(2),
        "numericCompetencies": value.numeric_competencies.global.toFixed(2)
    }
});

    const tableInstance = useTable({ columns, data });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return <>
        <table {...getTableProps()} style={{ width: isBrowserWidth ? '65%' : '100%' }}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                        </tr>

                    ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (

                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    </>;
}
