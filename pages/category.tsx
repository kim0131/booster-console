import Button from "@components/elements/button";
import TextField from "@components/elements/text-field";
import { Body1, Body2, Header4 } from "@components/elements/types";
import AccountsLayout from "@components/layouts/accounts/accounts-layout";
import theme from "@components/styles/theme";
import { accountsDescription } from "@core/config/description";
import { accountsNavigation } from "@core/config/navigation";
import { IAccountsData } from "@core/interfaces/accounts";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useState } from "react";

interface IStateAccounts {
  data: { [key in string]: string };
  invalid?: string;
  isLoading: boolean;
}

const Category: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState<IStateAccounts>({
    data: {
      bo_table: "",
      bo_subject: "",
    },
    invalid: "",
    isLoading: false,
  });

  const onClickLink = (
    e: React.MouseEvent<HTMLButtonElement | HTMLParagraphElement>,
  ) => {
    e.preventDefault();
    const link = e.currentTarget.dataset.value;
    link && router.push(link);
  };

  const onChangeAccounts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setState({
      ...state,
      data: {
        ...state.data,
        [name]: value,
      },
      invalid: "",
    });
    console.log(state.data);
  };

  const onClickSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setState({ ...state, isLoading: true });
    window.open(
      `https://translate.google.com/?hl=ko&sl=ko&tl=en&op=translate&text=${state.data.bo_subject}`,
      "_blank",
    );
    setState({ ...state, isLoading: false });
  };

  const onClickCategory = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setState({ ...state, isLoading: true });
    await axios.post("/api2/category/create", {
      bo_subject: state.data.bo_subject,
      bo_table: state.data.bo_table,
    });
    setState({ ...state, isLoading: false });
  };
  return (
    <>
      {" "}
      <AccountsLayout
        title={
          <>
            <Header4>게시판 카테고리 생성</Header4>
          </>
        }
        section1={
          <>
            <TextField
              placeholder="카테고리 이름"
              name="bo_subject"
              type="text"
              size="large"
              width="100%"
              onChange={onChangeAccounts}
            />
            <TextField
              placeholder="카테고리 영문"
              name="bo_table"
              size="large"
              onChange={onChangeAccounts}
            />

            {state.invalid && (
              <Body2 color={theme.color.red[600]}>{state.invalid}</Body2>
            )}
          </>
        }
        section2={
          <>
            <Button
              variants="solid"
              color="primary"
              size="large"
              isLoading={state.isLoading}
              onClick={onClickSearch}
            >
              영문조회
            </Button>
            <Button
              variants="light"
              color="primary"
              size="large"
              isDisabled={
                state.data.bo_subject && state.data.bo_table ? false : true
              }
              isLoading={state.isLoading}
              onClick={onClickCategory}
            >
              게시판 생성
            </Button>
          </>
        }
      />
    </>
  );
};

export default Category;
