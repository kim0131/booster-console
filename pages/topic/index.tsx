import Button from "@components/elements/button";

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
import { Router, useRouter } from "next/router";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import SideBar from "@components/templates/sidebar";
import Selectbox from "@components/elements/selectbox";
import CalendarContainer from "@components/elements/calendar";
import TableTopic from "@components/elements/table/table-topic";
interface IStateAccounts {
  data: { [key in string]: string };
  invalid?: string;
  isSearch: boolean;
  isLoading: boolean;
  searchTerm: string;
  tablesize: number;
}
const Topic: NextPage = () => {
  const router = useRouter();
  const [topic, setTopic] = useState([]);
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

  // useEffect(() => {
  //   onClickTopicList();
  // }, [router]);
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setState({
      ...state,
      searchTerm: value,
    });
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

  const onClickTopicList = async () => {
    // if(state.searchTerm)

    setState({ ...state, isLoading: true });
    await axios.get("/api2/topic").then((res: any) => {
      let list = res.data.result;
      list.map((item: any, idx: any) => {
        list[idx] = {
          category: list[idx].board,
          wr_subject: list[idx].wr_subject,
          mb_name: list[idx].mb_name,
          datetime: list[idx].wr_datetime,
          update: list[idx].wr_update,
          view: list[idx].wr_view,
          like: list[idx].wr_good,
          comment: "댓글",
        };
      });
      setTopic(list);
    });
    setState({ ...state, isLoading: false, isSearch: false });
  };
  return (
    <>
      {" "}
      <AccountsLayout
        title={
          <>
            <Header4>토픽 조회</Header4>
          </>
        }
        section1={
          <>
            <Selectbox
              options={category}
              isMulti={false}
              placeholder={"전체"}
            ></Selectbox>
            <CalendarContainer />
            <CalendarContainer />
            <TextField
              placeholder="토픽 검색"
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
              onClick={onClickTopicList}
            >
              전체조회
            </Button>
          </>
        }
        section2={<></>}
        section3={
          <>
            <TableTopic
              size={state.tablesize ? state.tablesize : 1}
              data={topic}
            />
          </>
        }
      />
    </>
  );
};

export default Topic;
