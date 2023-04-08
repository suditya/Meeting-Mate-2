const mongoose = require('mongoose');

const ScheduledEmailsSchema = new mongoose.Schema({
    userId: String,
    subject: String,
    startTime: String,
    endTime: String,
    meetingDate: String,
    scheduleDate: String,
    from: String,
    to: String,
    description: String,
    sent: String,
    tag: String,
    meetingLink: String
})

const ScheduledEmails = mongoose.model('ScheduledEmail', ScheduledEmailsSchema);

module.exports = ScheduledEmails;