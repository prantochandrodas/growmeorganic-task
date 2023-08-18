import { Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';

const Home = (): JSX.Element => {

    // get data by form
    const handelInfo = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            email: { value: string };
            name: { value: string };
            phone: { value: number }
        };
        const email = target.email.value; // typechecks!
        const name = target.name.value; // typechecks!
        const phone = target.phone.value; // typechecks!
        console.log(email, name, phone)

       

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