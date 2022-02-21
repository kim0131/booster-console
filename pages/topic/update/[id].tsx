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
import Selectbox from "@components/elements/selectbox";
import Textarea from "@components/textarea";

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
const TopiceUpdate: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState([]);
  const { data: session, status } = useSession();
  const [state, setState] = useState<IStateAccounts>({
    data: {
      wr_subject: "",
      wr_content: "",
      mb_name: "",
      board: "",
      wr_view: "",
      wr_good: "",
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
    onClickCategoryList();
    getTopicInfo();
  }, [router]);
  const getTopicInfo = async () => {
    await axios.get(`/api2/topic/list/${id}`).then(res => {
      setState({
        ...state,
        data: {
          wr_subject: res.data.wr_subject,
          wr_content: res.data.wr_content,
          mb_name: res.data.mb_name,
          board: res.data.board,
          wr_view: res.data.wr_view,
          wr_good: res.data.wr_good,
        },
      });
    });
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

  const onChangeTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setState({
      ...state,
      data: {
        ...state.data,
        [name]: value,
      },
    });
  };

  const onClickSubmitTopic = async () => {
    setState({ ...state, isLoading: true });
    await axios
      .post(`/api2/topic/update/${id}`, {
        wr_subject: state.data.wr_subject,
        wr_content: state.data.wr_content,
        board: state.data.board,
      })
      .then(() => {
        alert("수정되었습니다");
        router.push("/topic");
      });
    setState({ ...state, isLoading: false });
  };

  const onClickDeleteTopic = async () => {
    setState({ ...state, isLoading: true });
    await axios.post(`/api2/topic/delete/${id}`).then(() => {
      alert("삭제되었습니다");
      router.push("/topic");
    });
    setState({ ...state, isLoading: false });
  };

  return (
    <>
      {" "}
      <AccountsLayout
        title={
          <>
            <Header4>토픽 수정</Header4>
          </>
        }
        section1={
          <>
            <Selectbox
              options={category}
              isMulti={false}
              placeholder={"카테고리 선택"}
              name="board"
              onChange={onChangeSelcet}
              value={state.data.board}
            />
            <TextField
              placeholder="사진 첨부 (임시)"
              name="file_rul"
              size="large"
            />
            <TextField
              placeholder="제목"
              name="wr_subject"
              size="large"
              onChange={onChangeTopic}
              value={state.data.wr_subject}
            />
            <Button variants="light" color="primary" size="large">
              작성자 : {state.data.mb_name}
            </Button>
            <Button variants="light" color="primary" size="large">
              조회수 : {state.data.wr_view}
            </Button>
            <Button variants="light" color="primary" size="large">
              좋아요 : {state.data.wr_good}
            </Button>
          </>
        }
        section2={
          <>
            <Textarea
              placeholder="내용"
              name="wr_content"
              size="large"
              col={100}
              row={20}
              onChange={onChangeTopic}
              value={state.data.wr_content}
            />
          </>
        }
        section3={
          <>
            <Button
              variants="light"
              color="primary"
              size="large"
              isLoading={state.isLoading}
              onClick={onClickSubmitTopic}
            >
              수정
            </Button>
            <Button
              variants="light"
              color="primary"
              size="large"
              isLoading={state.isLoading}
              onClick={onClickDeleteTopic}
            >
              삭제
            </Button>
            <Button
              variants="light"
              color="primary"
              size="large"
              isLoading={state.isLoading}
              onClick={() => {
                router.push("/topic");
              }}
            >
              취소
            </Button>
          </>
        }
      />
    </>
  );
};

export default TopiceUpdate;
