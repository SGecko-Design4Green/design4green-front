import React, { useMemo, useState } from 'react';
import { Box, Flex } from "rebass";
import { QueryStatus, useQuery } from 'react-query';
import { useTable } from 'react-table'
import { scoreService, ScoreInfo, Score } from '../services/score-service';

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
            <div>Selected tab: {tab}</div>
            <div>
                <span onClick={handleTabClick}>{Tab.ASIDE}</span><span onClick={handleTabClick}>{Tab.INNER}</span>
            </div>
            {tab === Tab.ASIDE
                ? <ComparisonTable scoreInfo={scoreInfo.asideInformation} />
                : <ComparisonTable scoreInfo={scoreInfo.innerInformation} />
            }

        </>
    )

}



function ComparisonTable({ scoreInfo }: { scoreInfo: Record<string, Score> }) {

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
        <table {...getTableProps()}>
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
