import React, { useState, useRef } from "react"

const containerStyles = {
    position: 'relative',
    width: '100%',
    backgroundColor: '#fff',
    minHeight: '98vh',
    overflow: 'hidden'
}

const signInStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: '75%',
    width: '50%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    zIndex: 5
}

const formContainerStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
}

const formStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0rem 5rem',
    transition: 'all 0.2s 0.7s',
    overflow: 'hidden',
    gridColumn: 1 / 2,
    gridRow: 1 / 2
}

function SignIn() {
    const [checked, setChecked] = useState(false); 

    const handleFormReset = () => {
        const signInForm = document.querySelector("form");
        signInForm.reset();
    };

    return (
        <>
            <div className="container" style={containerStyles}>
                <div className="form-container" style={formContainerStyles}>
                    <div className="signin" style={signInStyles}>
                        <form action="" className="sign-in-form" style={formStyles}>
                            <h2 className="title">Sign In</h2>
                            <div className="input-field">
                                <input type="text" placeholder="Username" id="username" required />
                            </div>
                            <div className="input-field">
                                <input type={checked ? 'password' : 'text'} placeholder="Password" id="password" required />
                            </div>
                            <div className="show-pass">
                                <input type="checkbox" name="show-password" value="show-password" id="show-password" />
                                <label for="show-password">show password</label>
                            </div>
                            <div className="form-btns">
                                <input type="submit" value="Sign In" className="btn" id="submit-btn" />
                                <input type="button" value="Clear" className="btn" id="clear-btn"  />
                            </div>
                        </form>
                    </div>
                </div>
                
                <div className="panel-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>First Time Here?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt debitis perferendis, at nostrum deleniti exercitationem.</p>
                            <button className="btn transparent" id="sign-up-btn">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;