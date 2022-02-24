import styled from "@emotion/styled";

interface IPropsTypes {
  isLink?: boolean;
  isBold?: boolean;
  color?: string;
}

export const Header1 = styled.h1<IPropsTypes>`
  font-size: ${props => props.theme.fontSize.header1};
  line-height: ${props => props.theme.lineHeight.header1};
  font-weight: 700;
  color: ${props => (props.color ? props.color : "inherit")};
  cursor: ${props => (props.isLink ? "pointer" : "text")};
  &:hover,
  &:focus {
    text-decoration: ${props => (props.isLink ? "underline" : "none")};
  }
`;
export const Header2 = styled.h2<IPropsTypes>`
  font-size: ${props => props.theme.fontSize.header2};
  line-height: ${props => props.theme.lineHeight.header2};
  font-weight: 700;
  color: ${props => (props.color ? props.color : "inherit")};
  cursor: ${props => (props.isLink ? "pointer" : "text")};
  &:hover,
  &:focus {
    text-decoration: ${props => (props.isLink ? "underline" : "none")};
  }
`;
export const Header3 = styled.h3<IPropsTypes>`
  font-size: ${props => props.theme.fontSize.header3};
  line-height: ${props => props.theme.lineHeight.header3};
  font-weight: 700;
  color: ${props => (props.color ? props.color : "inherit")};
  cursor: ${props => (props.isLink ? "pointer" : "text")};
  &:hover,
  &:focus {
    text-decoration: ${props => (props.isLink ? "underline" : "none")};
  }
`;
export const Header4 = styled.h4<IPropsTypes>`
  font-size: ${props => props.theme.fontSize.header4};
  line-height: ${props => props.theme.lineHeight.header4};
  font-weight: 700;
  color: ${props => (props.color ? props.color : "inherit")};
  cursor: ${props => (props.isLink ? "pointer" : "text")};
  &:hover,
  &:focus {
    text-decoration: ${props => (props.isLink ? "underline" : "none")};
  }
`;
export const Header5 = styled.h5<IPropsTypes>`
  font-size: ${props => props.theme.fontSize.header5};
  line-height: ${props => props.theme.lineHeight.header5};
  font-weight: 700;
  color: ${props => (props.color ? props.color : "inherit")};
  cursor: ${props => (props.isLink ? "pointer" : "text")};
  &:hover,
  &:focus {
    text-decoration: ${props => (props.isLink ? "underline" : "none")};
  }
`;
export const Sub1 = styled.p<IPropsTypes>`
  font-size: ${props => props.theme.fontSize.sub1};
  line-height: ${props => props.theme.lineHeight.sub1};
  font-weight: ${props =>
    props.isBold ? "700" : props.isLink ? "500" : "400"};
  color: ${props => (props.color ? props.color : "inherit")};
  cursor: ${props => (props.isLink ? "pointer" : "text")};
  &:hover,
  &:focus {
    text-decoration: ${props => (props.isLink ? "underline" : "none")};
  }
`;
export const Sub2 = styled.p<IPropsTypes>`
  font-size: ${props => props.theme.fontSize.sub2};
  line-height: ${props => props.theme.lineHeight.sub2};
  font-weight: ${props =>
    props.isBold ? "700" : props.isLink ? "500" : "400"};
  color: ${props => (props.color ? props.color : "inherit")};
  cursor: ${props => (props.isLink ? "pointer" : "text")};
  &:hover,
  &:focus {
    text-decoration: ${props => (props.isLink ? "underline" : "none")};
  }
`;
export const Sub3 = styled.p<IPropsTypes>`
  font-size: ${props => props.theme.fontSize.sub3};
  line-height: ${props => props.theme.lineHeight.sub3};
  font-weight: ${props =>
    props.isBold ? "700" : props.isLink ? "500" : "400"};
  color: ${props => (props.color ? props.color : "inherit")};
  cursor: ${props => (props.isLink ? "pointer" : "text")};
  &:hover,
  &:focus {
    text-decoration: ${props => (props.isLink ? "underline" : "none")};
  }
`;
export const Body1 = styled.p<IPropsTypes>`
  font-size: ${props => props.theme.fontSize.body1};
  line-height: ${props => props.theme.lineHeight.body1};
  font-weight: ${props =>
    props.isBold ? "700" : props.isLink ? "500" : "400"};
  color: ${props => (props.color ? props.color : "inherit")};
  cursor: ${props => (props.isLink ? "pointer" : "text")};
  &:hover,
  &:focus {
    text-decoration: ${props => (props.isLink ? "underline" : "none")};
  }
`;
export const Body2 = styled.p<IPropsTypes>`
  font-size: ${props => props.theme.fontSize.body2};
  line-height: ${props => props.theme.lineHeight.body2};
  font-weight: ${props =>
    props.isBold ? "700" : props.isLink ? "500" : "400"};
  color: ${props => (props.color ? props.color : "inherit")};
  cursor: ${props => (props.isLink ? "pointer" : "text")};
  &:hover,
  &:focus {
    text-decoration: ${props => (props.isLink ? "underline" : "none")};
  }
`;
export const Body3 = styled.p<IPropsTypes>`
  font-size: ${props => props.theme.fontSize.body3};
  line-height: ${props => props.theme.lineHeight.body3};
  font-weight: ${props =>
    props.isBold ? "700" : props.isLink ? "500" : "400"};
  color: ${props => (props.color ? props.color : "inherit")};
  cursor: ${props => (props.isLink ? "pointer" : "text")};
  &:hover,
  &:focus {
    text-decoration: ${props => (props.isLink ? "underline" : "none")};
  }
`;
