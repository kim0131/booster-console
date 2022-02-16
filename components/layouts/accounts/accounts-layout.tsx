import { Body1, Header4 } from "@components/elements/types";
import { accountsDescription } from "@core/config/description";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  padding: 3rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  ${props => props.theme.screen.md} {
    // max-width: 50rem;
    margin: 3rem 1rem;
    padding: 2.25rem;
    border: 1px solid ${props => props.theme.color.gray[300]};
    border-radius: ${props => props.theme.rounded.xxl};
  }
`;

const Block = styled.div`
  display: flex;
  // flex-direction: column;
  gap: 0.75rem;
`;
const Block2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Find = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

interface IPropsAccountsLayout {
  title?: React.ReactNode;
  section1?: React.ReactNode;
  section2?: React.ReactNode;
  section3?: React.ReactNode;
  find?: React.ReactNode;
}

const AccountsLayout = ({
  title,
  section1,
  section2,
  section3,
  find,
}: IPropsAccountsLayout) => {
  return (
    <Container>
      {title && <Block>{title}</Block>}
      {section1 && <Block>{section1}</Block>}
      {section2 && <Block2>{section2}</Block2>}
      {section3 && <Block>{section3}</Block>}
      {find && <Find>{find}</Find>}
    </Container>
  );
};

export default AccountsLayout;
