import Avatar from "@mui/material/Avatar"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import LockIcon from "@mui/icons-material/Lock"
import image from "../assets/result.svg"
import { Link, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"
import { Formik, Form } from "formik"
import { object, string } from 'yup';
import  useAuthCalls  from "../service/useAuthCalls"


const Login = () => {
  const { login } = useAuthCalls()
  const loginSchema = object({
    /*  name: string().required(),
     age: number().required().positive().integer(),
     email: string().email(),
     website: string().url().nullable(),
     createdOn: date().default(() => new Date()), yuptan aldığımız bu kısımlara gerek yok */
    email: string().email("Lütfen geçerli bir email giriniz!").required("Email girişi zorunludur!"),
    password: string().required()
      .min(8)
      .max(16, "şifre en fazla 16 karakter içermelidir.  ")
      .matches(/\d+/, "şifre en az bir rakam içermelidir")
      .matches(/[@$!æ*?&]+/, "şifre en az bir özel karakter (@$!æ*?&) içermelidir.")
      .matches(/[a-z]/)
      .matches(/[A-Z]/),
  });

console.log('login', login)
  
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              console.log('first')
              // navigate("/stock")
              login(values)
              // actions.resetForm()
              // actions.setSubmitting(false)

            }}>
            {({ handleChange, values, touched, errors, handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Box
                  component="form"
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={errors.email}
                  />
                  <TextField
                    label="password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.password)}
                    helperText={errors.password}
                  />
                  <Button variant="contained" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Box>
              </Form>)}


          </Formik>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>

        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container >
  )
}

export default Login
