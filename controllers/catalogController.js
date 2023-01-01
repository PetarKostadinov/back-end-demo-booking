
const { getAll, getById } = require('../services/roomService');

const router = require('express').Router();

router.get('/', async(req, res) => {

    const user = req.user;

    const search = req.query.search || '';
    const city = req.query.city || '';
    const formPrice = Number(req.query.formPrice) || 1;
    const toPrice = Number(req.query.toPrice) || 1000;

    const rooms = await getAll(search, city, formPrice, toPrice);

    res.render('catalog', {
        title: 'All Accomodation',
        rooms,
        search,
        city,
        formPrice,
        toPrice
    });
});

router.get('/:id', async(req, res) => {
    const roomId = req.params.id;
    const room = await getById(roomId);

    if(req.user && req.user._id == room.owner){
        room.isOwner = true;
    }
    if(room){

        res.render('details', {
            title: 'Accomodation Details',
            room
        });
    }else{
        res.render('roomNotFound', {
            title: 'Accomodation Details',
            roomId
        });
    }
});

module.exports = router;