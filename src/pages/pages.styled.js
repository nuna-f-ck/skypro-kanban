import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.mainBackground};
`;

export const CenterPage = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px 16px;

  background-color: ${(props) => props.theme.mainBackground};
`;

export const PageModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 400px;

  padding: 40px 60px;

  background-color: ${(props) => props.theme.cardBackground};

  border-radius: 10px;

  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
`;

export const PageTitle = styled.h1`
  margin-bottom: 30px;

  color: ${(props) => props.theme.title};

  font-size: 24px;
  line-height: 1.2;
  font-weight: 700;
`;

export const Form = styled.form`
  width: 100%;
  margin-bottom: 25px;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;

  margin-bottom: 10px;
  padding: 0 12px;

  border: 1px solid #d4dbe5;
  border-radius: 6px;

  outline: none;

  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.cardBackground};

  font-size: 14px;

  &:focus {
    border-color: #565eef;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 150px;

  margin-bottom: 20px;
  padding: 12px;

  resize: vertical;

  border: 1px solid #d4dbe5;
  border-radius: 6px;

  outline: none;

  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.cardBackground};

  font-size: 14px;

  &:focus {
    border-color: #565eef;
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  min-height: 40px;
  margin-top: 15px;

  border: none;
  border-radius: 6px;

  background-color: #565eef;
  color: #ffffff;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background-color: #33399b;
  }
`;

export const SecondaryButton = styled.button`
  min-height: 40px;

  padding: 0 20px;

  border: 1px solid #565eef;
  border-radius: 6px;

  background-color: transparent;
  color: #565eef;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background-color: #565eef;
    color: #ffffff;
  }
`;

export const LinkButton = styled.button`
  padding: 0;

  border: none;
  background: transparent;

  color: #565eef;

  font-size: 14px;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Description = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 20px;

  color: #94a6be;

  font-size: 14px;
  line-height: 20px;

  & a {
    color: #94a6be;
    text-decoration: underline;
    }
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const NotFoundTitle = styled.h1`
  margin-bottom: 15px;

  color: ${(props) => props.theme.title};

  font-size: 48px;
  font-weight: 700;
`;

export const NotFoundText = styled.p`
  margin-bottom: 25px;

  color: ${(props) => props.theme.text};

  font-size: 18px;
`;
