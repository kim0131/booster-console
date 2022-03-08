/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/elements/button";

import TextField from "@components/elements/text-field";
import { Body1, Body2, Header4 } from "@components/elements/types";
import AccountsLayout from "@components/layouts/accounts/consolelayout";
import theme from "@components/styles/theme";

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
import ConsoleLayout from "@components/layouts/accounts/consolelayout";
import useSWR from "swr";
import { Topicfetcher } from "@core/swr/topicfetch";
import { CategorySelectfetcher } from "@core/swr/categoryfetcher";

interface IStateAccounts {
  data: { [key in string]: string };
  invalid?: string;
  isSearch: boolean;
  isLoading: boolean;
  searchTerm: string;
  tablesize: number;
  startDay: any;
  endDay: any;
}

const Topic: NextPage = () => {
  const router = useRouter();
  const { data: topic } = useSWR(`/api2/topic/list`, Topicfetcher);
  const { data: categoryList } = useSWR(
    `/api2/category`,
    CategorySelectfetcher,
  );

  const [topicList, setTopicList] = useState(topic);
  const [category, setCategory] = useState(categoryList);
  const [searchResult, setSearchResult] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [state, setState] = useState<IStateAccounts>({
    data: {
      bo_table: "",
      bo_subject: "",
      board: "",
    },
    invalid: "",
    isSearch: false,
    isLoading: false,
    searchTerm: "",
    tablesize: 10,
    startDay: "시작일",
    endDay: "종료일",
  });

  useEffect(() => {
    onClickCategoryList();
    onClickTopicList();
  }, [router, topic]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setState({
      ...state,
      searchTerm: value,
    });
  };

  const onClickSearch = async () => {
    let result1: any = [];
    let result2: any = [];
    let result3: any = [];
    let start = new Date(state.startDay);
    let end = new Date(state.endDay);
    end.setDate(end.getDate() + 1);
    let startString = getToday(state.startDay);
    let endString = getToday(state.endDay);

    let list = topic;
    //카테고리
    await list.filter((item: any) => {
      if (state.data.board == "") {
        result1.push(item);
      } else if (getCategoryName(state.data.board) == item.category) {
        result1.push(item);
      } else {
        return null;
      }
    });

    //날짜
    await result1.filter((item: any) => {
      let item_datetime = new Date(item.datetime);
      let item_datetime_string = getToday(item.datetime);

      if (
        typeof state.startDay == "object" &&
        typeof state.endDay != "object"
      ) {
        if (item_datetime >= start) {
          result2.push(item);
        }
      } else if (
        typeof state.startDay != "object" &&
        typeof state.endDay == "object"
      ) {
        if (end >= item_datetime) {
          result2.push(item);
        }
      } else if (
        typeof state.startDay == "object" &&
        typeof state.endDay == "object"
      ) {
        if (item_datetime >= start && end >= item_datetime) {
          result2.push(item);
        } else if (
          startString == endString &&
          startString == item_datetime_string
        ) {
          result2.push(item);
        }
      } else {
        result2.push(item);
      }
    });

    //검색어
    await result2.filter((item: any) => {
      if (state.searchTerm == "") {
        result3.push(item);
      } else {
        Object.values(item).filter((content: any) => {
          if (typeof content == "string") {
            if (content.includes(state.searchTerm)) {
              result3.push(item);
            }
          }
        });
      }
    });

    if (result3.length == 0) {
      alert("검색결과가 없습니다.");
    }
    setSearchResult(result3);
    setState({ ...state, isLoading: false, isSearch: true });
  };

  const getToday = (date: Date) => {
    var date = new Date(date);
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  };

  const onClickTopicList = async () => {
    setState({ ...state, isLoading: true });
    setTopicList(topic);
    setSearchResult([]);
    setState({ ...state, isLoading: false, isSearch: false });
  };

  const getCategoryName = (idx: any) => {
    for (let i = 0; i < category.length; i++) {
      if (category[i].value == idx) {
        return category[i].label;
      }
    }
  };

  const onClickCategoryList = async () => {
    setCategory(categoryList);
  };

  const onChangeSelcet = (e: any) => {
    const value = e.value;

    setState({ ...state, data: { ...state.data, board: value } });
  };

  const onChangeCalendarStartDay = (e: any) => {
    var start = new Date(e);
    var end = new Date(state.endDay);
    if (start > end) {
      alert("종료일보다 늦을 순 없습니다.");
    } else {
      setState({ ...state, startDay: e });
    }
  };
  const onChangeCalendarEndtDay = (e: any) => {
    var start = new Date(state.startDay);
    var end = new Date(e);
    if (start > end) {
      alert("시작일보다 빠를 순 없습니다.");
    } else {
      setState({ ...state, endDay: e });
    }
  };
  return (
    <>
      {" "}
      <ConsoleLayout
        title={
          <>
            <Header4>토픽 조회</Header4>
            <Button
              variants="light"
              color="primary"
              size="large"
              isLoading={state.isLoading}
              onClick={() => {
                router.push("/topic/create");
              }}
            >
              글쓰기
            </Button>
          </>
        }
        section1={
          <>
            {category && (
              <Selectbox
                options={category}
                isMulti={false}
                placeholder={"카테고리"}
                onChange={onChangeSelcet}
                value={state.data.board}
              />
            )}
            <CalendarContainer
              name="startDay"
              onChange={onChangeCalendarStartDay}
              selected={state.startDay}
            />
            ~
            <CalendarContainer
              name="endDay"
              onChange={onChangeCalendarEndtDay}
              selected={state.endDay}
            />
            <TextField
              placeholder="검색어"
              name="bo_table"
              size="medium"
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
            {topicList && (
              <TableTopic
                size={state.tablesize ? state.tablesize : 1}
                data={searchResult.length > 0 ? searchResult : topicList}
              />
            )}
          </>
        }
      />
    </>
  );
};

export default Topic;
