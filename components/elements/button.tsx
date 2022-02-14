import styled from "@emotion/styled";
import Loader from "./loader";

// Style
interface IPropsContainer {
  variants: string;
  size: string;
  color: string;
  isLoading: boolean;
}

const Container = styled.button<IPropsContainer>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  pointer-events: ${props => (props.isLoading ? "none" : "auto")};
  height: ${props => {
    switch (props.size) {
      case "large":
        return "3rem";
      case "small":
        return "2rem";
      default:
        return "2.5rem";
    }
  }};
  background-color: ${props => {
    switch (props.variants) {
      case "light":
        switch (props.color) {
          case "primary":
            return props.theme.color.blue[50];
          case "success":
            return props.theme.color.green[50];
          case "danger":
            return props.theme.color.red[50];
          case "transparent":
            return "transparent";
          default:
            return props.theme.color.gray[100];
        }
      case "solid":
        switch (props.color) {
          case "primary":
            return props.theme.color.blue[600];
          case "success":
            return props.theme.color.green[600];
          case "danger":
            return props.theme.color.red[600];
          default:
            return props.theme.color.blue[600];
        }
      case "ghost":
        return "transparent";
    }
  }};
  color: ${props => {
    switch (props.variants) {
      case "light":
        switch (props.color) {
          case "primary":
            return props.theme.color.blue[600];
          case "success":
            return props.theme.color.green[600];
          case "danger":
            return props.theme.color.red[600];
          default:
            return props.theme.color.gray[900];
        }
      case "solid":
        return props.theme.color.white;
      case "ghost":
        switch (props.color) {
          case "primary":
            return props.theme.color.blue[600];
          case "success":
            return props.theme.color.green[600];
          case "danger":
            return props.theme.color.red[600];
          default:
            return props.theme.color.gray[900];
        }
    }
  }};
  border-width: 1px;
  border-color: ${props => {
    switch (props.variants) {
      case "light":
        switch (props.color) {
          case "primary":
            return props.theme.color.blue[50];
          case "success":
            return props.theme.color.green[50];
          case "danger":
            return props.theme.color.red[50];
          case "transparent":
            return "transparent";
          default:
            return props.theme.color.gray[100];
        }
      case "solid":
        switch (props.color) {
          case "primary":
            return props.theme.color.blue[600];
          case "success":
            return props.theme.color.green[600];
          case "danger":
            return props.theme.color.red[600];
          default:
            return props.theme.color.blue[600];
        }
      case "ghost":
        return props.theme.color.gray[300];
    }
  }};
  font-size: ${props => {
    switch (props.size) {
      case "large":
        return props.theme.fontSize.body1;
      case "small":
        return props.theme.fontSize.body3;
      default:
        return props.theme.fontSize.body2;
    }
  }};
  line-height: ${props => {
    switch (props.size) {
      case "large":
        return props.theme.lineHeight.body1;
      case "small":
        return props.theme.lineHeight.body3;
      default:
        return props.theme.lineHeight.body2;
    }
  }};
  padding-left: ${props => {
    switch (props.size) {
      case "large":
        return "13px";
      case "small":
        return "7px";
      default:
        return "9px";
    }
  }};
  padding-right: ${props => {
    switch (props.size) {
      case "large":
        return "13px";
      case "small":
        return "7px";
      default:
        return "9px";
    }
  }};
  border-radius: ${props => {
    switch (props.size) {
      case "large":
        return props.theme.rounded.md;
      case "small":
        return props.theme.rounded.xs;
      default:
        return props.theme.rounded.sm;
    }
  }};
  font-weight: 500;
  gap: ${props => {
    switch (props.size) {
      case "large":
        return "8px";
      case "small":
        return "4px";
      default:
        return "6px";
    }
  }};
  &:hover,
  &:focus {
    background-color: ${props => {
      switch (props.variants) {
        case "light":
          switch (props.color) {
            case "primary":
              return props.theme.color.blue[100];
            case "success":
              return props.theme.color.green[100];
            case "danger":
              return props.theme.color.red[100];
            default:
              return props.theme.color.gray[200];
          }
        case "solid":
          switch (props.color) {
            case "primary":
              return props.theme.color.blue[700];
            case "success":
              return props.theme.color.green[700];
            case "danger":
              return props.theme.color.red[700];
            default:
              return props.theme.color.blue[700];
          }
        case "ghost":
          return "transparent";
      }
    }};
    border-color: ${props => {
      switch (props.variants) {
        case "light":
          switch (props.color) {
            case "primary":
              return props.theme.color.blue[100];
            case "success":
              return props.theme.color.green[100];
            case "danger":
              return props.theme.color.red[100];
            default:
              return props.theme.color.gray[200];
          }
        case "solid":
          switch (props.color) {
            case "primary":
              return props.theme.color.blue[700];
            case "success":
              return props.theme.color.green[700];
            case "danger":
              return props.theme.color.red[700];
            default:
              return props.theme.color.blue[700];
          }
        case "ghost":
          return props.theme.color.gray[400];
      }
    }};
    outline: 0;
  }
  &:active {
    background-color: ${props => {
      switch (props.variants) {
        case "light":
          switch (props.color) {
            case "primary":
              return props.theme.color.blue[200];
            case "success":
              return props.theme.color.green[200];
            case "danger":
              return props.theme.color.red[200];
            default:
              return props.theme.color.gray[300];
          }
        case "solid":
          switch (props.color) {
            case "primary":
              return props.theme.color.blue[800];
            case "success":
              return props.theme.color.green[800];
            case "danger":
              return props.theme.color.red[800];
            default:
              return props.theme.color.blue[800];
          }
        case "ghost":
          return "transparent";
      }
    }};
    border-color: ${props => {
      switch (props.variants) {
        case "light":
          switch (props.color) {
            case "primary":
              return props.theme.color.blue[200];
            case "success":
              return props.theme.color.green[200];
            case "danger":
              return props.theme.color.red[200];
            default:
              return props.theme.color.gray[300];
          }
        case "solid":
          switch (props.color) {
            case "primary":
              return props.theme.color.blue[800];
            case "success":
              return props.theme.color.green[800];
            case "danger":
              return props.theme.color.red[800];
            default:
              return props.theme.color.blue[800];
          }
        case "ghost":
          switch (props.color) {
            case "primary":
              return props.theme.color.blue[500];
            case "success":
              return props.theme.color.green[500];
            case "danger":
              return props.theme.color.red[500];
            default:
              return props.theme.color.blue[500];
          }
      }
    }};
    outline: 0;
  }
  &:disabled {
    opacity: 0.25;
    pointer-events: none;
  }
  & > svg {
    width: ${props => {
      switch (props.size) {
        case "large":
          return "20px";
        case "small":
          return "16px";
        default:
          return "18px";
      }
    }};
    height: ${props => {
      switch (props.size) {
        case "large":
          return "20px";
        case "small":
          return "16px";
        default:
          return "18px";
      }
    }};
  }
  & > svg > path {
    fill: ${props => {
      switch (props.variants) {
        case "light":
          switch (props.color) {
            case "primary":
              return props.theme.color.blue[600];
            case "success":
              return props.theme.color.green[600];
            case "danger":
              return props.theme.color.red[600];
            default:
              return props.theme.color.gray[900];
          }
        case "solid":
          return props.theme.color.white;
        case "ghost":
          switch (props.color) {
            case "primary":
              return props.theme.color.blue[600];
            case "success":
              return props.theme.color.green[600];
            case "danger":
              return props.theme.color.red[600];
            default:
              return props.theme.color.gray[900];
          }
      }
    }};
  }
`;

// Component

interface IPropsButton {
  children?: React.ReactNode;
  variants?: string;
  size?: string;
  color?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  dataValue?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  variants = "light",
  size = "medium",
  color = "gray",
  isDisabled = false,
  isLoading = false,
  dataValue = undefined,
  onClick,
}: IPropsButton) => (
  <Container
    size={size}
    variants={variants}
    color={color}
    disabled={isDisabled}
    isLoading={isLoading}
    data-value={dataValue}
    onClick={isLoading ? undefined : onClick}
  >
    {isLoading ? (
      <Loader size={size} color={variants === "solid" ? "white" : color} />
    ) : (
      <>{children}</>
    )}
  </Container>
);

export default Button;
