import '../../styles/button.styles.scss';

const BUTTON_TYPES_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
}

const Button = ({ children, buttonType, ...otherPops }) => {
    return (
        <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}{...otherPops}>
            {children}
        </button>)
};
export default Button;