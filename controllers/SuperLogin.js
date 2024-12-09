const Suser = require('../models/superUserModel');
const bcrypt = require('bcrypt');
const {genrateToken} = require('../config/tokenConfig')

exports.superUserRegister = async ( req, res) => {

    try {
        const { name, number, email, organization, gender, position, password } = req.body;
    
        // Validate required fields
        if (!name || !number || !email || !organization || !gender || !position ||!password) {
            return res.status(400).json({ message: "Missing required fields" });
        }
    
        // Check if user already exists
        const userExist = await Suser.findOne({ email: email });
    
        if (userExist) {
            return res.status(403).send("Email already exists, Please login.");
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
      
         const newUser = new Suser({
             name, 
             number,
             email,
             organization, 
             gender,
             position, 
             password: hashedPassword });

        await newUser.save();
    
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
}

exports.superLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const superUser = await Suser.findOne({ email });

        if (superUser) {
            const isMatched = await bcrypt.compare(password, superUser.password);

            if (!isMatched) {
                return res.status(400).send("Password doesn't match");
            }
            
        
            const token = genrateToken(superUser._id);

            return res.status(200).json({
                message: "User logged in successfully",
                token,
            });        } else {
            return res.status(400).send("Email does not exist");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getLoggedInUser = async (req, res) => {
        try {
            const userId = req.user._id;

            const user = await Suser.findById(userId).select('-password'); 

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Return the user's data
            res.status(200).json({
                user,
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
