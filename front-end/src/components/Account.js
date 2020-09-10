import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './Login/Login';
import { setRifferName, getUserData } from '../actions';
import NavBar from './NavBar.js';

function Account({ name, googleUser, setRifferName, userData, getUserData }) {
  const [userName, setUserName] = useState(name);

  useEffect(() => {
    if (googleUser) getUserData(googleUser);
  }, [googleUser, getUserData]);

  const loggedIn = () => {
    if (googleUser) return googleUser.isSignedIn();
    return false;
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (userName !== '') {
      setRifferName(userName, googleUser);
    }
  }
  function handleChange(event) {
    event.preventDefault();
    setUserName(event.target.value);
  }

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="landing-page">
      <NavBar />
      <div className="title-and-url heading">
        <h1 className="heading-primary-main account-heading">
          Account Settings
        </h1>
      </div>
      <section className="top-part">
        {loggedIn() ? (
          <React.Fragment>
            <form onSubmit={(event) => handleSubmit(event)}>
              {/* <p>hello {name}</p> */}
              <label>
                Riffer Name:
                <input
                  onChange={(event) => handleChange(event)}
                  type="text"
                  name="name"
                  defaultValue={name}
                  className="form-field"
                />
              </label>
              <input type="submit" value="Submit" className="btn" />
            </form>
            <ul>
              {userData
                ? userData.map(({ url, title }) => (
                    <li>
                      <img
                        alt="video frame"
                        src={`https://img.youtube.com/vi/${url}/0.jpg`}
                      />
                      <br />
                      {title}
                    </li>
                  ))
                : null}
            </ul>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Login /> <p>to get started</p>
          </React.Fragment>
        )}
      </section>
    </div>
  );
}
let mapStateToProps = (state) => ({
  name: state.name,
  googleUser: state.googleUser,
  userData: state.userData,
});

const mapDispatchToProps = {
  setRifferName,
  getUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);