import { useState, useEffect, useRef } from 'react';
import { faCheck, faTimes, faInfoCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Register() {
    
    const usernameRegex = /^[a-z0-9_-]{3,15}$/;//Alphanumeric string that may include _ and - having a length of 3 to 16 characters.
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/; //Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character
    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);
    
    useEffect(() => {
        setUsernameValid(usernameRegex.test(username));
    }, [username]);
    
    useEffect(() => {
        setPasswordValid(passwordRegex.test(password))
    }, [password]);
    
    useEffect(() => {
        setPasswordConfirmValid(password === passwordConfirm && passwordValid)
    }, [password, passwordConfirm]);

    return (
        <section className='body'>
            <form className='form' onClick={(e) => {

                if (e.button == 2) { e.preventDefault() };
            }}>
                <h1 className='header'>Register</h1>
                <label htmlFor="username" className='label'>
                    Username:
                    <FontAwesomeIcon
                        icon={username && (usernameValid ? faCheck : faTimes)}
                        className={usernameValid ? 'check' : 'cross'} />
                </label>
                <input
                    type="text"
                    ref={inputRef}
                    name='username'
                    className='input'
                    autoComplete='off'
                    onBlur={() => setUsernameFocus(false)}
                    onFocus={() => setUsernameFocus(true)}
                    onChange={(e) => setUsername(e.target.value)} />
                <p className={
                    username && !usernameValid && usernameFocus
                        ? 'info'
                        : 'hidden'}>
                    <FontAwesomeIcon className='info-icon' icon={faInfoCircle} />Alphanumeric, may include _ and - length of 3 to 16 characters.</p>

                <label htmlFor="password" className='label'>
                    Password:


                    <FontAwesomeIcon
                        icon={password && (passwordValid ? faCheck : faTimes)}
                        className={passwordValid ? 'check' : 'cross'} />
                </label>
                <div className="input-container">
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={() => setShowPassword(!showPassword)}
                        className='show-icon' />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        className='input-password'
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocus(true)} />
                </div>

                <p className={
                    password && !passwordValid && passwordFocus
                        ? 'info'
                        : 'hidden'}>
                    <FontAwesomeIcon className='info-icon' icon={faInfoCircle} />Must include uppercase, lowercase, number and one special character. Length of minimum 8 characters.</p>
                <label htmlFor="passwordConfirm" className='label'>
                    Confirm password:
                    <FontAwesomeIcon
                        icon={password && (passwordConfirmValid ? faCheck : faTimes)}
                        className={passwordConfirmValid ? 'check' : 'cross'} />
                </label>
                <input type="password" name='passwordConfirm' className='input' onChange={(e) => setPasswordConfirm(e.target.value)} />
                <p className={
                    passwordConfirm && !passwordConfirmValid
                        ? 'info'
                        : 'hidden'}>
                    <FontAwesomeIcon className='info-icon' icon={faInfoCircle} />Must match the password.</p>
                <button className='Registerbutton' disabled={!usernameValid && !passwordValid && !passwordConfirmValid} >Sign In</button>
                <p className='attention'>Already have an account?
                    <a href='#' className='link'>Login!
                    </a>
                </p>


            </form>
        </section>
    )
}

export default Register