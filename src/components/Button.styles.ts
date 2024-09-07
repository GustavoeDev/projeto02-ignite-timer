import styled from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

// const buttonVariant = {
//   primary: "purple",
//   secondary: "blue",
//   danger: "red",
//   success: "green",
// };

export const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: 10px 30px;
  border: 0;
  border-radius: 8px;
  margin: 10px;
  font-weight: bold;

  background-color: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme["white"]};
`;

//${(props) => {
//return `background-color: ${buttonVariant[props.variant]};`;
//}}
