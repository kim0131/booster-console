/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Button from "@components/elements/button";

import TextField from "@components/elements/text-field";
import { Body1, Body2, Header4 } from "@components/elements/types";
import AccountsLayout from "@components/layouts/accounts/consolelayout";
import theme from "@components/styles/theme";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Selectbox from "@components/elements/selectbox";
import Textarea from "@components/textarea";
import { useSession } from "next-auth/react";

import useCategorySelect from "@core/hook/use-categorySeclect";

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

const ImageContainer = styled.div`
  position: relative;
  background-image: ${(props: any) =>
    props.background ? `url(${props.background})` : ""};
  width: 30rem;
  height: auto;
  border-radius: 1rem;
  overflow: hidden;
`;
const TitleBox = styled.div`
  width: 60%;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  z-index: 99;
  background-color: #2563eb;
  color: #ffffff;
  padding: 0 0.5rem;
  border-radius: 50%;
  border: 1px black solid;
  cursor: pointer;
`;

interface IStateAccounts {
  data: { [key in string]: any };
  invalid?: string;
  isSearch: boolean;
  isLoading: boolean;
  searchTerm: string;
  tablesize: number;
}
const TopicCrate: NextPage = () => {
  const [category, setCategory] = useState([]);
  const { data: session, status } = useSession();
  const { categorySelect } = useCategorySelect("topic");

  const [image, setImage] = useState<any>({
    image_file: "",
    preview_URL: "",
  });
  const hiddenFileInput = React.useRef<any>(null);
  const [loaded, setLoaded] = useState<any>(false);
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
  }, [session]);

  const onClickCategoryList = async () => {
    setState({ ...state, isLoading: true });

    setCategory(categorySelect);

    setState({ ...state, isLoading: false, isSearch: false });
  };

  const getUserIp = async () => {
    const res = await axios.get("/json/");
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
    const formData = new FormData();
    if (image.image_file) {
      formData.append("file", image.image_file);
    }
    console.log(state.data);
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
      .then(async res => {
        const id = res.data.result.idx;
        await axios.post(`/api2/topic/upload/${id}`, formData);
        alert("토픽이 등록되었습니다");
        router.push("/topic");
      });
    setState({ ...state, isLoading: false });
  };

  const onClickInput = () => {
    hiddenFileInput.current.click();
  };

  const onLoadFile = (e: any) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      setLoaded("loading");
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
      setLoaded(true);
    };
  };

  const deleteImage = () => {
    setImage({
      image_file: "",
      preview_URL: "",
    });
    setLoaded(false);
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
            {categorySelect && (
              <Selectbox
                options={categorySelect}
                isMulti={false}
                placeholder={"카테고리 선택"}
                name="board"
                onChange={onChangeSelcet}
                value={state.data.board}
              />
            )}

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
              onClick={onClickInput}
            >
              사진 첨부
            </Button>

            <input
              style={{ display: "none" }}
              type="file"
              ref={hiddenFileInput}
              onChange={onLoadFile}
            />
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
        section3={
          <>
            <ImageContainer>
              <img src={image.preview_URL} alt="" />
              <DeleteButton onClick={deleteImage}>X</DeleteButton>
            </ImageContainer>
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
