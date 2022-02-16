import Button from "@components/elements/button";
import Logo from "@components/elements/logo";
import TextField from "@components/elements/text-field";
import { IconMenu, IconProfile, IconSearch } from "@components/icons";
import {
  CategoryNavigation,
  globalNavigationMore,
  globalNavigationMy,
  InsightNavigation,
  TopicNavigation,
  UserNavigation,
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
  width: 15rem;
  top: 0;
  min-height: 50rem;
  background-color: ${props => props.theme.color.white};
  box-shadow: ${props => props.theme.shadow.inset.bottom};
  display: flex;
  flex-direction: column;
  z-index: 10;
  ${props => props.theme.screen.md} {
    max-width: 50rem;
    padding: 1.25rem 0;
    border: 1px solid ${props => props.theme.color.gray[300]};
    border-radius: ${props => props.theme.rounded.xxl};
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 0.5rem 0.25rem;
  ${props => props.theme.screen.md} {
    padding: 0 3rem 0.05rem;
  }
  display: flex;
  align-items: center;
  flex-direction: column;
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
  // flex-wrap: wrap;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
`;

const NavItem = styled.div<IPropsNavItem>`
  // padding: 0 0.75rem;
  font-size: 1.25rem;
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
`;

const NavItem2 = styled.div<IPropsNavItem>`
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
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
      ? `inset 0px -4px 0px ${props.theme.color.blue[200]}`
      : "none"};
`;

const SideBar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/login");
      console.log(status);
    }
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
        {isDesktop && (
          <Nav>
            {CategoryNavigation.map((nav, idx) =>
              idx == 0 ? (
                <NavItem
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={router.pathname === nav.url}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem>
              ) : (
                <NavItem2
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={router.pathname === nav.url}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem2>
              ),
            )}
          </Nav>
        )}
        {isDesktop && (
          <Nav>
            {TopicNavigation.map((nav, idx) =>
              idx == 0 ? (
                <NavItem
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={router.pathname === nav.url}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem>
              ) : (
                <NavItem2
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={router.pathname === nav.url}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem2>
              ),
            )}
          </Nav>
        )}
        {isDesktop && (
          <Nav>
            {InsightNavigation.map((nav, idx) =>
              idx == 0 ? (
                <NavItem
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={router.pathname === nav.url}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem>
              ) : (
                <NavItem2
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={router.pathname === nav.url}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem2>
              ),
            )}
          </Nav>
        )}
        {isDesktop && (
          <Nav>
            {UserNavigation.map((nav, idx) =>
              idx == 0 ? (
                <NavItem
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={router.pathname === nav.url}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem>
              ) : (
                <NavItem2
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={router.pathname === nav.url}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem2>
              ),
            )}
          </Nav>
        )}
      </Wrapper>
    </Container>
  );
};

export default SideBar;
