/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Button from "@components/elements/button";

import TextField from "@components/elements/text-field";
import { Body1, Body2, Header4 } from "@components/elements/types";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import CalendarContainer from "@components/elements/calendar";
import { CirclePicker, SketchPicker, TwitterPicker } from "react-color";
import { useHomeDetail } from "@core/hook/use-home";
import { homeImageUrl } from "@core/config/imgurl";

const Container = styled.header`
  width: 100%;
  padding: 3rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  ${props => props.theme.screen.md} {
    max-width: 50rem;
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

const FlexBox = styled.div`
  display: flex;
  gap: 1rem;
`;

interface IStateAccounts {
  data: { [key in string]: any };
  invalid?: string;
}
const HomeUpdate: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const { homeDetail } = useHomeDetail(id);
  const [image, setImage] = useState<any>({
    image_file: "",
    preview_URL: "",
  });
  const hiddenFileInput = React.useRef<any>(null);

  const [state, setState] = useState<IStateAccounts>({
    data: {
      title: "",
      subtitle: "",
      posting_date: "시작일 선택",
      posting_exitdate: "종료일 선택",
      image_url: "",
      background_color: "",
      url: "",
      priority: 10,
      open_tool: "_blank",
    },
    invalid: "",
  });

  useEffect(() => {
    if (homeDetail) {
      setState({
        ...state,
        data: {
          title: homeDetail.title,
          subtitle: homeDetail.subtitle,
          posting_date: homeDetail.posting_date,
          posting_exitdate: homeDetail.posting_exitdate,
          image_url: homeDetail.image_url,
          background_color: homeDetail.background_color,
          url: homeDetail.url,
          priority: homeDetail.priority,
          open_tool: homeDetail.open_tool,
        },
      });
      setImage({
        image_file: homeDetail.file_url,
        preview_URL: homeDetail.file_full_url,
      });
    }
  }, [homeDetail]);

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

  const onClickSubmitTopic = async () => {
    const formData = new FormData();

    formData.append("file", image.image_file);
    formData.append("exist_url", state.data.image_url);

    await axios
      .post(`/api2/home/main/update/${id}`, {
        title: state.data.title,
        subtitle: state.data.subtitle,
        posting_date: state.data.posting_date,
        posting_exitdate: state.data.posting_exitdate,
        image_url: state.data.image_url,
        background_color: state.data.background_color,
        url: state.data.url,
        priority: state.data.priority,
        open_tool: state.data.open_tool,
      })
      .then(async res => {
        if (image.image_file != state.data.image_url) {
          formData.append("idx", `${id}`);
          await axios.post(`/api2/upload/home`, formData);
        }
        alert("메인 베너가 등록되었습니다");
        router.push("/home");
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
  const onChangeCalendarStartDay = (e: any) => {
    var start = new Date(e);
    var end = new Date(state.data.posting_exitdate);
    if (start > end) {
      alert("종료일보다 늦을 순 없습니다.");
    } else {
      setState({ ...state, data: { ...state.data, posting_date: e } });
    }
  };
  const onChangeCalendarEndtDay = (e: any) => {
    var start = new Date(state.data.posting_date);
    var end = new Date(e);
    if (start > end) {
      alert("시작일보다 빠를 순 없습니다.");
    } else {
      setState({ ...state, data: { ...state.data, posting_exitdate: e } });
    }
  };
  const handleChangeComplete = (color: any) => {
    setState({
      ...state,
      data: { ...state.data, background_color: color.hex },
    });
  };
  return (
    <>
      <Container>
        <Header4>메인 베너 추가</Header4>
        <TextField
          placeholder="제목"
          name="title"
          size="medium"
          width="100%"
          onChange={onChangeTopic}
          value={state.data.title}
        />
        <TextField
          placeholder="소제목"
          name="subtitle"
          size="medium"
          width="100%"
          onChange={onChangeTopic}
          value={state.data.subtitle}
        />
        <TextField
          placeholder="링크"
          name="url"
          size="medium"
          width="100%"
          onChange={onChangeTopic}
          value={state.data.url}
        />
        <Header4>기간 설정</Header4>
        <FlexBox>
          <CalendarContainer
            name="posting_date"
            onChange={onChangeCalendarStartDay}
            selected={state.data.posting_date}
          />
          ~
          <CalendarContainer
            name="posting_exitdate"
            onChange={onChangeCalendarEndtDay}
            selected={state.data.posting_exitdate}
          />
        </FlexBox>
        <Header4>타겟 지정</Header4>
        <FlexBox>
          <Button
            variants="light"
            color={state.data.open_tool == "_blank" ? "primary" : ""}
            onClick={() => {
              setState({
                ...state,
                data: { ...state.data, open_tool: "_blank" },
              });
            }}
          >
            새 탭으로 열기
          </Button>
          <Button
            variants="light"
            color={state.data.open_tool == "_self" ? "primary" : ""}
            onClick={() => {
              setState({
                ...state,
                data: { ...state.data, open_tool: "_self" },
              });
            }}
          >
            기존 창에서 열기
          </Button>
        </FlexBox>
        <Header4>이미지 추가</Header4>
        <FlexBox>
          <Button
            variants="light"
            color="primary"
            size="med"
            onClick={onClickInput}
          >
            사진 첨부
          </Button>
          <Button onClick={deleteImage}>삭제</Button>
          <input
            style={{ display: "none" }}
            type="file"
            ref={hiddenFileInput}
            onChange={onLoadFile}
          />
        </FlexBox>
        <ImageContainer>
          <img
            src={
              image.preview_URL
                ? image.preview_URL
                : homeImageUrl + state.data.image_url
            }
            alt=""
          />
        </ImageContainer>
        <Header4>배경색 지정</Header4>
        <FlexBox>
          <TwitterPicker
            color={state.data.background_color}
            onChange={handleChangeComplete}
          />
        </FlexBox>
        <FlexBox>
          <Button
            variants="light"
            color="primary"
            size="large"
            onClick={onClickSubmitTopic}
          >
            등록
          </Button>
          <Button
            variants="light"
            color="primary"
            size="large"
            onClick={() => {
              router.push("/home");
            }}
          >
            취소
          </Button>
        </FlexBox>
      </Container>
    </>
  );
};

export default HomeUpdate;
