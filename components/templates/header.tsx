import Button from "@components/elements/button";
import Logo from "@components/elements/logo";
import TextField from "@components/elements/text-field";
import { IconMenu, IconProfile, IconSearch } from "@components/icons";
import {
  globalNavigationMore,
  globalNavigationMy,
} from "@core/config/navigation";
import useDesktop from "@core/hook/use-desktop";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Dropdown from "@components/elements/dropdown";
import { accountsNavigation } from "@core/config/navigation";
import theme from "@components/styles/theme";

interface IPropsNavItem {
  isRoute?: boolean;
}

const Container = styled.header`
  position: sticky;
  width: 100%;
  top: 0;
  background-color: ${props => props.theme.color.white};
  box-shadow: ${props => props.theme.shadow.inset.bottom};
  display: flex;
  flex-direction: column;
  z-index: 20;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 0.5rem 1.25rem;
  ${props => props.theme.screen.md} {
    padding: 0 3rem;
  }
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const MobileWrapper = styled.div`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding-right: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const NavItem = styled.div<IPropsNavItem>`
  height: 3rem;
  ${props => props.theme.screen.md} {
    height: 3.5rem;
  }
  padding: 0 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  &:hover {
    box-shadow: ${props =>
      props.isRoute
        ? `inset 0px -4px 0px ${props.theme.color.blue[600]}`
        : `inset 0px -4px 0px ${props.theme.color.gray[300]}`};
  }
  box-shadow: ${props =>
    props.isRoute
      ? `inset 0px -4px 0px ${props.theme.color.blue[600]}`
      : "none"};
`;

const NavMore = styled.div`
  height: 3.5rem;
  padding: 0 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  box-shadow: none;
  & > div {
    display: none;
  }
  &:hover {
    & > div {
      display: block;
    }
  }
`;

const ProfileWrapper = styled.div`
  height: 3.5rem;
  position: relative;
  display: flex;
  align-items: center;
  & > div {
    display: none;
  }
  &:hover {
    & > div {
      display: block;
    }
  }
`;

const Util = styled.div`
  flex: 1 1 0%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
`;

const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/login");
      console.log(status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const { isDesktop } = useDesktop();

  const onClickLink = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement | SVGElement>,
  ) => {
    e.preventDefault();
    const link: string | undefined = e.currentTarget.dataset.value;
    const content: string | null = e.currentTarget.textContent;
    if (status == "authenticated") {
      if (link) {
        link === "logout" ? console.log("logout") : router.push(link);
      }

      if (content) {
        content === "로그아웃"
          ? signOut({
              redirect: false,
            })
          : "";
      }
    } else {
      alert("이동할 수 없습니다.");
    }
  };
  return (
    <Container>
      <Wrapper>
        <Logo onClick={onClickLink} />

        <Util>
          {status == "authenticated" ? (
            // isDesktop && (
            <ProfileWrapper>
              <Button variants="ghost" size="small">
                <IconProfile />
              </Button>
              <Dropdown
                menu={globalNavigationMy}
                isRight
                onClick={onClickLink}
              />
            </ProfileWrapper>
          ) : (
            // )
            <Button
              variants="ghost"
              size="small"
              onClick={onClickLink}
              dataValue={accountsNavigation[0].url}
            >
              {accountsNavigation[0].content}
            </Button>
          )}
          {!isDesktop && (
            <Button variants="ghost" size="small">
              <IconSearch />
            </Button>
          )}
        </Util>
      </Wrapper>
    </Container>
  );
};

export default Header;
