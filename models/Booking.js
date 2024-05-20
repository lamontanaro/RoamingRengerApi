const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId: Number,
    date: { type: Date, required: true },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    relatedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'TouristAttraction' },
});

bookingSchema.virtual('attraction', {
    ref: 'TouristAttraction',
    localField: 'relatedTo',
    foreignField: '_id',
    justOne: true
});

const booking = mongoose.model('booking', bookingSchema);

module.exports = booking;