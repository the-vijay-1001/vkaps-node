import jwt from "jsonwebtoken"

export const authentication = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const token = auth.split(" ")[1]
        const isValid = jwt.verify(token, process.env.SECRET_KEY)
        if (isValid) {
            next()
        }
        else {
            return res.json({ message: "Invalid token" })
        }
    } catch (error) {
        return res.json({ message: error })
    }

}