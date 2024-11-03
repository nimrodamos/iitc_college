import express from "express"

import { validateJoke } from "../middleware/validator.js"

import Joke from '../models/jokeModel.js'

const router = express.Router()

// Get All Jokes
// DONE: WORKING
router.get('/all', async (req, res) => {
    try {
        const jokes = await Joke.find({})

        if (jokes.length === 0) {
            res.status(404).send({
                message: "Add Some Jokes -  ימצחיק"
            })
        }
        res.send(jokes)
    } catch (error) {
        res.status(500).send("Unknown Server Error")
    }
})

// Add a new Joke
// DONE: WORKING
router.post("/", validateJoke, async (req, res) => {
    try {
        const { setup, punchline } = req.body

        const newJoke = await new Joke({
            setup,
            punchline
        }).save()
    
        res.status(201).json({
            message: "New joke added",
            joke: newJoke
        })

    } catch (error) {
        res.status(500).send("Unknown Server Error")
    }
})

// Get a random Joke
// DONE: WORKING
router.get('/random', async (req, res) => {
    const randomJoke = await Joke.aggregate([
        {
            $sample: {
                size: 1
            }
        }
    ])

    res.status(200).send(randomJoke[0])
})

// Get a Joke by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const foundJoke = await Joke.findById(id)
        
        if (!foundJoke) {
            res.status(404).send({
                message: `NO Joke found with id: ${id}`
            })
        }

        res.send(foundJoke)
    } catch (error) {
        res.status(500)
    }
})

// Update a Joke
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { setup, punchline } = req.body

        const fieldsToUpdate = {}

        if (setup || setup !== "") {
            fieldsToUpdate.setup = setup
        }

        if (punchline || punchline !== "") {
            fieldsToUpdate.punchline = punchline
        }

        const updatedJoke = await Joke.findByIdAndUpdate(id, fieldsToUpdate, {new: true})

        if (!updatedJoke) {
            res.status(404).send({
                message: `NO Joke found with id: ${id}`
            })
        }

        res.status(201).send(updatedJoke)
    } catch (error) {
        // console.log(error);
        res.status(500)
    }
})

// Update Full Joke
router.put('/:id', validateJoke, async (req, res) => {
    try {
        const { id } = req.params
        const updatedJoke = await Joke.findByIdAndUpdate(
            id, 
            req.body, 
            {new: true}
        )

        res.status(201).send(updatedJoke)
    } catch (error) {
        res.status(500)
    }
})


// Delete Joke
router.delete("/:id", async (req, res) => {
    const { id } = req.params

    try {
        await Joke.findByIdAndDelete(id)
        res.status(200).send({
            message: "Joke Succefully Delete"
        })

    } catch (error) {
        
    }
})

export default router