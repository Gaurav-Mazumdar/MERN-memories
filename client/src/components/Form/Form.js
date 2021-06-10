import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({currentId, setCurrentId}) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(currentId === 0){
            dispatch(createPost({...postData,  name: user?.result?.name})); // dispatch an action and pass all the data into the state 
        }
        else{
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(0);
        setPostData({title: '', message: '', tags: '', selectedFile: ''});
    }

    if(user?.result?.name){
        return (
            <Paper className= {classes.Paper} elevation={6}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                    <TextField 
                    label="Title" 
                    variant="outlined" 
                    name="title" 
                    value={postData.title} 
                    onChange={(e)=>setPostData({...postData, title: e.target.value})} 
                    fullWidth />
    
                    <TextField 
                    label="Message" 
                    variant="outlined" 
                    name="message" 
                    value={postData.message} 
                    onChange={(e)=>setPostData({...postData, message: e.target.value})} 
                    fullWidth />
    
                    <TextField 
                    label="Tags" 
                    variant="outlined" 
                    name="tags" 
                    value={postData.tags} 
                    onChange={(e)=>setPostData({...postData, tags: e.target.value.split(',')})} 
                    fullWidth />
    
                    <div className={classes.fileInput}>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                        />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        )
    }else{
        return <Paper className= {classes.paper} elevation={6}>
            <Typography variant="h5">Please login to create your own Post</Typography>
        </Paper>
    }
}

export default Form
