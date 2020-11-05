import { useMemo, useState } from 'react';
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
    return (
        <>
            <div>Selected tab: {tab}</div>
            <div>
                <span onClick={handleTabClick}>{Tab.ASIDE}</span><span onClick={handleTabClick}>{Tab.INNER}</span>
            </div>
            {tab === Tab.ASIDE
                ? <AsideComparisonTable scoreInfo={scoreInfo} status={status} />
                : <InnerComparisonTable scoreInfo={scoreInfo} status={status} />
            }

        </>
    )

}



function InnerComparisonTable({ scoreInfo, status }: { scoreInfo: Record<string, Score>, status: QueryStatus }) {

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

    console.log({ scoreInfo, status });


    if (status !== QueryStatus.Success) {
        return <></>;
    }

    return <>
        <table {...getTableProps()}>
            <thead>
                {// Loop over the header rows
                    headerGroups.map(headerGroup => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {// Loop over the headers in each row
                                headerGroup.headers.map(column => (
                                    // Apply the header cell props
                                    <th {...column.getHeaderProps()}>
                                        {// Render the header
                                            column.render('Header')}
                                    </th>
                                ))}
                        </tr>
                    ))}
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                    rows.map(row => {
                        // Prepare the row for display
                        prepareRow(row)
                        return (
                            // Apply the row props
                            <tr {...row.getRowProps()}>
                                {// Loop over the rows cells
                                    row.cells.map(cell => {
                                        // Apply the cell props
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {// Render the cell contents
                                                    cell.render('Cell')}
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
