import { NextPage } from "next";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
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
  colums: any;
}
const CategoryUpdate: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
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
    colums: [
      {
        Header: "순서",
        accessor: "idx",
      },
      {
        Header: "카테고리 테이블 이름",
        accessor: "bo_table",
      },
      {
        Header: "카테고리 이름",
        accessor: "bo_subject",
      },
      {
        Header: "게시물보기",
        accessor: "view_content",
      },
      {
        Header: "수정 및 삭제",
        accessor: "edit_subject",
      },
    ],
  });
  useEffect(() => {
    if (id) {
      axios.get(`/api2/category/${id}`).then(res => {
        let bo_subject = res.data.result.bo_subject;
        let bo_table = res.data.result.bo_table;
        setState({
          ...state,
          data: { bo_subject: bo_subject, bo_table: bo_table },
        });
      });
    }
    onClickCategoryList();
  }, [router]);

  const onClickLink = (
    e: React.MouseEvent<HTMLButtonElement | HTMLParagraphElement>,
  ) => {
    e.preventDefault();
    const link = e.currentTarget.dataset.value;
    link && router.push(link);
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
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setState({
      ...state,
      searchTerm: value,
    });
  };
  const onClickCategoryEdit = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setState({ ...state, isLoading: true });
    await axios.post(`/api2/category/update/${id}`, {
      bo_subject: state.data.bo_subject,
      bo_table: state.data.bo_table,
    });
    onClickCategoryList();
    setState({ ...state, isLoading: false });
  };
  const onClickCategoryDel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setState({ ...state, isLoading: true });
    await axios.post(`/api2/category/delete/${id}`);
    onClickCategoryList();
    router.push("/category");
    setState({ ...state, isLoading: false });
  };

  const onClickCategoryList = async () => {
    setState({ ...state, isLoading: true });

    axios.get("/api2/category").then((res: any) => {
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

  return (
    <>
      {" "}
      <AccountsLayout
        title={
          <>
            <Header4>카테고리 편집</Header4>
          </>
        }
        section1={
          <>
            카테고리 :
            <TextField
              placeholder="카테고리 이름"
              name="bo_subject"
              type="text"
              size="large"
              width="100%"
              onChange={onChangeAccounts}
              value={state.data.bo_subject}
            />
            카테고리 영문 :
            <TextField
              placeholder="카테고리 영문"
              name="bo_table"
              size="large"
              onChange={onChangeAccounts}
              value={state.data.bo_table}
            />
            {state.invalid && (
              <Body2 color={theme.color.red[600]}>{state.invalid}</Body2>
            )}
            <Button
              variants="light"
              color="primary"
              size="large"
              isDisabled={
                state.data.bo_subject && state.data.bo_table ? false : true
              }
              isLoading={state.isLoading}
              onClick={onClickCategoryEdit}
            >
              카테고리 수정
            </Button>
            <Button
              variants="light"
              color="primary"
              size="large"
              isDisabled={
                state.data.bo_subject && state.data.bo_table ? false : true
              }
              isLoading={state.isLoading}
              onClick={onClickCategoryDel}
            >
              카테고리 삭제
            </Button>
          </>
        }
        section2={
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
        section3={
          <>
            <TableCategory
              size={10}
              data={state.isSearch ? searchResult : category}
            />
          </>
        }
      />
    </>
  );
};

export default CategoryUpdate;
