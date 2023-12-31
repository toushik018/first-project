import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";



const userSchema = new Schema<TUser, UserModel>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ["admin", "faculty", "student"]
    },
    status: {
        type: String,
        enum: ["in-progress", "blocked"],
        default: "in-progress"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});




// Pre save middleware functions/ hook
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    // Hashing the password and the save the db

    user.password = await bcrypt.hash(
        user.password,
        Number(config.brypt_salt_round),
    );

    next();
});

// Post save middleware functions -- After set the '' saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});


userSchema.statics.isUserExistByCustomId = async function (id: string) {
    return await User.findOne({ id })
}

// Password matching
userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
    return bcrypt.compare(plainTextPassword, hashedPassword)
}
 

export const User = model<TUser, UserModel>('User', userSchema);

