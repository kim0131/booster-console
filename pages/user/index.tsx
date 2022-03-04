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
import ConsoleLayout from "@components/layouts/accounts/consolelayout";
import TableTopic from "@components/elements/table/table-topic";
import Selectbox from "@components/elements/selectbox";
import { CalendarContainer } from "react-datepicker";
import TableUser from "@components/elements/table/table-user";
import PopUp from "@components/userpopup";
import { getUserCertify } from "@core/config/businesscertify";
import UserPopUp from "@components/userpopup";
interface IStateAccounts {
  data: { [key in string]: string | any };
  invalid?: string;
  isSearch: boolean;
  isLoading: boolean;
  searchTerm: string;
  tablesize: number;
}
const selectBox = [
  { value: "0", label: "미승인" },
  { value: "1", label: "승인심사중" },
  { value: "2", label: "승인거절" },
  { value: "3", label: "승인" },
];
const User: NextPage = () => {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [userId, setUserId] = useState<any>({
    userid: "",
    business: "",
  });
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
    if (router.query.id) {
      setUserId({ ...userId, userid: router.query.id });
    } else {
      setOpenPopUp(false);
      onClickUserList();
    }
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
      if (!state.data.board) {
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

    const uniqueArr = result2.filter((element: any, index: any) => {
      return result2.indexOf(element) === index;
    });

    if (uniqueArr.length == 0) {
      alert("검색결과가 없습니다.");
    }
    setSearchResult(uniqueArr);
    setState({ ...state, isLoading: false, isSearch: true });
  };

  const onClickUserList = async () => {
    setState({ ...state, isLoading: true });

    await axios.get("/api2/user/list").then(async (res: any) => {
      let list = res.data.result;

      list.map(async (item: any, idx: any) => {
        let stand = list[idx].mb_business_certify.toString().slice(0, 1);
        list[idx] = {
          idx: list[idx].idx,
          category: getUserCertify(stand),
          mb_id: list[idx].mb_id,
          mb_email: list[idx].mb_email,
          datetime: list[idx].mb_datetime.slice(0, 10),
          // update: list[idx].mb_update.slice(0, 10),
          business: list[idx].mb_business_num,
          update: "",
          mb_ph: list[idx].mb_ph,
        };

        if (list[idx].idx == userId.userid) {
          setUserId({ ...userId, business: list[idx].business });
        }
      });
      setUser(list);
    });
    setSearchResult([]);
    setState({ ...state, isLoading: false, isSearch: false });
  };

  const onChangeSelcet = (e: any) => {
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
  const onClickDeleteuser = async () => {
    await axios
      .post(`/api2/user/delete/${userId.userid}`)
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
    await axios
      .post(`/api2/business/delete/${userId.business}`)
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
    setOpenPopUp(false);
    setUserId(undefined);
    router.push(router.pathname);
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
            <UserPopUp
              open={openPopUp}
              id={userId.userid ? userId.userid : 0}
              close={onClickClosePopUp}
              onClickDel={onClickDeleteuser}
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
