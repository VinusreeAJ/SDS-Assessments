import React, { useState } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values) => {
    console.log("Submitted", values);
    localStorage.setItem('loginDetails', JSON.stringify(values));
    toast.success('Successfully logged in!');
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div className="bg-white">
      <ToastContainer />
      <div className="card">
        <div className="card-body">
          <div className="col-12">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <h2>Login</h2>
                  <div className="mb-3 text-start">
                    <label className="fs-6 mb-2" htmlFor="email">EMAIL</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text" id="inputGroup-sizing-lg">
                        <PersonIcon />
                      </span>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                        aria-describedby="inputGroup-sizing-lg"
                        placeholder="Enter email"
                        autoComplete="email"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label className="fs-6 mb-2" htmlFor="password">PASSWORD</label>
                    <div className="input-group input-group-lg">
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                        placeholder="Enter password"
                        required
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                      />
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-lg"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: 'pointer' }}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </span>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg formSubmit"
                    >
                      Login
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;