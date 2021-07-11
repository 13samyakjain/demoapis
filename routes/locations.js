const express = require('express');
const router = express.Router();
const LocationModel = require('../models/location')
const passport = require('passport')
router.post('/state',passport.authenticate('jwt',{session:true}) ,async (req, res, next) => {
    try {
        const { state } = req.body
        let x = await LocationModel.find({ 'state': state });
        if (x.length == 0) {
            return res.status(403).json({ 'message': 'State  Already exist' })
        }
        const newstate = new LocationModel({
            state: state.toString()
        })
        await newstate.save()
        return res.status(200).json({ 'message': 'state created' })
    } catch (error) {
        return res.status(503).json({ 'message': error })
    }
})
router.get('/state', passport.authenticate('jwt',{session:true}) ,async (req, res, next) => {
    try {
        const states = await LocationModel.find();
        return res.status(200).json({ 'message': states })
    } catch (error) {
        return res.status(503).json({ 'message': error })
    }
})

router.post('/district', passport.authenticate('jwt',{session:true}) ,async (req, res, next) => {
    try {
        const { state, district } = req.body;
        let x = await LocationModel({ state: state, districts: district });
        if (x.length == 0) {
            return res.status(403).json({ 'message': 'District already exist' })
        }
        await LocationModel.updateOne({ state: state }, { $push: { 'districts': district } })
        return res.status(200).json({ 'message': 'District Succesfully added' })
    } catch (error) {
        return res.status(503).json({ 'message': error })
    }
})

router.get('/district', passport.authenticate('jwt',{session:true}) ,async (req, res, next) => {
    try {
        const locationdata = await LocationModel.find();
        return res.status(200).json({ 'message': locationdata })
    } catch (error) {
        return res.status(503).json({ 'error': error })
    }
})

module.exports = router
