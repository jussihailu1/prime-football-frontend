/// <reference types="cypress" />

describe('Post service tests', () => {

    beforeEach(() => {
        cy.window().then(window => window.sessionStorage.clear())
        cy.visit('http://localhost:3000/')
        cy.get('#user-Jussi').click()
        cy.visit('http://localhost:3000/profile')
    })

    it('get posts from one user (GET /posts/user/{id})', () => {
        cy.intercept('GET', '**/posts/user/*').as('getPosts')
        cy.wait('@getPosts').then(interception => {
            let body = interception.response.body
            expect(interception.response.statusCode).eq(200)
            expect(body).to.be.an('array')

            for (const post of body) {
                expect(post).to.haveOwnProperty('id')
                expect(post).to.haveOwnProperty('text')
                expect(post).to.haveOwnProperty('timestamp')
            }
        })
    })

    it('create a post (POST /posts)', () => {
        let testPostText = 'test post ' + (Math.random() + 1).toString(36).substring(7) // random string
        cy.intercept('POST', '**/posts').as('createPost')
        cy.get('#newPost-button').click()
        cy.get('#newPost-input').type(testPostText)
        cy.get('#newPost-post-button').click()
        cy.wait('@createPost').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })
        cy.get('.home-page-container').should('contain', testPostText)
    })

    it('delete a post (DELETE /posts/{id})', () => {
        let postCount
        cy.intercept('DELETE', '**/posts/*').as('deletePost')
        cy.get('.home-page-container-post').then($list => {
            postCount = $list.length
        })
        cy.get('.delete-button').first().click().get('.confirm-delete-button').click()
        cy.wait('@deletePost').then(interception => {
            expect(interception.response.statusCode).eq(200)
            cy.get('.home-page-container-post').then($list => {
                expect($list).to.have.length(postCount - 1)
            })
        })
    })
})