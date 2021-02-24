import { isUserAuthenticated, getLoggedInUser, getLoggedInUserRole } from './authUtils'
import Cookies from 'js-cookie'

jest.mock('js-cookie')

describe('AuthUtil Tests', () => {

    it('is a test', () => {
        
        Cookies.get.mockImplementation(() => 'fr')
        console.log(Cookies.get())

        expect(Cookies.get()).toEqual('fr')
    })

    it('should return a null user', () => {
        expect(getLoggedInUser()).toEqual(null)
    })
})
