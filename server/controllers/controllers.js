
const handleSignUp = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    const hashedPass = bcrypt.hashSync(password)

    db.transaction(trx => {
        trx.insert({
            hash: hashedPass,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0])

                    })
                    .then(trx.commit)
                    .catch(trx.rollback)

            })
            .catch(err => {
                res.status(400).json('Unable to Sign Up')
            })
    })

}

const handleSignIn = (req, res, db, bcrypt) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select('*')
                    .from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.send(user[0])
                    })
                    .catch(err => {
                        res.status(400).json('Wrong Credentials')
                    })
            } else {
                res.status(400).json("Invalid Credentials");
            }

        })
    res.status(400).json("Wrong Email and Password");
}

const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db.select("*").from("users").where({ id })
        .then(user => {
            if (user.length)
                res.json(user[0])
            else
                res.status(400).json("Not Found")
        }).catch(err => {
            res.status(400).json("Not Found")
        })
}

const handleImageCount = (req, res, db) => {
    const { id } = req.body;
    db("users").where({ id })
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
        res.json(entries[0])
        console.log(entries)
     })
    .catch(err => res.status(400).json("Failed to update entries"))
}

module.exports = {
    handleSignUp: handleSignUp,
    handleSignIn: handleSignIn,
    handleProfile: handleProfile,
    handleImageCount: handleImageCount
}
