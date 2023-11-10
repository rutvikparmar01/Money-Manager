import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "/src/index.css";
import { motion } from "framer-motion";

function Signin() {
  const [auth, setAuth] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let cpasswordd = useRef();

  let navigate = useNavigate();
  const handleClick = async () => {
    const vcpassword = cpasswordd.current.value;
    const host = "http://localhost:3000";
    if (vcpassword === auth.password) {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: auth.name,
          email: auth.email,
          password: auth.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      console.log(vcpassword);
      console.log(auth.password);
      if (json.succesc && vcpassword === auth.password) {
        localStorage.setItem("token", json.token);
        navigate("/");
      } else {
        toast.error("This email is already exits");
      }
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <section className="vh-100 bg-color">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100 ">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card"
                    style={{ borderRadius: "15px", backgroundColor: "#8EE4AF" }}
                  >
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-5">
                        Create an account
                      </h2>

                      <form>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form3Example1cg"
                            className="form-control form-control-lg"
                            required
                            name="name"
                            minLength={3}
                            onChange={onChange}
                            value={auth.name}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1cg"
                          >
                            Your Name
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form3Example3cg"
                            className="form-control form-control-lg"
                            required
                            name="email"
                            onChange={onChange}
                            value={auth.email}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example3cg"
                          >
                            Your Email
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form3Example4cg"
                            className="form-control form-control-lg"
                            minLength={5}
                            required
                            name="password"
                            onChange={onChange}
                            value={auth.password}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4cg"
                          >
                            Password
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form3Example4cdg"
                            className="form-control form-control-lg"
                            minLength={5}
                            required
                            name="cpassword"
                            ref={cpasswordd}
                            onChange={onChange}
                            value={auth.cpassword}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4cdg"
                          >
                            Repeat your password
                          </label>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3cg"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="form2Example3g"
                          >
                            I agree all statements in{" "}
                            <a href="#!" className="text-body">
                              <u>Terms of service</u>
                            </a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center">
                          <button
                            type="button"
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                            onClick={handleClick}
                          >
                            Register
                          </button>
                        </div>
                        <Toaster />

                        <p className="text-center text-muted mt-5 mb-0">
                          Have already an account?
                          <Link to="/login" className="fw-bold text-body">
                            <u>Login here</u>
                          </Link>
                        </p>
                      </form>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Signin;
