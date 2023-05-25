export const permissionVerification = async (req, res) => {
	if (req.headers.tokenInfo.authorization.access === 'admin') return
	else if (req.headers.tokenInfo.authorization.id !== parseInt(req.params.id))
		return res.code(401).send({ message: 'Error token' })

	return
}
