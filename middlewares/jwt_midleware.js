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

        const { email } = jwt.verify(token, process.env.JWT_SECRET) //desturctory del payload
        //inyectamos al request el email para que aparesca en el controllador
        req.email = email

        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Invalid token" });
    }
}