export const permissionVerification = async (req, res) => {
    if (!req.headers.tokenInfo.authorization == req.params.id) return res.code(401).send({ message: 'Error token' });

    return
}
