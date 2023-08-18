import { Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = (): JSX.Element => {
    const navigate=useNavigate();

    const [error,setError]=useState('')

    // get data by form
    const handelInfo = (event: React.SyntheticEvent) => {
        setError('')
        event.preventDefault();
        const target = event.target as typeof event.target & {
            email: { value: string };
            name: { value: string };
            phone: { value: number }
        };
        const email = target.email.value; // typechecks!
        const name = target.name.value; // typechecks!
        const phone = target.phone.value; // typechecks!

        interface UserObject {
          
            name: string;
            email: string;
            phone: number;
            // other properties
          }

          const obj:UserObject={
            name: name,
            email: email,
            phone: phone
          }

        //   localStorage set user object 
          localStorage.setItem('UserObject', JSON.stringify(obj));


        //   check if the object is exist or not 
          if(localStorage.getItem('UserObject')){
            navigate('/secondPage')
          }else{
            setError('Must enter your details before accessing the page');
          }
        }

    return (
        <div>
            {/* form  */}

            <div className="App">
                <Typography gutterBottom variant="h3" align="center">
                    GrowMeOrganic-Task
                </Typography>
                <Grid>
                    <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
                        <CardContent>

                            <Typography variant="body2" color="red" component="p" gutterBottom>
                            {error}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                                Fill up the form for more data
                            </Typography>
                            <form onSubmit={handelInfo}>
                                <Grid container spacing={1}>
                                    <Grid xs={12} sm={6} item>
                                        <TextField placeholder="Enter first name" label="First Name" name='name' variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField type="email" placeholder="Enter email" label="Email" name='email' variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField type="number" placeholder="Enter phone number" label="Phone" name='phone' variant="outlined" fullWidth required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        </div>
    );
};

export default Home;