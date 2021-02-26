import { isSessionValid, getUserRole } from './authUtils'
//requires this to be set in the environment to correctly test authUtils
const ROLE_CLAIM = process.env.REACT_APP_AUTH0_ROLE_CLAIM_PREFIX;

let validUser = {
    exp: (Date.now() + 1000) / 1000,
}
validUser[ROLE_CLAIM] = ['Test']
let invalidUser1 = {
    exp: 1
}
invalidUser1[ROLE_CLAIM] = []
const invalidUser2 = { }
const nullUser = null

describe('User Session Tests', () => {
    it('should return session is valid', () => {
        expect(isSessionValid(validUser)).toBeTruthy()
    })

    it('should return session is expired', () => {
        expect(isSessionValid(invalidUser1)).toBeFalsy()
        expect(isSessionValid(invalidUser2)).toBeFalsy()
        expect(isSessionValid(nullUser)).toBeFalsy()
    })
})

describe('User Role Tests', () => {

    it('should return a valid user role', () => {
        expect(getUserRole(validUser)).toBe('Test')        
    })
   
    it('should not return valid user roles', () => {
        expect(getUserRole(invalidUser1)).toBeNull()
        expect(getUserRole(invalidUser2)).toBeNull()
        expect(getUserRole(nullUser)).toBeNull()
    })
})
