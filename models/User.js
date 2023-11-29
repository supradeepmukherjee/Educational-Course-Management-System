import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [5, 'Name must be of minimum 5 characters'],
        required: [true, "Please enter a name"]
    },
    email: {
        type: String,
        required: [true, "Please enter a email"],
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [8, 'Password must be of minimum 8 characters'],
        select: false
    },
    chavi: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
    }]
},
    { timestamps: true }
)

export default mongoose.models?.EdUser || mongoose.model('EdUser', userSchema)