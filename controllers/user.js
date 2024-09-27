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
        const token = jwt.sign({ email: newUser.email, role_id: newUser.role_id }, //pasamos el email y el role
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

// /tico/v1/users/login
const login = async(req, res) =>{
    try{
        const { email, password } = req.body //destructory

        //si vienen datos
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Missing required fields: email, password" });
        }

        //verificar si el user no existe
        const user = await UserModel.findOneByEmail(email)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        //comparar contraseñas
        const isMatch = await bcryptjs.compare(password, user.password) 
        //contraseña diferente
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        //generar token
        const token = jwt.sign({ email: user.email , role_id: user.role_id}, //pasamos el email y role
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

    } catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

//ruta protegida
const profile = async (req, res) => {
    try {

        const user = await UserModel.findOneByEmail(req.email)  //buscar por email
        
        return res.json({ ok: true, msg: user })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const findAll = async (req, res) => {
    try {
        const users = await UserModel.findAll() //usa el model
        console.log(users)
        return res.json({ ok: true, msg: users })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

//actualizar role
const updateRoleAdm = async (req, res) => {
    try {
        const { uid } = req.params //sacar parametro se puede tambien sacar con el cuerpo

        const user = await UserModel.findOneByUid(uid) //verificar si existe el user
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const updatedUser = await UserModel.updateRoleAdm(uid)

        return res.json({
            ok: true,
            msg: updatedUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}


export const UserController = {
    register,
    login,
    profile,
    findAll,
    updateRoleAdm
}