import { Button, Select } from 'antd';
import styled from 'styled-components';

export const GeneralContainer = styled.div<{
  theme: { background: string; text: string };
}>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid red 3px;
  margin-right: 32px;
`;
