import React, { Component } from 'react'
import Logo from '../../components/Logo/Logo';

export default class Signin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    onEmailChange = (e) => {
        this.setState({email: e.target.value})
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(resp => resp.json())
        .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                } else {
                    console.log("Unable to log in")
            }
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <Logo />
                <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                                </div>

                            </fieldset>
                            <div className="">
                                <input
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Sign in"
                                    onClick={this.onSubmitSignIn}
                                />
                            </div>
                            <div className="lh-copy mt3">
                                <a onClick={() => this.props.onRouteChange('signup')} href="#0" className="f5 link dim black db pointer">Sign up</a>
                            </div>
                        </div>
                    </main>
                </article>  
        </div>
    )
  }
}
