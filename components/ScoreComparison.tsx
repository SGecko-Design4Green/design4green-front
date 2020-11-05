import React, { useMemo, useState } from 'react';
import { QueryStatus, useQuery } from 'react-query';
import { Box, Flex } from "rebass";
import { useTable } from 'react-table'
import { scoreService, ScoreInfo, Score } from '../services/score-service';
import Button from './presentational/Button';
import { MOBILE_WIDTH } from '../constants/constants';
import { useWindow } from '../contexts/browser-context';

enum Tab {
    ASIDE = 'Autour de moi',
    INNER = 'Dans moi',
}

export default function ScoreComparison({ }: any) {
    const { data: scoreInfo, status } = useQuery<ScoreInfo>(`score-infos-Bretagne`, () => scoreService.getRegionScore('Bretagne'));
    const [tab, setTab] = useState<Tab>(Tab.ASIDE);

    const handleTabClick = (event: any) => {
        setTab(event.target.innerText);
    };

    if (!scoreInfo || status !== QueryStatus.Success) {
        return <></>;
    }

    return (
        <>
            <div>
                <Button onClick={handleTabClick}>{Tab.ASIDE}</Button><Button onClick={handleTabClick}>{Tab.INNER}</Button>
            </div>
            <div style={{overflowX:"auto"}} >
            {tab === Tab.ASIDE
                ? <ComparisonTable scoreInfo={scoreInfo.asideInformation} />
                : <ComparisonTable scoreInfo={scoreInfo.innerInformation} />
            }
            </div>

        </>
    )

}



function ComparisonTable({ scoreInfo }: { scoreInfo: Record<string, Score> }) {

    const {innerWidth} = useWindow();
    const isBrowserWidth = innerWidth > MOBILE_WIDTH;

    const columns = useMemo(
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
