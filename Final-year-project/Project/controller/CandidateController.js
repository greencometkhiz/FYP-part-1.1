import candidateModel from "../models/candidateModel.js";
import { comparePassword , hashPassword } from "../helper/CandidateHelper.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address,  username, dateOfBirth, favSports, gender , role} = req.body;

        // Validation
        if (!name || !email || !password || !phone || !address  || !username || !dateOfBirth || !favSports || !gender|| !role) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const existingUser = await candidateModel.findOne({ email });

        // Existing user
        if (existingUser) {

            return res.status(200).send({
                success: "Already Registered please login",
            })
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Save user
        const user = await new candidateModel({
            name, email, phone, address,  username, dateOfBirth, favSports, gender, password: hashedPassword,role,
        }).save();

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};


export const loginController = async (req, res) => {

    try {
        const { email, password, role } = req.body
        //validation

        if (!email || !password || !role) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            })
        }

        // if(!role){
        //     return res.status(404).send({
        //         success:false,
        //         message:"Invalid Role"
        //     })
        // }
        //check user
        const user = await candidateModel.findOne({ email })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email ",
            })

        }


        const user1 = await candidateModel.findOne({ role })

        if (!user1) {
            return res.status(404).send({
                success: false,
                message: "Invalid Role ",
            })

        }

       

        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            })
        }


        //token

        const token = JWT.sign({ _id: user._id }, process.env.SECRET, {
            expiresIn: '7d',


        });


        res.status(200).send({
            success: true,
            message: 'Login Succesfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role,
                username: user.username,
                dateOfBirth: user.dateOfBirth,
                favSports: user.favSports,
                gender: user.gender,
            },
            token,

        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error,

        })

    }
};