/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/elements/button";
import Loader from "@components/elements/loader";
import { Header4 } from "@components/elements/types";
import AccountsLayout from "@components/layouts/accounts/consolelayout";
import TopicContentLayout from "@components/layouts/accounts/topic-content-layout";
import Comment from "@components/templates/comment";
import TopicComment from "@components/templates/topic-comment";
import useCategorySelect from "@core/hook/use-categorySeclect";

import styled from "@emotion/styled";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface IPropsStyle {
  isReply: boolean;
}

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-bottom: 1.5rem;
    margin-bottom: 3rem;
    box-shadow: ${props => props.theme.shadow.inset.bottom};
  `,
  Comment: styled.div`
    display: flex;
    flex-direction: column;
  `,
  AddComment: {
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
    TextArea: styled.textarea`
      appearance: none;
      padding: 0.625rem;
      font-size: ${props => props.theme.fontSize.body2};
      line-height: ${props => props.theme.lineHeight.body2};
      background-color: ${props => props.theme.color.white};
      border-radius: ${props => props.theme.rounded.sm};
      border-width: 1px;
      border-color: ${props => props.theme.color.gray[300]};
    `,
    Button: styled.div`
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    `,
  },
  List: {
    Container: styled.div<IPropsStyle>`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      background-color: ${props =>
        props.isReply ? props.theme.color.gray[100] : props.theme.color.white};
      box-shadow: ${props => props.theme.shadow.inset.bottom};
      padding: ${props =>
        props.isReply ? "1.5rem 1.25rem 1.5rem 2.75rem" : "1.5rem 1.25rem"};
      ${props => props.theme.screen.md} {
        padding: ${props => (props.isReply ? "1.5rem" : "1.5rem 0")};
      }
    `,
    Header: styled.div`
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
    `,
    Content: styled.div`
      flex: 1 1 0%;
      font-size: ${props => props.theme.fontSize.body2};
      line-height: ${props => props.theme.lineHeight.body2};
    `,
    Button: styled.div`
      flex: none;
      width: 1.25rem;
      height: 1.25rem;
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
};

const TopicContent: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [commentCount, setCount] = useState();

  return (
    <>
      <AccountsLayout
        topicContent={
          <TopicContentLayout id={id} count={commentCount}>
            <TopicComment id={id} />
          </TopicContentLayout>
        }
      />
    </>
  );
};

export default TopicContent;
