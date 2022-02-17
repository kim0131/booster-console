import Button from "@components/elements/button";
import Table from "@components/elements/table/table-category";
import TextField from "@components/elements/text-field";
import { Body1, Body2, Header4 } from "@components/elements/types";
import AccountsLayout from "@components/layouts/accounts/accounts-layout";
import theme from "@components/styles/theme";
import { accountsDescription } from "@core/config/description";
import { accountsNavigation } from "@core/config/navigation";
import { IAccountsData } from "@core/interfaces/accounts";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import SideBar from "@components/templates/sidebar";
import { stat } from "fs";
import TableCategory from "@components/elements/table/table-category";

const Container = styled.header`
  width: 100%;
  padding: 3rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  ${props => props.theme.screen.md} {
    max-width: 50rem;
    margin: 3rem auto;
    padding: 2.25rem;
    border: 1px solid ${props => props.theme.color.gray[300]};
    border-radius: ${props => props.theme.rounded.xxl};
  }
`;

interface IStateAccounts {
  data: { [key in string]: string };
  invalid?: string;
  isSearch: boolean;
  isLoading: boolean;
  searchTerm: string;
  tablesize: number;
}

const Category: NextPage = () => {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [state, setState] = useState<IStateAccounts>({
    data: {
      bo_table: "",
      bo_subject: "",
    },
    invalid: "",
    isSearch: false,
    isLoading: false,
    searchTerm: "",
    tablesize: 10,
  });
  useEffect(() => {
    onClickCategoryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setState({
      ...state,
      searchTerm: value,
    });
  };

  const onChangeAccounts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setState({
      ...state,
      data: {
        ...state.data,
        [name]: value,
      },
      invalid: "",
    });
  };

  const onChangTablesize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setState({
      ...state,

      [name]: value,
    });
  };

  const onClickCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setState({ ...state, isLoading: true });
    await axios.post("/api2/category/create", {
      bo_subject: state.data.bo_subject,
      bo_table: state.data.bo_table,
    });
    onClickCategoryList();
    setState({ ...state, isLoading: false });
  };

  const onClickSearch = async () => {
    let result: any = [];
    let list = await category.filter((item: any) => {
      // console.log(Object.values(item));
      if (state.searchTerm == "") {
        return item;
      } else {
        Object.values(item).filter((content: any) => {
          if (typeof content == "string") {
            if (content.includes(state.searchTerm)) {
              result.push(item);
            }
          }
        });
      }
    });

    setSearchResult(result);
    setState({ ...state, isLoading: false, isSearch: true });
  };

  const onClickCategoryList = async () => {
    // if(state.searchTerm)

    setState({ ...state, isLoading: true });
    await axios.get("/api2/category").then((res: any) => {
      let list = res.data.result;
      list.map((item: any, idx: any) => {
        list[idx] = {
          idx: list[idx].idx,
          bo_table: list[idx].bo_table,
          bo_subject: list[idx].bo_subject,
          view_content: "게시물보기",
          edit_subject: "수정 및 삭제하기",
        };
      });
      setCategory(list);
    });
    setState({ ...state, isLoading: false, isSearch: false });
  };
  return (
    <>
      {" "}
      <AccountsLayout
        title={
          <>
            <Header4>게시판 카테고리 조회</Header4>
          </>
        }
        section1={
          <>
            <TextField
              placeholder="카테고리 검색"
              name="bo_table"
              size="large"
              onChange={onChangeSearch}
            />
            <Button
              variants="light"
              color="primary"
              size="large"
              isLoading={state.isLoading}
              onClick={onClickSearch}
            >
              검색
            </Button>
            <Button
              variants="light"
              color="primary"
              size="large"
              isLoading={state.isLoading}
              onClick={onClickCategoryList}
            >
              전체조회
            </Button>
          </>
        }
        section2={
          <>
            <TextField
              placeholder="테이블 행"
              name="tablesize"
              size="large"
              onChange={onChangTablesize}
            />
          </>
        }
        section3={
          <>
            <TableCategory
              size={state.tablesize ? state.tablesize : 1}
              data={category}
            />
          </>
        }
      />
    </>
  );
};

export default Category;
