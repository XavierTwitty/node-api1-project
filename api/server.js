// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')

const server = express()

server.use(express.json())


server.get('/api/users/', (req, res)=> {
    Users.find()
        .then (users => {
            res.json(users)
        })
})
server.get('/api/users/:id', (req, res)=> {
    Users.findById(req.params.id)
        .then(user => {
            if(user == null) {
                res.status(404).json({message: `dog with id ${req.params.id} not found!`})
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
            
        })
})
server.post('/api/users/', (req, res)=> {
    const body = req.body;

    if(!req.body.name) {
        res.status(400).json({ message: 'missing name in request' });
        return;
    } else if(!req.body.bio) {
        res.status(400).json({ message: 'missing weight in request' });
        return;
    }


    Users.insert(body)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });

})
server.put('/api/users/:id', (req, res)=> {
    const user = req.body

    if(!req.body.name) {
        res.status(400).json({ message: 'missing name in request' });
        return;
    } else if(!req.body.bio) {
        res.status(400).json({ message: 'missing weight in request' });
        return;
    }

    Users.update(req.params.id, user)
        .then(user => {
            if(user == null) {
                res.status(404).json({ message: `user with id ${req.params.id} not found!`});
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });

})
server.delete('/api/users/:id', (req, res)=> {
    Users.remove(req.params.id)
    .then(user => {
        if(user == null) {
            res.status(404).json({ message: `user with id ${req.params.id} not found!`});
        } else {
            res.status(200).json(user);
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message });
    });
})





module.exports = server; // EXPORT YOUR SERVERreq, res of {}
