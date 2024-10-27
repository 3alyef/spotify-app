import styled from 'styled-components';
import { ThemeContract } from '../../../thems/thems';

const StyledContainer = styled.div<{ theme: ThemeContract }>`
  width: 100%;
  padding: 10px 0px;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 60px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: inline-flex;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
	&:active {
		scale: 0.99;
		opacity: 0.9;
	}
`;

const StyledText = styled.div`
  color: ${({ theme }) => theme.textColor.defaultWhite};
  font-size: 23px;
  font-weight: 400;
  word-wrap: break-word;
	user-select: none;
`;

interface PropsLoginBtn {
	textValue: string;
	onClick?: () => void;
}

export default function LoginBtn({ textValue, onClick }: PropsLoginBtn): JSX.Element {
	return (
		<StyledContainer onClick={onClick}>
			<StyledText>{textValue}</StyledText>
		</StyledContainer>
	);
}