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
  startDay: Date;
  endDay: Date;
}

const Topic: NextPage = () => {
  const router = useRouter();
  const [topic, setTopic] = useState([]);
  const [category, setCategory] = useState<any>([]);
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
    startDay: new Date(),
    endDay: new Date(),
  });

  useEffect(() => {
    onClickTopicList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

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
    var start = new Date(state.startDay);
    var end = new Date(state.endDay);
    onClickTopicList();
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

      if (item_datetime >= start && end >= item_datetime) {
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

    setSearchResult(result3);
    setState({ ...state, isLoading: false, isSearch: true });
  };

  const onClickTopicList = async () => {
    setState({ ...state, isLoading: true });
    await onClickCategoryList();
    await axios.get("/api2/topic/list").then(async (res: any) => {
      let list = res.data;
      list.map(async (item: any, idx: any) => {
        list[idx] = {
          idx: list[idx].idx,
          category: getCategoryName(list[idx].board),
          wr_subject: list[idx].wr_subject,
          mb_name: list[idx].mb_name,
          datetime: list[idx].wr_datetime.slice(0, 10),
          update: list[idx].wr_update.slice(0, 10),
          view: list[idx].wr_view,
          like: list[idx].wr_good,
          comment: "댓글",
        };
      });
      setTopic(list);
    });

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
    setState({ ...state, isLoading: true });
    await axios.get("/api2/category").then((res: any) => {
      let list = res.data.result;
      list.map((item: any, idx: any) => {
        list[idx] = {
          value: list[idx].idx,
          label: list[idx].bo_subject,
        };
      });
      setCategory(list);
    });

    setState({ ...state, isLoading: false, isSearch: false });
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
              onChange={onChangeSelcet}
              value={state.data.board}
            />
            <CalendarContainer
              name="startDay"
              onChange={onChangeCalendarStartDay}
              selected={state.startDay}
            />
            <CalendarContainer
              name="endDay"
              onChange={onChangeCalendarEndtDay}
              selected={state.endDay}
            />
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
              data={searchResult.length > 0 ? searchResult : topic}
            />
          </>
        }
      />
    </>
  );
};

export default Topic;
