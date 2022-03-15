/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/elements/button";
import Table from "@components/elements/table/table-category";
import TextField from "@components/elements/text-field";
import { Body1, Body2, Header4 } from "@components/elements/types";
import AccountsLayout from "@components/layouts/accounts/consolelayout";
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
import ConsoleLayout from "@components/layouts/accounts/consolelayout";
import useCategoryList from "@core/hook/use-catagorylist";

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
  const [sector, setSector] = useState("topic");
  const { categoryList } = useCategoryList();
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
    if (categoryList) {
      onClickCategoryList(sector);
    }
  }, [sector, categoryList]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setState({
      ...state,
      searchTerm: value,
    });
  };

  const onClickSearch = async () => {
    let result: any = [];
    await categoryList.filter((item: any) => {
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

  const onClickCategoryList = async (sector: string) => {
    let result: any = [];
    await categoryList.filter((item: any) => {
      Object.values(item).filter((content: any) => {
        if (typeof content == "string") {
          if (content.includes(sector)) {
            result.push(item);
          }
        }
      });
    });
    setSearchResult(result);
    setState({ ...state, searchTerm: "", isLoading: false, isSearch: true });
  };
  return (
    <>
      {categoryList && (
        <ConsoleLayout
          title={
            <>
              <Header4>카테고리 편집</Header4>
            </>
          }
          section4={
            <>
              <TextField
                placeholder="카테고리 검색"
                name="bo_table"
                size="large"
                onChange={onChangeSearch}
                value={state.searchTerm}
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
                onClick={() => onClickCategoryList(sector)}
              >
                전체조회
              </Button>
            </>
          }
          section2={
            <>
              <Button
                variants="light"
                color={sector == "topic" ? "primary" : ""}
                onClick={() => {
                  setSector("topic");
                  onClickCategoryList("topic");
                }}
              >
                토픽
              </Button>
              <Button
                variants="light"
                color={sector == "insight" ? "primary" : ""}
                onClick={() => {
                  setSector("insight");
                  onClickCategoryList("insight");
                }}
              >
                인사이트
              </Button>
            </>
          }
          section3={
            <>
              <TableCategory
                size={state.tablesize ? state.tablesize : 1}
                data={state.isSearch ? searchResult : categoryList}
                sector={sector}
              />
            </>
          }
        />
      )}
    </>
  );
};

export default Category;
