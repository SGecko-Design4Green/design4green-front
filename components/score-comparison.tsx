import React, { useEffect, useMemo, useRef, useState } from 'react';
import { QueryStatus, useQuery } from 'react-query';
import { useTable } from 'react-table'
import { scoreService, ScoreInfo, Score } from '../services/score-service';
import Button from './presentational/Button';
import { MOBILE_WIDTH } from '../constants/constants';
import { useWindow } from '../contexts/browser-context';

export enum Tab {
    ASIDE = 'Autour de moi',
    INNER = 'Dans moi',
}

export interface CurrentEntityComparisonProps {
    readonly region: string;
    readonly department: string;
    readonly city: string;
    readonly neighbour: string;
}

export function CurrentEntityComparison({ region, department, city, neighbour }: CurrentEntityComparisonProps) {
    if (region) {
        if (department) {
            if (city) {
                if (neighbour) {
                    return <>{/*NeihgbourScoreComparison*/}</>;
                }
                return <>{/*CityScoreComparison*/}</>;
            }
            return <DepartmentScoreComparison />;
        }
        return <RegionScoreComparison />;
    }

    return <></>;
}

export function DepartmentScoreComparison() {
    const [page, setPage] = useState(1);
    const { data: _scoreInfo, status } = useQuery<ScoreInfo>(`score-infos-Loire-Atlantique-page-${page}`, () => scoreService.getDepartmentScore('Loire Atlantique', page));

    const [scoreInfo, setScoreInfo] = useState(_scoreInfo);

    useEffect(() => {
        if (_scoreInfo) {
            setScoreInfo(_scoreInfo);
        }
    }, [_scoreInfo]);

    if (!scoreInfo) {
        return <></>;
    }

    return <ScoreComparison
        scoreInfo={scoreInfo}
        onNextPage={() => setPage(p => p + 1)}
        onPreviousPage={() => setPage(p => p > 2 ? p - 1 : 1)}
        page={page}
        status={status}
    />;
}

export function RegionScoreComparison() {
    const { data: _scoreInfo } = useQuery<ScoreInfo>(`score-infos-Bretagne`, () => scoreService.getRegionScore('Bretagne'));
    const [scoreInfo, setScoreInfo] = useState(_scoreInfo);

    useEffect(() => {
        if (_scoreInfo) {
            setScoreInfo(_scoreInfo);
        }
    }, [_scoreInfo]);


    if (!scoreInfo) {
        return <></>;
    }

    return <ScoreComparison scoreInfo={scoreInfo} />;
}

function ScoreComparison({ scoreInfo, page, onNextPage, onPreviousPage, status }: { scoreInfo: ScoreInfo, page?: number, onNextPage?: () => void, onPreviousPage?: () => void, status: QueryStatus }) {
    const [tab, setTab] = useState<Tab>(Tab.ASIDE);
    const handleTabClick = (event: any) => {
        setTab(event.target.innerText);
    };

    return (
        <>
            <div>
                <Button onClick={handleTabClick}>{Tab.ASIDE}</Button><Button onClick={handleTabClick}>{Tab.INNER}</Button>
            </div>
            <div style={{ overflowX: "auto" }} >
                {tab === Tab.ASIDE
                    ? <ComparisonTable scoreInfo={scoreInfo.asideInformation} />
                    : <ComparisonTable scoreInfo={scoreInfo.innerInformation} />
                }
            </div>
            {
                page && tab === Tab.INNER && <>
                    <div>Page {page}</div>
                    {onPreviousPage && status !== QueryStatus.Loading && <button onClick={() => onPreviousPage()}>Previous</button>}
                    {onNextPage && status !== QueryStatus.Loading && <button onClick={() => onNextPage()}>Next</button>}

                </>
            }

        </>
    )

}



function ComparisonTable({ scoreInfo }: { scoreInfo: Record<string, Score> }) {

    const { innerWidth } = useWindow();
    const isBrowserWidth = innerWidth > MOBILE_WIDTH;

    const columns: any = useMemo(
        () => [
            {
                Header: "Localisation",
                accessor: 'localization'
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



    const data = useMemo(
        () => {
            return Object.entries(scoreInfo)
                .map(([localization, score]) => ({
                    ...score,
                    localization
                }))
        },
        [scoreInfo]
    );


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
