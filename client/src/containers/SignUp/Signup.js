import React, { Component } from 'react'
import Logo from '../../components/Logo/Logo';

export default class Signup extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  onNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  onEmailChange = (e) => {
    this.setState({ email: e.target.value })
  }

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value })
  }

  onSubmitSignUp = () => {
    fetch('http://localhost:3001/signup', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          this.props.loadUser(data)
          console.log(data)
        } else {
          console.log('No Data returned')
        }
      })
    this.props.onRouteChange('home')
  }

  render() {
    return (
      <div>
        <Logo />
        <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="Name">Name</label>
                  <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" />
                </div>

              </fieldset>
              <div className="">
                <input onClick={this.onSubmitSignUp} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign Up" />
              </div>
              <div className="lh-copy mt3">
                <a onClick={() => this.props.onRouteChange('signin')} href="#0" className="f5 link dim black db pointer">Sign in</a>
              </div>
            </div>
          </main>
        </article>
      </div>
    )
  }
}
