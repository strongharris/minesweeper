import { StyleProvider } from 'cf-style-nextjs';
import { createComponent } from 'cf-style-container';
import Button from './Button';

const Center = createComponent(({ theme }) => ({
  margin: theme.space[4],
}));

const Header = createComponent(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minHeight: '6rem',
  padding: `0 ${theme.space[2]}px`,
  boxShadow: '1px 2px 18px 0px rgba(0,0,0,0.25)',
  marginBottom: '2rem',
}));

const Title = createComponent(({ theme }) => ({
  height: 50,
  width: 50,
}), 'div');

const Timer = createComponent(({ theme }) => ({
  marginRight: theme.space[4],
  marginLeft: theme.space[2],
  color: theme.colorGray,
}), 'h1');

export default ({ children, status, title, reset, elapsed, handleModal }) => (
  <StyleProvider>
    <Center>
      <Header>
        <Title>{title}</Title>
        {status !== 'idle' && <Timer>{elapsed}</Timer>}
        <Button onClick={reset}>Reset</Button>
        <Button onClick={() => handleModal('setting')}>Setting</Button>
        <Button onClick={() => handleModal('scoreBoard')}>High Score</Button>
      </Header>
      {children}
    </Center>
  </StyleProvider>
);
