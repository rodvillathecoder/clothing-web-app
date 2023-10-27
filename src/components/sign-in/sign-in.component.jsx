import { useState, useEffect } from "react";
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    auth,
    signInAuthUserWithEmailAnsPassword,
} from "../../utils/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import '../../styles/sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
};
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormField = () => {
        setFormFields(defaultFormFields);
        alert("created account");
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getRedirectResult(auth);
            if (response) {
                await createUserDocumentFromAuth(response.user);
            }
        };

        fetchData();
    }, []);

    const SignInWithGoogle = async () => {

        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAnsPassword(email, password);
            console.log(response);
            resetFormField();
        } catch (error) {
            switch(error.code) {
                case "auth/wrong-password":
                    alert('Incorrect password for email');
                    break;
                case "auth/user-not-found":
                    alert('Not user associated with this email');
                    break;
                default:
                    console.log(error);
            }
         }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit">Sing In</Button>
                    <Button type="button" buttonType='google' onClick={SignInWithGoogle}>Google Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogleRedirect}>Google Redirect</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
