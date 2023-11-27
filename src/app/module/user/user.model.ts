import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";



const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true
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



export const User = model<TUser>('User', userSchema);

