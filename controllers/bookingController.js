const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    try {
        const bookedByUserId = req.user._id;
        const newBooking = await Booking.create({ ...req.body, bookedBy: bookedByUserId })
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.bookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id).populate('attraction')
        res.json({ booking, attraction: booking.attraction });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
