/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/elements/button";
import { QuillEditor } from "@components/elements/quillEditor";
import Selectbox from "@components/elements/selectbox";
import TextField from "@components/elements/text-field";
import { Header4 } from "@components/elements/types";
import AccountsLayout from "@components/layouts/accounts/consolelayout";
import TopicContentLayout from "@components/layouts/accounts/topic-content-layout";
import Comment from "@components/templates/comment";
import Textarea from "@components/textarea";
import { insightImageUrl, topicImageUrl } from "@core/config/imgurl";
import useCategorySelect from "@core/hook/use-categorySeclect";
import { useInsightDetail } from "@core/hook/use-insightDetail";
import styled from "@emotion/styled";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TopicContent from "../detail";

interface IPropsStyle {
  isReply: boolean;
}

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
  width: auto;
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
  searchTerm: string;
  tablesize: number;
}
const InsightUpdateContent: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { categorySelect } = useCategorySelect("insight");
  const { insightDetail } = useInsightDetail(id);
  const [contents, setContents] = useState("");
  const { data: session, status } = useSession();
  const [image, setImage] = useState<any>({
    image_file: "",
    preview_URL: "",
  });
  const hiddenFileInput = React.useRef<any>(null);

  const [state, setState] = useState<IStateAccounts>({
    data: {
      wr_subject: "",
      wr_content: "",
      mb_name: "",
      board: "",
      file_url: "",
    },
    invalid: "",
    isSearch: false,
    searchTerm: "",
    tablesize: 10,
  });

  useEffect(() => {
    if (insightDetail) {
      getInsightContent();
    }
  }, [id, insightDetail]);

  const getInsightContent = async () => {
    setImage({
      image_file: insightDetail.file_url,
      preview_URL: insightDetail.file_full_url,
    });

    setState({
      ...state,
      data: {
        ...state.data,
        wr_subject: insightDetail.wr_subject,
        wr_content: contents,
        board: insightDetail.board,
        file_url: insightDetail.file_url,
      },
    });
    setContents(insightDetail.wr_content);
  };

  const onChangeInsight = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setState({ ...state, data: { ...state.data, board: parseInt(value) } });
  };

  const onClickSubmitInsight = async () => {
    const formData = new FormData();

    formData.append("file", image.image_file);
    formData.append("exist_url", state.data.file_url);
    if (!state.data.board) return alert("카테고리를 선택해주세요");
    if (!state.data.wr_subject) return alert("제목을 작성해주세요");
    if (!contents) return alert("내용을 작성해주세요");
    if (!image.image_file) return alert("썸네일을 업로드해주세요");
    await axios
      .post(`/api2/insight/update/${id}`, {
        wr_subject: state.data.wr_subject,
        wr_content: contents,
        board: state.data.board,
      })
      .then(async res => {
        if (image.image_file != state.data.file_url) {
          formData.append("idx", `${id}`);
          await axios.post(`/api2/upload/insight`, formData);
        }
        alert("인사이트가 수정되었습니다");
        router.push("/insight");
      });
  };

  const onClickInput = () => {
    hiddenFileInput.current.click();
  };

  const onLoadFile = (e: any) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      e.target.files[0].exist_url = state.data.file_url;
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
    };
  };

  const deleteImage = () => {
    setImage({
      image_file: "",
      preview_URL: "",
    });
  };

  return (
    <>
      <AccountsLayout
        title={
          <>
            <Header4>인사이트 수정하기</Header4>
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
                id={"select"}
              />
            )}
            <TitleBox>
              <TextField
                placeholder="제목"
                name="wr_subject"
                size="medium"
                width="100%"
                value={state.data.wr_subject}
                onChange={onChangeInsight}
              />
            </TitleBox>
            <Button
              variants="light"
              color="primary"
              size="med"
              onClick={onClickInput}
            >
              썸네일 첨부
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
            <ImageContainer>
              <img src={image.preview_URL} alt="" />
              <DeleteButton onClick={deleteImage}>X</DeleteButton>
            </ImageContainer>
          </>
        }
        quillFiled={
          <>
            <QuillEditor content={contents} onChange={setContents} />
          </>
        }
        buttonContainer={
          <>
            <Button
              variants="light"
              color="primary"
              size="large"
              onClick={onClickSubmitInsight}
            >
              수정하기
            </Button>
            <Button
              variants="light"
              color="primary"
              size="large"
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

export default InsightUpdateContent;
