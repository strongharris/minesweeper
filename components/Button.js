import { createComponent } from 'cf-style-container';

const Button = createComponent(
  ({ theme, disabled, }) => ({
    width: 'auto',
    height: 40,
    padding: 10,
    margin: theme.space[2],
    border: `1px solid ${theme.colorBlack}`,
    cursor: 'pointer',
    borderRadius: `3px`,
    textAlign: 'center',
    fontSize: theme.fontSize,
  }),
  'button',
  ['onClick']
);

export default Button;
