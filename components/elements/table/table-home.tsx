/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import TextField from "../text-field";
import Button from "../button";

// react-table 의 타입 정의가 완벽하게 작동하지 않고 오류를 뿜는다...ㅠ
interface IPropsTable {
  data: any;
  size: number;
}

const TableLayout = styled.div`
  width: 100%;
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

const THead = styled.thead`
  border-bottom: 1px black solid;
  color: #71717a;
`;

const Td = styled.td`
  text-align: center;
  border-bottom: 1px lightgray solid;
  padding: 0.5rem 0rem;
  justify-content: center;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Flex2 = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 1rem;
`;
const TBody = styled.tbody`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  border-bottom: 1px lightgray solid;
  /* padding: 0.5rem 0rem; */
`;
const Th = styled.th`
  text-align: center;
`;
const columns = [
  {
    Header: "InDex",
    accessor: "idx",
  },
  {
    Header: "제목",
    accessor: "bo_subject",
  },
  {
    Header: "소제목",
    accessor: "bo_table",
  },
  {
    Header: "수정",
    accessor: "sector",
  },
];
const TableHome = ({ data, size }: IPropsTable) => {
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
  const [state, setState] = useState({
    data: {
      bo_table: "",
      bo_subject: "",
    },
  });
  const router = useRouter();
  const categoryId = router.query.idx;
  const Mode = router.query.mode;

  useEffect(() => {
    if (categoryId) {
      axios.get(`/api2/category/${categoryId}`).then(res => {
        let bo_subject = res.data.result.bo_subject;
        let bo_table = res.data.result.bo_table;
        setState({
          ...state,
          data: { bo_subject: bo_subject, bo_table: bo_table },
        });
      });
    }
    setPageSize(size);
  }, [router]);

  const onClickCategoryEdit = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    await axios.post(`/api2/category/update/${categoryId}`, {
      bo_subject: state.data.bo_subject,
      bo_table: state.data.bo_table,
    });
    router.push("/category");
  };

  const onChangeAccounts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setState({
      ...state,
      data: {
        ...state.data,
        [name]: value,
      },
    });
  };

  const onClickCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await axios.post("/api2/category/create", {
      bo_subject: state.data.bo_subject,
      bo_table: state.data.bo_table,
    });
    router.push("/category");
  };

  const onClickCategoryDel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios.post(`/api2/category/delete/${categoryId}`);
    router.push("/category");
  };

  return (
    <>
      <TableLayout>
        <TableContainer {...getTableProps()} className="w-full table-auto">
          <THead className="border-b border-gray-700">
            {headerGroups.map((headerGroup: any, idx: number) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                {headerGroup.headers.map((column: any, idx: number) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={idx}
                    isButton={"yes"}
                  >
                    {column.Header == `` ? (
                      <Flex>
                        <Button
                          color={"primary"}
                          size={"small"}
                          onClick={() => {
                            router.push("/category?mode=create");
                          }}
                        >
                          추가하기
                        </Button>
                      </Flex>
                    ) : (
                      column.render("Header")
                    )}

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
                  </Th>
                ))}
              </tr>
            ))}
          </THead>

          <TBody {...getTableBodyProps()}>
            {Mode == "create" ? (
              <tr role="row">
                <Td colSpan={7}>
                  <Flex>
                    <Flex2>
                      이름 :
                      <TextField
                        placeholder="카테고리 이름"
                        name="bo_subject"
                        type="text"
                        size="small"
                        width="100%"
                        onChange={onChangeAccounts}
                      />
                    </Flex2>
                    <Flex2>
                      영문 :
                      <TextField
                        placeholder="카테고리 영문"
                        name="bo_table"
                        size="small"
                        onChange={onChangeAccounts}
                      />
                    </Flex2>
                    <Button
                      variants="light"
                      color="primary"
                      size="small"
                      isDisabled={
                        state.data.bo_subject && state.data.bo_table
                          ? false
                          : true
                      }
                      onClick={onClickCategory}
                    >
                      카테고리 생성
                    </Button>
                  </Flex>
                </Td>
              </tr>
            ) : (
              ""
            )}
            {page.map((row: any, idx: number) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={idx}
                  className="bg-gray-800 odd:bg-gray-900 bg-opacity-50 text-center"
                >
                  {row.cells.map((cell: any, idx: number) => (
                    <Td
                      key={idx}
                      {...cell.getCellProps()}
                      className="p-0.5"
                      onClick={() => {}}
                    >
                      {row.cells[0].value == categoryId && idx == 1 ? (
                        <TextField
                          placeholder="카테고리 이름"
                          name="bo_subject"
                          type="text"
                          size="small"
                          width="80%"
                          onChange={onChangeAccounts}
                          value={state.data.bo_subject}
                        />
                      ) : row.cells[0].value == categoryId && idx == 2 ? (
                        <TextField
                          placeholder="카테고리 영문"
                          name="bo_table"
                          type="text"
                          size="small"
                          width="80%"
                          onChange={onChangeAccounts}
                          value={state.data.bo_table}
                        />
                      ) : cell.value == "수정 및 삭제하기" &&
                        row.cells[0].value == categoryId ? (
                        <Link href={`/category?idx=${row.cells[0].value}`}>
                          <a>
                            <Flex>
                              <Button
                                size="small"
                                onClick={onClickCategoryEdit}
                              >
                                수정하기
                              </Button>
                              <Button size="small" onClick={onClickCategoryDel}>
                                삭제하기
                              </Button>
                            </Flex>
                          </a>
                        </Link>
                      ) : cell.value == "수정 및 삭제하기" ? (
                        <Link href={`/category?idx=${row.cells[0].value}`}>
                          <a>{cell.value}</a>
                        </Link>
                      ) : idx == 0 ? (
                        <>{parseInt(row.id) + 1}</>
                      ) : (
                        cell.render("Cell")
                      )}
                    </Td>
                  ))}
                </tr>
              );
            })}
          </TBody>
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
      </ButtonContainer>
    </>
  );
};

export default TableHome;
