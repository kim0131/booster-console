import { NextPage } from "next";
import Button from "@components/elements/button";
import Table from "@components/elements/table/table-category";
import TextField from "@components/elements/text-field";
import { Body1, Body2, Header4 } from "@components/elements/types";
import AccountsLayout from "@components/layouts/accounts/accounts-layout";
import theme from "@components/styles/theme";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

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
  data: { [key in string]: string };
  invalid?: string;
  isLoading: boolean;
}

const CategoryCrate: NextPage = () => {
  const [state, setState] = useState<IStateAccounts>({
    data: {
      bo_table: "",
      bo_subject: "",
    },
    invalid: "",
    isLoading: false,
  });

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
      <AccountsLayout
        title={
          <>
            <Header4>카테고리 생성</Header4>
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

export default CategoryCrate;
