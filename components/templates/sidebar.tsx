/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@components/elements/button";
import Logo from "@components/elements/logo";
import TextField from "@components/elements/text-field";
import { IconMenu, IconProfile, IconSearch } from "@components/icons";
import {
  AdsNavigation,
  globalNavigationMore,
  globalNavigationMy,
  HomeNavigation,
  InsightNavigation,
  StatisticsNavigation,
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
  // margin: auto;
  ${props => props.theme.screen.md} {
    max-width: 50rem;
    padding: 1.25rem 0;
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
  gap: 1rem;
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
    color: ${props =>
      props.isRoute ? `${props.theme.color.blue[600]}` : "none"};
  }
  color: ${props =>
    props.isRoute ? `${props.theme.color.blue[600]}` : "none"};
`;

const NavItem2 = styled.div<IPropsNavItem>`
  padding: 0.25rem 0.75rem;
  font-size: 1rem;
  font-weight: 500;

  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  &:hover {
    color: ${props =>
      props.isRoute ? `${props.theme.color.blue[600]}` : "none"};
  }
  color: ${props =>
    props.isRoute ? `${props.theme.color.blue[600]}` : "none"};
`;

const BorderBottom = styled.div`
  width: 100%;
  border-bottom: 1px black solid;
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
  console.log(router.pathname);
  const CheckRouter = (url: string) => {
    if (router.pathname.includes(url)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Container>
      <Wrapper>
        {isDesktop && (
          <Nav>
            {TopicNavigation.map((nav, idx) =>
              idx == 0 ? (
                <NavItem
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={CheckRouter(nav.url)}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem>
              ) : (
                <NavItem2
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={CheckRouter(nav.url)}
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
                  isRoute={CheckRouter(nav.url)}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem>
              ) : (
                <NavItem2
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={CheckRouter(nav.url)}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem2>
              ),
            )}
          </Nav>
        )}
        <BorderBottom />
        {isDesktop && (
          <Nav>
            {UserNavigation.map((nav, idx) =>
              idx == 0 ? (
                <NavItem
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={CheckRouter(nav.url)}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem>
              ) : (
                <NavItem2
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={CheckRouter(nav.url)}
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
            {HomeNavigation.map((nav, idx) =>
              idx == 0 ? (
                <NavItem
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={CheckRouter(nav.url)}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem>
              ) : (
                <NavItem2
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={CheckRouter(nav.url)}
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
            {AdsNavigation.map((nav, idx) =>
              idx == 0 ? (
                <NavItem
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={CheckRouter(nav.url)}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem>
              ) : (
                <NavItem2
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={CheckRouter(nav.url)}
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
            {StatisticsNavigation.map((nav, idx) =>
              idx == 0 ? (
                <NavItem
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={CheckRouter(nav.url)}
                  onClick={onClickLink}
                >
                  {nav.content}
                </NavItem>
              ) : (
                <NavItem2
                  key={nav.id}
                  data-value={nav.url}
                  isRoute={CheckRouter(nav.url)}
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
