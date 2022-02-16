import { useEffect, useState } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import styled from "@emotion/styled";
import Link from "next/link";

// react-table 의 타입 정의가 완벽하게 작동하지 않고 오류를 뿜는다...ㅠ
interface IPropsTable {
  columns: any;
  data: any;
}

const TableLayout = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  border-width: 1px;
  --tw-bg-opacity: 0.25;
  padding: 0.75rem;
  --tw-space-y-reverse: 0;
  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
  --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const TableContainer = styled.table`
  table-layout: auto;
  width: 100%;
  border-collapse: collapse;
  text-indent: 0;
  border-color: inherit;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
`;

const Td = styled.td`
  text-align: center;
`;
const Table = ({ columns, data }: IPropsTable) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    pageCount,
    setPageSize,
    canPreviousPage,
    canNextPage,
  }: any = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination,
  );

  // setPageSize(10);

  return (
    <>
      <TableLayout>
        <TableContainer {...getTableProps()} className="w-full table-auto">
          <thead className="border-b border-gray-700">
            {headerGroups.map((headerGroup: any, idx: number) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                {headerGroup.headers.map((column: any, idx: number) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={idx}
                    className="p-0.75 text-0.875"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <span className="text-0.75 ml-0.5">▼</span>
                        ) : (
                          <span className="text-0.75 ml-0.5">▲</span>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, idx: number) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={idx}
                  className="bg-gray-800 odd:bg-gray-900 bg-opacity-50 text-center"
                >
                  {row.cells.map((cell: any, idx: number) => (
                    <Td key={idx} {...cell.getCellProps()} className="p-0.5">
                      {cell.value == "수정 및 삭제하기" ? (
                        <Link href={`/category/update/${row.cells[0].value}`}>
                          <a>{cell.value}</a>
                        </Link>
                      ) : (
                        cell.render("Cell")
                      )}

                      {/* {cell.render("Cell")} */}
                    </Td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </TableContainer>
      </TableLayout>
      <ButtonContainer>
        <button
          className="h-2 px-0.5 rounded-4 bg-gray-600 hover:bg-gray-700 active:bg-gray-700 text-0.875 font-bold"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          이전
        </button>
        <div className="w-8 text-center text-0.875 font-bold">
          {pageIndex + 1} / {pageOptions.length}
        </div>
        <button
          className="h-2 px-0.5 rounded-4 bg-gray-600 hover:bg-gray-700 active:bg-gray-700 text-0.875 font-bold"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          다음
        </button>

        {/* <div>Go to page:</div>
        <input
          type="number"
          defaultValue={pageIndex + 1 || 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
        /> */}
        {/* <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {pageSizeOptions.map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </ButtonContainer>
    </>
  );
};

export default Table;
