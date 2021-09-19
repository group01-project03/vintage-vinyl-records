import React from 'react';

const Copyright = () => {
  return (
    <Typography variant="caption" color="#fff">
      {'Copyright © '}

      {'Vintage Vinyl Records '}

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: '#222',
    color: 'white',
  },
  social: {
    backgroundColor: '#333',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="xl">
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Copyright />
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};
export default Footer;