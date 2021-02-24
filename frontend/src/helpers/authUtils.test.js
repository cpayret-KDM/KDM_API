import { isSessionExpired, getUserRole } from './authUtils'
//requires this to be set in the environment to correctly test authUtils
const ROLE_CLAIM = process.env.REACT_APP_AUTH0_ROLE_CLAIM_PREFIX;

let validUser = {
    exp: (Date.now() + 1000) / 1000,
}
validUser[ROLE_CLAIM] = ['Test']
let invalidUser1 = {
    exp: 1
}
invalidUser1[ROLE_CLAIM] = null
const invalidUser2 = { }
const nullUser = null

describe('User Role Tests', () => {

    it('should return a valid user role', () =>
        expect(getUserRole(validUser)).toBe('Test')
    )
   
})
