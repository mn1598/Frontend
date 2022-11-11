import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@material-ui/core/TextField';
import { Container,Paper,Button } from '@material-ui/core'
import Grid from '@mui/material/Grid';


const useStyles = styled((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    }
}));

export default function Home() {
    const classes = useStyles();
    const paperStyle = {padding: '50px 20px', width:"600", margin:'20px auto'};
    const [name,setName]=useState('');
    const [address,setAddress]=useState('');
    const [students,setStudent]=useState([]);

    const handleClick=(e) => {
        e.preventDefault();
        const student={name,address};
        fetch("http://localhost:8080/student/add", {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(student)
        }).then(()=>{
            console.log("success");
        })
    }

    useEffect(() => {
        fetch('http://localhost:8080/student/getAll')
                .then(res=>res.json())
                .then((result)=>{
                    setStudent(result);
                });       
    });

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

  return (

    <Container>
        <h1>
            RoomChecker
        </h1>
        <h3>Todays Actions</h3>

        <Paper elevation={3} style={paperStyle}>
            <Grid container rowSpacing={1} columnSpacing={2} columns={6} justifyContent="center">
                <Grid item xs={2}>
                    <Item>Arrivals</Item>
                </Grid>
                <Grid item xs={2}>
                    <Item>Departures</Item>
                </Grid>
            </Grid>
            {students.map(student=>(
                <Paper elevation={6} style={{margin:'10px',padding:'15px',textAlgign:'left'}} key={student.id}>
                    Id: {student.id} <br/>
                    Name: {student.name} <br/>
                    Address: {student.address}
                </Paper>
            ))}
        </Paper>

        <Paper elevation={3} style={paperStyle}>
            <form className={classes.root}
            noValidate
            autoComplete="off"
            >
                Check Availability
                <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}/>
                <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}/>
                <Button variant="contained" color="secondary" onClick={handleClick}>
                    Submit
                </Button>
            </form>
        </Paper> 
    </Container>
  );
}
