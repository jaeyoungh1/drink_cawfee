import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { signUp } from '../../store/session';
import { Modal } from '../../context/Modal';
import x from '../../icons/x.svg'
import './loginForm.css'

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasSubmitLog, setHasSubmitLog] = useState(false);
    const [hasSubmitSign, setHasSubmitSign] = useState(false);
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');

    const [showLogin, setShowLogin] = useState(true)
    const [showSignup, setShowSignup] = useState(false)



    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const onSignUp = async (e) => {
        e.preventDefault();
        let errs = []
        if (first_name.length < 2) errs.push('First name must be at least 2 characters.')
        if (last_name.length < 2) errs.push('Last name must be at least 2 characters.')
        if (!email.includes('@') || !email.includes('.')) errs.push('Must sign up with a valid email.')
        if (password.length < 5) errs.push('Password must be at least 6 characters.')
        if (errs.length > 0) {
            setErrors(errs)
            setHasSubmitSign(true)
        }

        else if (password) {
            setHasSubmitSign(true);
            const data = await dispatch(signUp(first_name, last_name, email, password));
            if (data) {
                // console.log('SIGNUP ERRORS', data)
                setErrors([data.message ?? data.username])
            }
        }
    };


    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    // if (user) {
    //   return <Redirect to='/' />;
    // }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div id="login-modal">
                        <div className='login-header'>
                            <div className='signup-header-side header-top'
                                onClick={() => {
                                    setShowLogin(false)
                                    setShowSignup(true)
                                }}>
                                <h2 className='signup-title'>Sign Up</h2>
                                <div className='signup-header  header-line'></div>
                            </div>
                            <div className="login-header-side header-top"
                            onClick={() => {
                                setShowLogin(true)
                                setShowSignup(false)}}>
                                <h2 className="login-title">Log In</h2>
                                <div className='login-header header-line'></div>
                            </div>
                        </div>
                        {showLogin && <div className='login-signup-body'>
                            <form id='login-form' onSubmit={onLogin}>
                                <button
                                    className='demo-button'
                                    type='submit'
                                    onClick={() => {
                                        setEmail('chelseacat@user.io')
                                        setPassword('password')
                                    }}
                                >
                                    CONTINUE WITH DEMOUSER
                                </button>

                                <div id='modal-lines'><span className='or'>Or Sign In with Your Email</span></div>

                                {showModal && hasSubmitLog && errors.length > 0 && (
                                    <div id='modal-errors-box'>
                                        {errors.map((error, ind) => (
                                            <div id='modal-errors' key={ind}>{error}</div>
                                        ))}
                                    </div>
                                )}
                                <div className='login-input-wrapper'>
                                    <label className='login-input-label wrapper-first' for='login-input'>
                                        EMAIL
                                    </label>
                                    <input
                                        id='login-input'

                                        name='email'
                                        type='email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
                                        required={true}
                                    />
                                </div>
                                <div className='login-input-wrapper'>
                                    <label className='login-input-label' for='login-input'>
                                        PASSWORD
                                    </label>
                                    <input
                                        id='login-input'
                                        name='password'
                                        type='password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
                                        required={true}
                                    />
                                </div>
                                <button id='login-button' type='submit'>LOG IN</button>
                            </form>
                        </div>}
                        {showSignup && <div className='login-signup-body'>
                            <form onSubmit={onSignUp}>
                                {hasSubmitSign && showModal && errors.length > 0 && (
                                    <ul id='sign-up-errors-div-container'>
                                        {errors.map((error, ind) => (
                                            <li id='sign-up-errors' key={ind}>{error}</li>
                                        ))}
                                    </ul>
                                )}
                                <div className='login-input-wrapper'>
                                    <label className='login-input-label' for='login-input'>
                                        FIRST NAME*
                                    </label>
                                    <input
                                        id='login-input'
                                        type='text'
                                        name='firstname'
                                        onChange={e => setFirstname(e.target.value)}
                                        value={first_name}
                                        onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
                                        required={true}
                                    ></input>
                                </div>
                                <div className='login-input-wrapper'>
                                    <label className='login-input-label' for='login-input'>
                                        LAST NAME*
                                    </label>
                                    <input
                                        id='login-input'
                                        type='text'
                                        name='lastname'
                                        onChange={e => setLastname(e.target.value)}
                                        value={last_name}
                                        onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
                                        required={true}
                                    ></input>
                                </div>
                                <div className='login-input-wrapper'>
                                    <label className='login-input-label' for='login-input'>
                                        EMAIL*
                                    </label>
                                    <input
                                        id='login-input'
                                        type='email'
                                        name='email'
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
                                        required={true}
                                    ></input>
                                </div>
                                <div className='login-input-wrapper'>
                                    <label className='login-input-label' for='login-input'>
                                        PASSWORD*
                                    </label>
                                    <input
                                        id='login-input'
                                        type='password'
                                        name='password'
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
                                        required={true}
                                    ></input>
                                    <div className='login-input-label'>
                                        6 character minimum
                                    </div>
                                </div>
                                <button id='login-button' type='submit'>SIGN UP</button>
                            </form>
                        </div>}
                    </div>
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;