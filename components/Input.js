import { createComponentStyles, createComponent } from 'cf-style-container';

const containerStyles = ({ theme }) => ({
  margin: theme.space[1],
});

const labelStyles = ({ theme }) => ({
  marginRight: theme.space[3]
});

const inputStyles = ({ theme }) => ({
  padding: theme.space[1],
  fontSize: theme.inputFontSize,
  '&:focus': {
    outline: 'none',
    borderColor: theme.colorBlack,
  }
});

const Input = ({ label, type, onChange, value, styles }) => {
  return (
    <div className={styles.containerStyles}>
      <label className={styles.labelStyles}>{label}</label>
      <input className={styles.inputStyles} value={value} type={type} onChange={onChange} />
    </div>
  );
}

export default createComponentStyles({ containerStyles, labelStyles, inputStyles }, Input);

