import React, { Component } from 'react'

export default class Signup extends Component {
  render() {
    return (
      <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="First Name">First Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="Last Name">Last Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password"/>
              </div>

            </fieldset>
            <div className="">
              <input onClick={() => this.props.onRouteChange('home')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
            </div>
            <div className="lh-copy mt3">
              <a onClick={() => this.props.onRouteChange('signup')} href="#0" className="f5 link dim black db pointer">Sign up</a>
            </div>
          </div>
        </main>
      </article>
    )
  }
}
