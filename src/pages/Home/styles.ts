import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

const ButtonBase = styled.button`
  width: 100%;
  padding: 1.125rem 0;

  border: 0;
  border-radius: 8px;

  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;
`;

export const StopButtonContainer = styled(ButtonBase)`
  background-color: ${(props) => props.theme["red-500"]};
  color: ${(props) => props.theme["white"]};

  &:hover {
    background-color: ${(props) => props.theme["red-700"]};
  }
`;

export const ButtonContainer = styled(ButtonBase)`
  background-color: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme["gray-100"]};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme["green-700"]};
  }
`;
