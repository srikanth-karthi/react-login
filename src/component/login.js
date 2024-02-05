import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useStoreActions, useStoreState } from 'easy-peasy';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      'Password must contain at least one letter, one number, and one special character'
    ),
});

export const Login = () => {
  const login = useStoreActions((actions) => actions.auth.login);
  const isAuthenticated = useStoreState((state) => state.auth.isAuthenticated);
  const user = useStoreState((state) => state.auth.user);

  const handleSubmit = async (values, { setSubmitting }) => {
    await login(values);
    setSubmitting(false);
  };

  const initialValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    console.log('isAuthenticated changed:', isAuthenticated);
  }, [isAuthenticated]);


    return (
        <div >
            <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                        aria-controls="pills-login" aria-selected="true">Login</a>
                </li>

            </ul>

            <div class="tab-content">
                <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <Formik initialValues={initialValues}  onSubmit={handleSubmit}>
                        <Form>
                            <div class="form-outline mb-4">
                                <label for="loginName">
                                    Email or username
                                </label>
                                <Field type="email" id="loginName" name="email" class="form-control" />
                            </div>
                            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                            <div class="form-outline mb-4">
                                <label class="form-label" for="loginPassword">
                                    Password
                                </label>
                                <Field type="password" id="loginPassword" name="password" class="form-control" />
                                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                            </div>

                            <div class="row mb-4">
                                <div class="col-md-6 d-flex justify-content-center">
                                    <div class="form-check mb-3 mb-md-0">
                                        <input class="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                                        <label class="form-check-label" for="loginCheck">
                                            {' '}
                                            Remember me{' '}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary btn-block mb-4">
                                Sign in
                            </button>

                            <div class="text-center">
                                <p>
                                    Not a member? <a href="/register">Register</a>
                                </p>
                            </div>
                        </Form>
                    </Formik>

                </div>

            </div>
            {isAuthenticated ? (<>
  <p style={{ color: 'green' }}>Login successful!</p>
  <h3>{user}</h3>
  </>
            
) : (
  <p style={{ color: 'red' }}>Login failed. Please check your credentials.</p>
)}

        </div>
    )
}