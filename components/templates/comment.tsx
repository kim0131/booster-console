/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/elements/button";
// import Pagination from "@components/elements/pagination";
import { Body3, Header5 } from "@components/elements/types";
import {
  IconComment,
  IconLike,
  IconMoreVertical,
  IconProfile,
  IconView,
} from "@components/icons";
import theme from "@components/styles/theme";

import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
// Style

interface IPropsContainer {
  size: string;
}

interface IPropsDot {
  size: string;
  color: string;
}

const Container = styled.div<IPropsContainer>`
  display: flex;
  gap: ${props => {
    switch (props.size) {
      case "large":
        return "0.5rem";
      case "small":
        return "0.25rem";
      default:
        return "0.375rem";
    }
  }};
`;

const Dot = styled.div<IPropsDot>`
  width: ${props => (props.size === "small" ? "0.5rem" : "0.625rem")};
  height: ${props => (props.size === "small" ? "0.5rem" : "0.625rem")};
  border-radius: ${props => props.theme.rounded.full};
  background-color: ${props => {
    switch (props.color) {
      case "gray":
        return props.theme.color.gray[900];
      case "primary":
        return props.theme.color.blue[600];
      case "success":
        return props.theme.color.green[600];
      case "danger":
        return props.theme.color.red[600];
      case "white":
        return props.theme.color.white;
      default:
        return props.theme.color.white;
    }
  }};
`;

// Component

interface IPropsLoader {
  size?: string;
  color?: string;
}

const Loader = ({ size = "medium", color = "white" }: IPropsLoader) => (
  <Container size={size}>
    <Dot size={size} color={color} />
    <Dot size={size} color={color} />
    <Dot size={size} color={color} />
  </Container>
);

interface IPropsComment {
  children?: React.ReactNode;
  id?: any;
  count?: number;
}

const Comment = ({ id, children, count }: IPropsComment) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  const [commentdata, setCommentData] = useState({
    wr_content: "",
    mb_id: session?.user?.email,
    mb_name: session?.user?.name,
    wr_ip: "",
    wr_parent: parseInt(id),
    wr_is_comment: 1,
    board: null,
    replycount: 0,
  });
  const [replydata, setReply] = useState({
    wr_content: "",
    mb_id: session?.user?.email,
    wr_ip: "",
    mb_name: session?.user?.name,
    wr_parent: parseInt(id),
    wr_parent2: 0,
    wr_is_comment2: 1,
    board: null,
  });
  const [commentList, setComentList] = useState([
    {
      idx: "",
      wr_is_comment: "",
      wr_is_comment2: "",
      wr_content: "",
      mb_name: "",
      wr_view: "",
      wr_good: "",
      wr_create: "",
    },
  ]);
  useEffect(() => {
    if (id) {
      getUserSet();
      getComment();
    } else {
      router.push(router.asPath);
    }
  }, [router, id, session]);

  const getUserSet = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setCommentData({
      ...commentdata,
      wr_ip: res.data.IPv4,
      mb_id: session?.user?.email,
      mb_name: session?.user?.name,
      wr_parent: parseInt(id),
    });
    setReply({
      ...replydata,
      wr_ip: res.data.IPv4,
      mb_id: session?.user?.email,
      mb_name: session?.user?.name,
      wr_parent: parseInt(id),
    });
  };

  const getComment = async () => {
    setIsLoading(true);
    await axios.get(`/api2/topic/comment/${id}`).then(async res => {
      const comment = res.data.result;
      const result: any = [];
      for (const item of comment) {
        const CurrentTime = new Date();
        const ContentTime = new Date(item.wr_datetime);
        const elapsedTime = Math.ceil(
          (CurrentTime.getTime() - ContentTime.getTime()) / (1000 * 3600),
        );
        const replyCount = await axios.get(
          `/api2/topic/replycount/${item.idx}`,
        );

        result.push(
          await {
            idx: item.idx,
            wr_is_comment: item.wr_is_comment,
            wr_is_comment2: item.wr_is_comment2,
            wr_content: item.wr_content,
            mb_name: item.mb_name,
            wr_view: item.wr_view,
            wr_good: item.wr_good,
            wr_create: elapsedTime,
            replycount: replyCount.data.result.length,
            wr_reply: await getCommentIsReply(item.idx),
          },
        );
      }
      setComentList(result);
    });

    setIsLoading(false);
  };

  const getCommentIsReply = async (idx: string | number) => {
    const reply = await axios.get(`/api2/topic/reply/${idx}`);
    if (reply.data.result.length) {
      const result = reply.data.result.map((item: any, idx: any) => {
        return (
          <>
            <Style.List.Container isReply={true}>
              <Style.List.Header>
                <Style.List.Content>{item.wr_content}</Style.List.Content>
                <Style.List.Button>
                  <IconMoreVertical size={20} color={theme.color.gray[500]} />
                </Style.List.Button>
              </Style.List.Header>
              <Style.List.Bottom.Container>
                <Style.List.Bottom.Info>
                  <Style.List.Bottom.Badge>
                    <IconProfile size={16} color={theme.color.gray[500]} />
                    <Body3 color={theme.color.gray[500]}>{item.mb_name}</Body3>
                  </Style.List.Bottom.Badge>
                  <Style.List.Bottom.Badge>
                    <IconLike size={16} color={theme.color.gray[500]} />
                    <Body3 color={theme.color.gray[500]}>{item.wr_good}</Body3>
                  </Style.List.Bottom.Badge>
                </Style.List.Bottom.Info>
                <Body3 color={theme.color.gray[500]}>
                  {item.create > 24
                    ? `${Math.ceil(item.create / 24)}일전`
                    : item.create > 0
                    ? `${item.create}시간전`
                    : `방금전`}
                </Body3>
              </Style.List.Bottom.Container>
            </Style.List.Container>
          </>
        );
      });
      return result;
    } else {
      return [];
    }
  };
  const onClickWriteComment = async () => {
    await axios.post(`/api2/topic/write`, commentdata).then(res => {
      alert("댓글이 등록되었습니다");
      setCommentData({ ...commentdata, wr_content: "" });
      router.push(router.asPath);
    });
  };
  const onClickWriteReply = async () => {
    await axios.post(`/api2/topic/write`, replydata).then(res => {
      alert("댓글이 등록되었습니다");
      setReply({ ...replydata, wr_parent2: 0, wr_content: "" });
      router.push(router.asPath);
    });
  };
  const onChangeTextareaComment = (e: any) => {
    const { name, value } = e.target;
    setCommentData({ ...commentdata, [name]: value });
  };

  const onChangeTextareaReply = (e: any) => {
    const { name, value } = e.target;
    setReply({ ...replydata, wr_content: value });
  };

  const onClickReply = async (e: any, wr_parent: any) => {
    if (wr_parent == replydata.wr_parent2) {
      setReply({ ...replydata, wr_parent2: 0, wr_content: "" });
    } else {
      setReply({ ...replydata, wr_parent2: wr_parent, wr_content: "" });
    }
  };

  return (
    <Style.Container>
      <Style.Comment>
        <Style.AddComment.Container>
          <Header5>{count}개의 댓글</Header5>
          <Style.AddComment.TextArea
            rows={3}
            name={"wr_content"}
            onChange={onChangeTextareaComment}
            value={commentdata.wr_content}
          />
          <Style.AddComment.Button>
            <Button
              variants="solid"
              color="primary"
              onClick={onClickWriteComment}
            >
              작성하기
            </Button>
            <Button>취소</Button>
          </Style.AddComment.Button>
        </Style.AddComment.Container>

        {commentList.length > 0 && isLoading == false ? (
          commentList.map((comment: any) => {
            return (
              <>
                <Style.List.Container
                  isReply={false}
                  onClick={() => {
                    getCommentIsReply(comment.idx);
                  }}
                  id={comment.idx}
                >
                  <Style.List.Header>
                    <Style.List.Content>
                      {comment.wr_content}
                    </Style.List.Content>
                    <Style.List.Button
                      onClick={e => {
                        onClickReply(e, comment.idx);
                      }}
                    >
                      <IconMoreVertical
                        size={20}
                        color={theme.color.gray[500]}
                      />
                    </Style.List.Button>
                  </Style.List.Header>
                  <Style.List.Bottom.Container>
                    <Style.List.Bottom.Info>
                      <Style.List.Bottom.Badge>
                        <IconProfile size={16} color={theme.color.gray[500]} />
                        <Body3 color={theme.color.gray[500]}>
                          {comment.mb_name}
                        </Body3>
                      </Style.List.Bottom.Badge>
                      <Style.List.Bottom.Badge>
                        <IconLike size={16} color={theme.color.gray[500]} />
                        <Body3 color={theme.color.gray[500]}>
                          {comment.wr_good}
                        </Body3>
                      </Style.List.Bottom.Badge>
                      <Style.List.Bottom.Badge>
                        <IconView size={16} color={theme.color.gray[500]} />
                        <Body3 color={theme.color.gray[500]}>
                          {comment.wr_view}
                        </Body3>
                      </Style.List.Bottom.Badge>
                      <Style.List.Bottom.Badge>
                        <IconComment size={16} color={theme.color.gray[500]} />
                        <Body3 color={theme.color.gray[500]}>
                          {comment.replycount}
                        </Body3>
                      </Style.List.Bottom.Badge>
                    </Style.List.Bottom.Info>
                    <Body3 color={theme.color.gray[500]}>
                      {comment.create > 24
                        ? `${Math.ceil(comment.create / 24)}일전`
                        : comment.create > 0
                        ? `${comment.create}시간전`
                        : `방금전`}
                    </Body3>
                  </Style.List.Bottom.Container>
                </Style.List.Container>
                {replydata.wr_parent2 == comment.idx ? (
                  <Style.AddComment.Container>
                    <Style.AddComment.TextArea
                      rows={3}
                      name={"wr_content"}
                      onChange={onChangeTextareaReply}
                      value={replydata.wr_content}
                    />
                    <Style.AddComment.Button>
                      <Button
                        variants="solid"
                        color="primary"
                        onClick={onClickWriteReply}
                      >
                        작성하기
                      </Button>
                      <Button
                        onClick={e => {
                          onClickReply(e, comment.idx);
                        }}
                      >
                        취소
                      </Button>
                    </Style.AddComment.Button>
                  </Style.AddComment.Container>
                ) : (
                  ""
                )}

                {comment.wr_reply.map((item: any) => {
                  return item;
                })}
              </>
            );
          })
        ) : (
          <Loader color={"black"} />
        )}
      </Style.Comment>
      {/* <Pagination /> */}
    </Style.Container>
  );
};

export default Comment;
