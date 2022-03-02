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
import ConsoleLayout from "@components/layouts/accounts/consolelayout";
import TableTopic from "@components/elements/table/table-topic";
import Selectbox from "@components/elements/selectbox";
import { CalendarContainer } from "react-datepicker";
import TableUser from "@components/elements/table/table-user";
import PopUp from "@components/popup";
interface IStateAccounts {
  data: { [key in string]: string | any };
  invalid?: string;
  isSearch: boolean;
  isLoading: boolean;
  searchTerm: string;
  tablesize: number;
}
const selectBox = [
  { value: "1", label: "인증" },
  { value: "2", label: "미인증" },
];
const User: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [userId, setUserId] = useState<string | string[] | number>();
  const [openPopUp, setOpenPopUp] = useState<boolean>();
  const [state, setState] = useState<IStateAccounts>({
    data: {
      bo_table: "",
      bo_subject: "",
      certify: { value: "", lable: "" },
    },
    invalid: "",
    isSearch: false,
    isLoading: false,
    searchTerm: "",
    tablesize: 10,
  });

  useEffect(() => {
    onClickUserList();
    if (router.query.id) {
      setUserId(router.query.id);
    }
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

    let list = user;
    //카테고리
    await list.filter((item: any) => {
      if (state.data.board == "") {
        result1.push(item);
      } else if (state.data.certify.label == item.category) {
        result1.push(item);
      } else {
        return null;
      }
    });

    //검색어
    await result1.filter((item: any) => {
      if (state.searchTerm == "") {
        result2.push(item);
      } else {
        Object.values(item).filter((content: any) => {
          if (typeof content == "string") {
            if (content.includes(state.searchTerm)) {
              result2.push(item);
            }
          }
        });
      }
    });

    if (result2.length == 0) {
      alert("검색결과가 없습니다.");
    }
    setSearchResult(result2);
    setState({ ...state, isLoading: false, isSearch: true });
  };

  const onClickUserList = async () => {
    setState({ ...state, isLoading: true });

    await axios.get("/api2/user/list").then(async (res: any) => {
      let list = res.data.result;

      list.map(async (item: any, idx: any) => {
        list[idx] = {
          idx: list[idx].idx,
          // category: list[idx].mb_business_certify,
          category: "미인증",
          mb_id: list[idx].mb_id,
          mb_email: list[idx].mb_email,
          datetime: list[idx].mb_datetime.slice(0, 10),
          // update: list[idx].mb_update.slice(0, 10),
          update: "",
          mb_ph: list[idx].mb_ph,
        };
      });
      setUser(list);
    });
    setSearchResult([]);
    setState({ ...state, isLoading: false, isSearch: false });
  };

  const onChangeSelcet = (e: any) => {
    console.log(e);
    const value = e.value;
    const label = e.label;
    setState({
      ...state,
      data: { ...state.data, certify: { value: value, label: label } },
    });
  };

  const onClickOpenPopUp = () => {
    setOpenPopUp(true);
  };
  const onClickClosePopUp = () => {
    setOpenPopUp(false);
  };

  return (
    <>
      {" "}
      <ConsoleLayout
        title={
          <>
            <Header4>사용자 조회</Header4>
          </>
        }
        section1={
          <>
            <Selectbox
              options={selectBox}
              placeholder={"분류"}
              onChange={onChangeSelcet}
              value={state.data.certify.value}
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
              onClick={onClickUserList}
            >
              전체조회
            </Button>
          </>
        }
        section2={
          <>
            <PopUp
              open={openPopUp}
              id={userId ? userId : 0}
              close={onClickClosePopUp}
            />
          </>
        }
        section3={
          <>
            <TableUser
              size={state.tablesize ? state.tablesize : 1}
              data={searchResult.length > 0 ? searchResult : user}
              rowClick={onClickOpenPopUp}
            />
          </>
        }
      />
    </>
  );
};

export default User;
