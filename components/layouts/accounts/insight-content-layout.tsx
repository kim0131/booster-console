/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Badge from "@components/elements/badge";
import Button from "@components/elements/button";
import { Body3, Header5 } from "@components/elements/types";
import {
  IconBookmark,
  IconComment,
  IconLike,
  IconMoreVertical,
  IconProfile,
  IconView,
} from "@components/icons";
import theme from "@components/styles/theme";
import { insightImageUrl } from "@core/config/imgurl";
import { useInsightDetail } from "@core/hook/use-insightDetail";
import styled from "@emotion/styled";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";

const Style = {
  Container: styled.div`
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    min-width: 0;
    margin-bottom: 3rem;
    ${props => props.theme.screen.md} {
      margin-bottom: 0;
    }
  `,
  Header: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 1.5rem 1.25rem;
      box-shadow: ${props => props.theme.shadow.inset.bottom};
      ${props => props.theme.screen.md} {
        padding: 0;
        padding-bottom: 1.5rem;
      }
    `,
    Badge: styled.div`
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
    `,
    Title: styled.div`
      font-size: ${props => props.theme.fontSize.header4};
      line-height: ${props => props.theme.lineHeight.header4};
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* ellipsis line */
      -webkit-box-orient: vertical;
    `,
    Bottom: {
      Container: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
      `,
      Info: styled.div`
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      `,
      Badge: styled.div`
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
      `,
    },
  },
  Body: {
    Container: styled.div`
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 1.5rem 1.25rem;
      box-shadow: ${props => props.theme.shadow.inset.bottom};
      ${props => props.theme.screen.md} {
        padding: 1.5rem 0;
      }
    `,
    Content: styled.div`
      white-space: pre-line;
      font-size: ${props => props.theme.fontSize.body2};
      line-height: ${props => props.theme.lineHeight.body2};
    `,
    Button: {
      Container: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.75rem;
      `,
      Wrapper: styled.div`
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
      `,
    },
    ImageContainer: styled.div`
      background-image: ${(props: any) =>
        props.background ? `url(${props.background})` : ""};
      width: 100%;
      height: auto;
      border-radius: 1rem;
      overflow: hidden;
    `,
  },
};

interface IPropsinsightContentLayout {
  children?: React.ReactNode;
  id: string | string[] | undefined;
  count?: number;
}

const InsightContentLayout = ({
  children,
  id,
  count,
}: IPropsinsightContentLayout) => {
  const router = useRouter();
  const { insightDetail } = useInsightDetail(id);
  console.log(insightDetail);
  const onClinkinsightDelete = async () => {
    await axios
      .post(`/api2/upload/delete/insight`, {
        file_url: insightDetail.file_url ? insightDetail.file_url : "",
      })
      .then(() => {});
    await axios.post(`/api2/insight/delete/${id}`).then(() => {});
    alert("삭제되었습니다.");
    router.push("/insight");
  };
  const onClinkinsightUpDate = async () => {
    router.push(`/insight/update?id=${id}`);
  };
  const createMarkup = () => {
    return { __html: insightDetail.wr_content };
  };
  return (
    <>
      {insightDetail && (
        <Style.Container>
          <Style.Header.Container>
            <Style.Header.Badge>
              <Badge size="large">{insightDetail.category}</Badge>
            </Style.Header.Badge>
            <Style.Header.Title>{insightDetail.wr_subject}</Style.Header.Title>
            <Style.Header.Bottom.Container>
              <Style.Header.Bottom.Info>
                <Style.Header.Bottom.Badge>
                  <IconProfile size={16} color={theme.color.gray[500]} />
                  <Body3 color={theme.color.gray[500]}>
                    {insightDetail.mb_name}
                  </Body3>
                </Style.Header.Bottom.Badge>
                <Style.Header.Bottom.Badge>
                  <IconLike size={16} color={theme.color.gray[500]} />
                  <Body3 color={theme.color.gray[500]}>
                    {insightDetail.wr_good}
                  </Body3>
                </Style.Header.Bottom.Badge>
                <Style.Header.Bottom.Badge>
                  <IconView size={16} color={theme.color.gray[500]} />
                  <Body3 color={theme.color.gray[500]}>
                    {insightDetail.wr_view}
                  </Body3>
                </Style.Header.Bottom.Badge>
                <Style.Header.Bottom.Badge>
                  <IconComment size={16} color={theme.color.gray[500]} />
                  <Body3 color={theme.color.gray[500]}>{count}</Body3>
                </Style.Header.Bottom.Badge>
              </Style.Header.Bottom.Info>
              <Body3 color={theme.color.gray[500]}>
                {insightDetail.create > 24
                  ? `${Math.ceil(insightDetail.create / 24)}일전`
                  : `${insightDetail.create}시간전`}
              </Body3>
            </Style.Header.Bottom.Container>
          </Style.Header.Container>
          <Style.Body.Container>
            <Style.Body.Content
              dangerouslySetInnerHTML={createMarkup()}
            ></Style.Body.Content>
            <Style.Body.ImageContainer>
              <img
                src={
                  insightDetail.file_full_url ? insightDetail.file_full_url : ""
                }
                alt=""
              />
            </Style.Body.ImageContainer>
            <Style.Body.Button.Container>
              <Style.Body.Button.Wrapper>
                <Button color="transparent">
                  <IconLike />
                  {insightDetail.wr_good}
                </Button>
                <Button color="transparent">
                  <IconComment />
                  {count}
                </Button>
              </Style.Body.Button.Wrapper>
              <Style.Body.Button.Wrapper>
                <Button onClick={onClinkinsightUpDate}>수정하기</Button>
                <Button onClick={onClinkinsightDelete}>삭제하기</Button>
              </Style.Body.Button.Wrapper>
            </Style.Body.Button.Container>
          </Style.Body.Container>
          {children}
        </Style.Container>
      )}
    </>
  );
};

export default InsightContentLayout;
