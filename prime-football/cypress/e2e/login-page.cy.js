/// <reference types="cypress" />

// const baseURL = 'http://localhost:3000'
const baseURL = 'https://prime-football-frontend.vercel.app'

describe('Login and routing tests', () => {
    beforeEach(() => {
        cy.window().then(window => window.sessionStorage.clear())
        cy.visit(baseURL)
    })

    it('routes to the login page when not logged in', () => {
        cy.contains('Login')
        cy.visit(baseURL + '/profile').contains('Login')
    })

    it('routes to the home page when logged in', () => {
        cy.window().then(window => window.sessionStorage.setItem("userId", "bcaf9ad0-7d5b-4941-9f0a-5ce844ea4061"))
        cy.visit(baseURL)
        cy.contains('Home page')
    })

    it('can login', () => {
        cy.get("#user-Jussi").click()
        cy.contains('Home page')
    })
})