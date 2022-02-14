import styled from "@emotion/styled";

interface IPropsContainer {
  width: string;
  size: string;
  isRight: boolean;
}

interface IPropsItem {
  size: string;
}

const Container = styled.div<IPropsContainer>`
  position: absolute;
  top: calc(100% - 0.5rem);
  left: ${props => (props.isRight ? "auto" : "0")};
  right: ${props => (props.isRight ? "0" : "auto")};
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
  padding: ${props => (props.size === "large" ? "0.75rem 0" : "0.5rem 0")};
  border-radius: ${props =>
    props.size === "large" ? props.theme.rounded.lg : props.theme.rounded.md};
  background-color: ${props => props.theme.color.white};
  border: 1px solid ${props => props.theme.color.gray[300]};
  box-shadow: ${props => props.theme.shadow.md};
  z-index: 10;
`;

const Item = styled.div<IPropsItem>`
  padding: ${props => (props.size === "large" ? "0.75rem" : "0.5rem 0.75rem")};
  font-size: ${props => props.theme.fontSize.body2};
  line-height: ${props => props.theme.lineHeight.body2};
  text-align: left;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: ${props => props.theme.color.gray[100]};
  }
`;

interface IPropsMenu {
  id: number;
  content: string;
  url: string;
}

interface IPropsDropdown {
  width?: string;
  size?: string;
  isRight?: boolean;
  menu: IPropsMenu[];
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Dropdown = ({
  width = "12rem",
  size = "large",
  menu,
  isRight = false,
  onClick,
}: IPropsDropdown) => {
  return (
    <Container width={width} size={size} isRight={isRight}>
      {menu.map(item => (
        <Item size={size} key={item.id} date-value={item.url} onClick={onClick}>
          {item.content}
        </Item>
      ))}
    </Container>
  );
};

export default Dropdown;
