import { css } from "styled-components";

// @media only screen and (max-width: 380px) {

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 768px) {
      ${props}
    }
  `;
};