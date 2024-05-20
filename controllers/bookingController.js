const booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    try {
        const bookedByUserId = req.user._id;
        const newBooking = await booking.create({ ...req.body, bookedBy: bookedByUserId });
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.bookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const bookingByID = await booking.findById(id).populate('attraction');
        if(!bookingByID) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ booking: bookingByID, attraction: bookingByID.attraction });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}