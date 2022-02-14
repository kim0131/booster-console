import Button from "@components/elements/button";
import Logo from "@components/elements/logo";
import TextField from "@components/elements/text-field";
import { IconMenu, IconProfile, IconSearch } from "@components/icons";
import {
  globalNavigation,
  globalNavigationMore,
  globalNavigationMy,
} from "@core/config/navigation";
import useDesktop from "@core/hook/use-desktop";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Dropdown from "@components/elements/dropdown";
import { accountsNavigation } from "@core/config/navigation";
import theme from "@components/styles/theme";

interface IPropsNavItem {
  isRoute?: boolean;
}
console.log(theme);
const Container = styled.header`
  position: sticky;
  width: 100%;
  top: 0;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: ${(props) => props.theme.shadow.inset.bottom};
  display: flex;
  flex-direction: column;
  z-index: 10;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 0.5rem 1.25rem;
  ${(props) => props.theme.screen.md} {
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
  ${(props) => props.theme.screen.md} {
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
    box-shadow: ${(props) =>
      props.isRoute
        ? `inset 0px -4px 0px ${props.theme.color.blue[600]}`
        : `inset 0px -4px 0px ${props.theme.color.gray[300]}`};
  }
  box-shadow: ${(props) =>
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
  const { data: session, status } = useSession();

  const router = useRouter();
  const { isDesktop } = useDesktop();

  const onClickLink = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement | SVGElement>
  ) => {
    e.preventDefault();
    const link: string | undefined = e.currentTarget.dataset.value;
    const content: string | null = e.currentTarget.textContent;
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
  };
  return (
    <Container>
      <Wrapper>
        <Logo onClick={onClickLink} />
        {isDesktop && (
          <Nav>
            {globalNavigation.map((nav) => (
              <NavItem
                key={nav.id}
                data-value={nav.url}
                isRoute={router.pathname === nav.url}
                onClick={onClickLink}
              >
                {nav.content}
              </NavItem>
            ))}
            <NavMore>
              더보기
              <Dropdown menu={globalNavigationMore} onClick={() => {}} />
            </NavMore>
          </Nav>
        )}
        <Util>
          {isDesktop && (
            <TextField
              isRounded
              size="small"
              placeholder="검색"
              prefix={<IconSearch />}
            />
          )}
          <Button variants="solid" size="small">
            글쓰기
          </Button>
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
      {!isDesktop && (
        <MobileWrapper>
          <Nav>
            {globalNavigation.map((nav) => (
              <NavItem
                key={nav.id}
                data-value={nav.url}
                isRoute={router.pathname === nav.url}
                onClick={onClickLink}
              >
                {nav.content}
              </NavItem>
            ))}
          </Nav>
          <IconMenu />
        </MobileWrapper>
      )}
    </Container>
  );
};

export default Header;
