import { Body1, Header4 } from "@components/elements/types";

import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  padding: 3rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: auto;
  ${props => props.theme.screen.md} {
    max-width: 60rem;
    margin: 3rem 1rem;
    padding: 2.25rem;
    border: 1px solid ${props => props.theme.color.gray[300]};
    border-radius: ${props => props.theme.rounded.xxl};
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
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
const Block3 = styled.div`
  display: flex;
  background-color: #f4f4f5;
  gap: 0.75rem;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0.1rem;
`;
const Find = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;
const TopiclayOut = styled.div`
  display: flex;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
`;

interface IPropsAccountsLayout {
  title?: React.ReactNode;
  section1?: React.ReactNode;
  section2?: React.ReactNode;
  section3?: React.ReactNode;
  section4?: React.ReactNode;
  find?: React.ReactNode;
  topicContent?: React.ReactNode;
  buttonContainer?: React.ReactNode;
}

const AccountsLayout = ({
  title,
  section1,
  section2,
  section3,
  section4,
  find,
  topicContent,
  buttonContainer,
}: IPropsAccountsLayout) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      {section1 && <Block3>{section1}</Block3>}
      {section4 && <Block>{section4}</Block>}
      {section2 && <Block>{section2}</Block>}
      {section3 && <Block2>{section3}</Block2>}
      {find && <Find>{find}</Find>}
      {topicContent && <TopiclayOut>{topicContent}</TopiclayOut>}
      {buttonContainer && <ButtonContainer>{buttonContainer}</ButtonContainer>}
    </Container>
  );
};

export default AccountsLayout;
