import { createComponentStyles, createComponent } from 'cf-style-container';

const containerStyles = ({ theme, open }) => ({
  display: open ? 'block' : 'none',
  position: 'fixed',
  zIndex: '1',
  paddingTop: theme.space[6],
  left: '0',
  top: '0',
  width: '100%',
  height: '100%',
  overflow: 'auto',
  backgroundColor: 'rgba(0,0,0,0.4)',
});

const contentStyles = ({ theme }) => {
  return ({
    backgroundColor: 'white',
    margin: 'auto',
    padding: theme.space[3],
    border: '1px solid black',
    width: '60%',
  })
};

const closeButtonStyles = ({ theme }) => ({
  color: 'grey',
  float: 'right',
  display: 'block',
  fontSize: theme.fontSizes[5],
  fontWeight: 'bold',
  '&:hover': {
    color: 'black',
    cursor: 'pointer',
    textDecoration: 'none',
  }
});


const Title = createComponent(({ theme }) => ({
  color: theme.colorGray
}), 'h3');


const Modal = ({ children, handleModal, title, styles }) => {
  return (
    <div className={styles.containerStyles}>
      <div className={styles.contentStyles}>
        <div className={styles.closeButtonStyles} onClick={handleModal}>&times;</div>
        <Title>{title}</Title>
        {children}
      </div>

    </div>
  );
}

export default createComponentStyles({ containerStyles, contentStyles, closeButtonStyles }, Modal);

