import jwt from "jsonwebtoken";

//TODOS lso middelwares en js llevan req, rest y next
export const verifyToken = (req, res, next) => {

    let token = req.headers.authorization //heardes

    //si no existe el token, no pasa al user.profile deberia venir en header
    if (!token) {
        return res.status(401).json({ error: "Token not provided" });
    }

    //limpiar token ya que viene "Bearer token"
    token = token.split(" ")[1]

    try {

        const { email, role_id } = jwt.verify(token, process.env.JWT_SECRET) //desturctory del payload
        //inyectamos al request el email para que aparesca en el controllador
        req.email = email
        req.role_id = role_id
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Invalid token" });
    }
}

//verificar admin
export const verifyAdmin = (req, res, next) =>{
    if (req.role_id === 1) {
        return next()
    }

    return res.status(403).json({ error: "Unauthorized only admin user" })
}

//verificar cliente
export const verifyClient = (req, res, next) =>{
    if (req.role_id === 3) {
        return next()
    }

    return res.status(403).json({ error: "Unauthorized only client user" })
}