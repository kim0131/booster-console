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

interface IPropsComment {
  children?: React.ReactNode;
}

const Comment = ({}: IPropsComment) => {
  return (
    <Style.Container>
      <Style.Comment>
        <Style.AddComment.Container>
          <Header5>40개의 댓글</Header5>
          <Style.AddComment.TextArea rows={3} />
          <Style.AddComment.Button>
            <Button variants="solid" color="primary">
              작성하기
            </Button>
            <Button>취소</Button>
          </Style.AddComment.Button>
        </Style.AddComment.Container>
        <Style.List.Container isReply={false}>
          <Style.List.Header>
            <Style.List.Content>저도 잘 모릅니다. ㅎㅎㅎㅎ</Style.List.Content>
            <Style.List.Button>
              <IconMoreVertical size={20} color={theme.color.gray[500]} />
            </Style.List.Button>
          </Style.List.Header>
          <Style.List.Bottom.Container>
            <Style.List.Bottom.Info>
              <Style.List.Bottom.Badge>
                <IconProfile size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>물리돌이</Body3>
              </Style.List.Bottom.Badge>
              <Style.List.Bottom.Badge>
                <IconLike size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>12</Body3>
              </Style.List.Bottom.Badge>
              <Style.List.Bottom.Badge>
                <IconView size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>1,200</Body3>
              </Style.List.Bottom.Badge>
              <Style.List.Bottom.Badge>
                <IconComment size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>23</Body3>
              </Style.List.Bottom.Badge>
            </Style.List.Bottom.Info>
            <Body3 color={theme.color.gray[500]}>3일 전</Body3>
          </Style.List.Bottom.Container>
        </Style.List.Container>
        <Style.List.Container isReply={false}>
          <Style.List.Header>
            <Style.List.Content>저도 잘 모릅니다. ㅎㅎㅎㅎ</Style.List.Content>
            <Style.List.Button>
              <IconMoreVertical size={20} color={theme.color.gray[500]} />
            </Style.List.Button>
          </Style.List.Header>
          <Style.List.Bottom.Container>
            <Style.List.Bottom.Info>
              <Style.List.Bottom.Badge>
                <IconProfile size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>물리돌이</Body3>
              </Style.List.Bottom.Badge>
              <Style.List.Bottom.Badge>
                <IconLike size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>12</Body3>
              </Style.List.Bottom.Badge>
              <Style.List.Bottom.Badge>
                <IconView size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>1,200</Body3>
              </Style.List.Bottom.Badge>
              <Style.List.Bottom.Badge>
                <IconComment size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>23</Body3>
              </Style.List.Bottom.Badge>
            </Style.List.Bottom.Info>
            <Body3 color={theme.color.gray[500]}>3일 전</Body3>
          </Style.List.Bottom.Container>
        </Style.List.Container>
        <Style.List.Container isReply>
          <Style.List.Header>
            <Style.List.Content>저도 잘 모릅니다. ㅎㅎㅎㅎ</Style.List.Content>
            <Style.List.Button>
              <IconMoreVertical size={20} color={theme.color.gray[500]} />
            </Style.List.Button>
          </Style.List.Header>
          <Style.List.Bottom.Container>
            <Style.List.Bottom.Info>
              <Style.List.Bottom.Badge>
                <IconProfile size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>물리돌이</Body3>
              </Style.List.Bottom.Badge>
              <Style.List.Bottom.Badge>
                <IconLike size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>12</Body3>
              </Style.List.Bottom.Badge>
              <Style.List.Bottom.Badge>
                <IconView size={16} color={theme.color.gray[500]} />
                <Body3 color={theme.color.gray[500]}>1,200</Body3>
              </Style.List.Bottom.Badge>
            </Style.List.Bottom.Info>
            <Body3 color={theme.color.gray[500]}>3일 전</Body3>
          </Style.List.Bottom.Container>
        </Style.List.Container>
      </Style.Comment>
      {/* <Pagination /> */}
    </Style.Container>
  );
};

export default Comment;
