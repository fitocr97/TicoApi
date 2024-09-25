import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import { UserModel } from '../models/user.js'


const register = async(req, res) => {
    try{
        //primero trabajamos con el request.body
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: email, password, username" }) //badrequest
        }
        
        //verificar si el usuario ya existe
        const user = await UserModel.findOneByEmail(email)
        if (user) {
            return res.status(409).json({ ok: false, msg: "Email already exists" })
        }

        //creamos unos saltos(palabras aleatorias se agregan al hash)
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        //registrar el usuario
        const newUser = await UserModel.create({ email, password: hashedPassword, username })

        //crear token
        const token = jwt.sign({ email: newUser.email }, //pasamos el email
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.status(201).json({ok: true, mgs: token})

    } catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}


const login = async(req, res) =>{
    try{

    } catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

/*


// /api/v1/users/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Missing required fields: email, password" });
        }

        const user = await UserModel.findOneByEmail(email)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ email: user.email, role_id: user.role_id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.json({
            ok: true, msg: {
                token, role_id: user.role_id
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}*/

export const UserController = {
    register,
    login
}