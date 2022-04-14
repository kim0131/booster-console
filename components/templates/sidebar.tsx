import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { Body2 } from "@components/elements/types";
import { IconChevronDown } from "@components/icons";

import { useEffect } from "react";
import useDesktop from "@core/hook/use-desktop";

interface IPropsStyle {
  isRoute?: boolean;
}

const Style = {
  Desktop: {
    Container: styled.div`
      flex: none;
      width: 12rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 1rem;
    `,
    Category: {
      Container: styled.div`
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      `,
      Block: styled.div`
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      `,
      Button: styled.button<IPropsStyle>`
        padding: 0.5rem;
        border-radius: ${props => props.theme.rounded.md};
        background-color: ${props =>
          props.isRoute ? props.theme.color.blue[50] : "transparent"};
        color: ${props =>
          props.isRoute
            ? props.theme.color.blue[600]
            : props.theme.color.gray[900]};
        font-size: ${props => props.theme.fontSize.body2};
        font-weight: ${props => (props.isRoute ? 500 : 400)};
        line-height: ${props => props.theme.lineHeight.body2};
        text-align: left;
        &:hover,
        &:focus {
          outline: 0;
          background-color: ${props =>
            props.isRoute
              ? props.theme.color.blue[50]
              : props.theme.color.gray[100]};
        }
      `,
    },
  },
  Mobile: {
    Wrapper: styled.div`
      position: relative;
      width: 100%;
      height: 3.5rem;
      background-color: ${props => props.theme.color.white};
    `,
    Selectbox: styled.select`
      appearance: none;
      width: 100%;
      height: 3.5rem;
      padding: 0 1.25rem;
      background-color: ${props => props.theme.color.white};
      box-shadow: ${props => props.theme.shadow.inset.bottom};
      font-size: ${props => props.theme.fontSize.body2};
      line-height: ${props => props.theme.lineHeight.body2};
      color: ${props => props.theme.color.gray[900]};
      outline: 0;
      &:focus,
      &:active {
        outline: 0;
      }
    `,
    Icon: styled.div`
      position: absolute;
      top: 1rem;
      right: 1.25rem;
      width: 1.5rem;
      height: 1.5rem;
      pointer-events: none;
    `,
  },
};

const snbDatas = [
  {
    id: 1,
    category: "게시글",
    menus: [
      {
        id: 11,
        content: `토픽`,
        param: "topic",
        name: "토픽",
      },
      {
        id: 12,
        content: `인사이트`,
        param: "insight",
        name: "인사이트",
      },
    ],
  },
  {
    id: 2,
    category: "사용자",
    menus: [
      {
        id: 21,
        content: `회사인증`,
        param: "business",
        name: "회사인증",
      },
      {
        id: 22,
        content: `사용자 목록`,
        param: "user",
        name: "사용자 목록",
      },
    ],
  },
  {
    id: 3,
    category: "홈",
    menus: [
      {
        id: 31,
        content: `메인베너편집`,
        param: "home",
        name: "메인베너편집",
      },
      {
        id: 32,
        content: `카테고리 편집`,
        param: "category",
        name: "카테고리 편집",
      },
    ],
  },
  {
    id: 4,
    category: "광고",
    menus: [
      {
        id: 41,
        content: `광고베너편집`,
        param: "ads",
        name: "광고베너편집",
      },
    ],
  },
  {
    id: 5,
    category: "통계",
    menus: [
      {
        id: 51,
        content: `개발중....`,
        param: "",
        name: "개발중....",
      },
    ],
  },
];

const Snb = ({ category, searchTerm }: any) => {
  const { isDesktop } = useDesktop();
  const router = useRouter();

  const onClickRouter = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    e.preventDefault();
    const { value, name } = e.currentTarget;

    router.push(`/${value}`);
  };

  return isDesktop ? (
    <Style.Desktop.Container>
      {snbDatas.map((snbData: any) => (
        <Style.Desktop.Category.Container key={snbData.id}>
          <Body2 isBold>{snbData.category}</Body2>
          <Style.Desktop.Category.Block>
            {snbData.menus &&
              snbData.menus.map(
                (menu: { id: number; content: string; param: string }) => (
                  <Style.Desktop.Category.Button
                    key={menu.id}
                    isRoute={menu.param === router.pathname.slice(1)}
                    value={menu.param}
                    onClick={onClickRouter}
                  >
                    {menu.content}
                  </Style.Desktop.Category.Button>
                ),
              )}
          </Style.Desktop.Category.Block>
        </Style.Desktop.Category.Container>
      ))}
    </Style.Desktop.Container>
  ) : (
    <Style.Mobile.Wrapper>
      <Style.Mobile.Selectbox defaultValue={category} onChange={onClickRouter}>
        {snbDatas.map((snbData: any) => (
          <optgroup key={snbData.id} label={snbData.category}>
            {snbData.menus &&
              snbData.menus.map(
                (menu: { id: number; content: string; param: string }) => (
                  <option key={menu.id} value={menu.param}>
                    {menu.content}
                  </option>
                ),
              )}
          </optgroup>
        ))}
      </Style.Mobile.Selectbox>
      <Style.Mobile.Icon>
        <IconChevronDown />
      </Style.Mobile.Icon>
    </Style.Mobile.Wrapper>
  );
};

export default Snb;
