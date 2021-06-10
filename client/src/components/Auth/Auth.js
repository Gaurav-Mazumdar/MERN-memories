import React, {useState} from 'react'
import {GoogleLogin} from 'react-google-login'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom';
import {Avatar, Typography, Paper, Button, Grid, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Input from './input';
import useStyles from './styles';
import Icon from './icon';
import {signup, signin} from '../../actions/auth'

const Auth = () => {
    const initState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''};

    const classes = useStyles();
    const [showPassword, SetShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState(initState)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => SetShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isSignUp){
            dispatch(signup(formData, history));
        }else{
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const switchMode = () =>{
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        handleShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type:'AUTH', data:{result, token}});
            history.push('/');
            
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = async (e) => {
        console.log(e.message);
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container className={classes.root} >
                        {
                            isSignUp && (
                                <div className={classes.fullName}>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />&nbsp;&nbsp;
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </div>
                            )
                        }
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            { isSignUp && ( <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> ) }
                    </Grid>
                    <Button type="Submit" variant="contained" color="primary" fullWidth className={classes.submit}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                    {!isSignUp &&
                        <GoogleLogin
                            clientId = "308708646121-ho9m4dc2uq39pth5a3borumf5sjnsh6d.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button 
                                    className={classes.googleButton} 
                                    color="primary" 
                                    fullWidth onClick={renderProps.onClick} 
                                    disabled={renderProps.disabled} 
                                    variant="contained" 
                                    startIcon={<Icon/>}>
                                Google Sign-In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                    }
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Click here to sign-in' : 'Dont have an account! Click here to sign-up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
