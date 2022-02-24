import { NextPage } from "next";
import Button from "@components/elements/button";
import Table from "@components/elements/table/table-category";
import TextField from "@components/elements/text-field";
import { Body1, Body2, Header4 } from "@components/elements/types";
import AccountsLayout from "@components/layouts/accounts/consolelayout";
import theme from "@components/styles/theme";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Selectbox from "@components/elements/selectbox";
import Textarea from "@components/textarea";
import { useSession } from "next-auth/react";

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
  data: { [key in string]: any };
  invalid?: string;
  isSearch: boolean;
  isLoading: boolean;
  searchTerm: string;
  tablesize: number;
}
const TitleBox = styled.div`
  width: 60%;
`;
const TopicCrate: NextPage = () => {
  const [category, setCategory] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [state, setState] = useState<IStateAccounts>({
    data: {
      wr_subject: "",
      wr_content: "",
      wr_ip: "",
      mb_id: "",
      mb_name: "",
      board: "",
      wr_datetime: new Date(),
      wr_update: new Date(),
    },
    invalid: "",
    isSearch: false,
    isLoading: false,
    searchTerm: "",
    tablesize: 10,
  });
  useEffect(() => {
    onClickCategoryList();
    getUserIp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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

  const getUserIp = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setState({ ...state, data: { ...state.data, wr_ip: res.data.IPv4 } });
  };

  const onChangeTopic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setState({
      ...state,
      data: {
        ...state.data,
        [name]: value,
        mb_id: session?.user?.email,
        mb_name: session?.user?.name,
      },
    });
  };

  const onChangeSelcet = (e: any) => {
    const value = e.value;

    setState({ ...state, data: { ...state.data, board: value } });
  };

  const onClickSubmitTopic = async () => {
    setState({ ...state, isLoading: true });
    await axios
      .post("/api2/topic/write", {
        wr_subject: state.data.wr_subject,
        wr_content: state.data.wr_content,
        wr_ip: state.data.wr_ip,
        mb_id: state.data.mb_id,
        mb_name: state.data.mb_name,
        board: state.data.board,
        wr_datetime: state.data.wr_datetime,
        wr_update: state.data.wr_update,
      })
      .then(res => {
        alert("토픽이 등록되었습니다");
        router.push("/topic");
      });
    setState({ ...state, isLoading: false });
  };

  return (
    <>
      <AccountsLayout
        title={
          <>
            <Header4>글쓰기</Header4>
          </>
        }
        section4={
          <>
            <Selectbox
              options={category}
              isMulti={false}
              placeholder={"카테고리 선택"}
              name="board"
              onChange={onChangeSelcet}
              value={state.data.board}
            />
            <TitleBox>
              <TextField
                placeholder="제목"
                name="wr_subject"
                size="medium"
                width="100%"
                onChange={onChangeTopic}
              />
            </TitleBox>
            <Button
              variants="light"
              color="primary"
              size="med"
              isLoading={state.isLoading}
              // onClick={onClickSubmitTopic}
            >
              사진 첨부 (임시)
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
            />
          </>
        }
        buttonContainer={
          <>
            <Button
              variants="light"
              color="primary"
              size="large"
              isLoading={state.isLoading}
              onClick={onClickSubmitTopic}
            >
              등록
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

export default TopicCrate;
