const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const Suser = require('../models/superUserModel');
const mongoose = require('mongoose');


exports.addUser = async (req, res) => {
    try {
        const { suserID, name, position, gender, email, number, password } = req.body;

        if (!suserID || !name || !position || !gender || !email || !number || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!mongoose.Types.ObjectId.isValid(suserID)) {
            return res.status(400).json({ message: 'Invalid suserID format' });
        }


        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }


        const suser = await Suser.findById(suserID);
        if (!suser) {
            return res.status(404).json({ message: 'Suser not found' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            suserID: suser._id,
            name,
            position,
            gender,
            email,
            number,
            password: hashedPassword,

        });

        await newUser.save();

        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.removeUser = async (req, res) => {
    try {
        const { userID } = req.params;

        const userExist = await User.findById(userID);
    
        if (userExist) {
            await userExist.deleteOne();
            res.status(200).send("User removed");
        } else {
            return res.status(400).send("User not found");
        }
    
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Internal Server Error',  });
        console.log(error)
    }
}

exports.getAllUser = async (req, res) => {
    try {
        // Fetch all users from the database
        const allusers = await User.find();

        // Check if users were found
        if (allusers && allusers.length > 0) {
            return res.status(200).json(allusers);      
        } else {
            return res.status(404).json({ message: 'No users found' });
        }
    } catch (error) {
        // Handle unexpected errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateUser = async (req, res) =>{

    try {
        const {userID} = req.params;
        const existingUser = await User.findById(userID);
        if(existingUser){

            await existingUser.updateOne(req.body);

            res.status(200).send('user update successfuly')

        }else{
            res.status(400).send('user not found')

        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

exports.getUser = async (req, res) => {
    try {
        const {suserID} = req.params;


        console.log(suserID);
        
        // Query the User collection where suserID matches
        const user = await User.find({ suserID: suserID }); 

        if (user) {
            return res.status(200).json(user);      
        } else {
            return res.status(404).json({ message: 'No user found' });
        }
    } catch (error) {
        // Handle unexpected errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



