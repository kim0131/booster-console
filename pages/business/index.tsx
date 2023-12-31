/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/elements/button";

import TextField from "@components/elements/text-field";
import { Body1, Body2, Header4 } from "@components/elements/types";

import axios from "axios";
import { NextPage } from "next";

import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import ConsoleLayout from "@components/layouts/accounts/consolelayout";

import Selectbox from "@components/elements/selectbox";

import {
  getBusinessRefuse,
  getUserCertify,
} from "@core/config/businesscertify";
import BusinessPopUp from "@components/businesspopup";
import TableBusiness from "@components/elements/table/table-business";
import useUserList from "@core/hook/use-userList";
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
  { value: "4", label: "승인" },
];
const Business: NextPage = () => {
  const router = useRouter();
  const [business, setBusiness] = useState([]);
  const { userList } = useUserList();
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
    if (router.query.id) {
      setUserId(router.query.id);
    } else {
      setOpenPopUp(false);
    }
  }, [router]);

  useEffect(() => {
    onClickUserList();
  }, []);

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

    let list = business;

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
    if (userList) {
      let list = userList;
      let result: any = [];
      list.map(async (item: any, idx: any) => {
        let stand = item.info.mb_business_certify.toString().slice(0, 1);
        if (stand == 0 || stand == 1 || stand == 2 || stand == 4) {
          result.push({
            idx: list[idx].idx,
            category: getUserCertify(item.info.mb_business_certify),
            mb_id: list[idx].mb_id,
            mb_email: list[idx].mb_email,
            datetime: item.info.mb_datetime.slice(0, 10),
            refuse: getBusinessRefuse(item.info.mb_business_certify),
            mb_ph: list[idx].mb_ph,
          });
        }
      });
      setBusiness(result);
    }

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
            <BusinessPopUp
              open={openPopUp}
              id={userId ? userId : 0}
              close={onClickClosePopUp}
            />
          </>
        }
        section3={
          <>
            <TableBusiness
              size={state.tablesize ? state.tablesize : 1}
              data={searchResult.length > 0 ? searchResult : business}
              rowClick={onClickOpenPopUp}
            />
          </>
        }
      />
    </>
  );
};

export default Business;
