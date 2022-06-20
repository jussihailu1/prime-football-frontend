describe('Timeline service tests', () => {

    beforeEach(() => {
        cy.window().then(window => window.sessionStorage.clear())
    })

    it('gets cached timeline returns valid timeline(GET /timeline/{id})', () => {
        cy.request('http://localhost:8088/timeline/bcaf9ad0-7d5b-4941-9f0a-5ce844ea4061')
            .then(response => {
                let body = response.body
                expect(response.status).eq(200)
                expect(body).to.haveOwnProperty('id')
                expect(body).to.haveOwnProperty('posts')
                expect(body).property('posts').to.be.an('array')

                for (const post of body.posts) {
                    expect(post).to.haveOwnProperty('id')
                    expect(post).to.haveOwnProperty('text')
                    expect(post).to.haveOwnProperty('timestamp')
                    expect(post).to.haveOwnProperty('user')
                }
            })
    })

    it('gets latest timeline returns valid timeline (GET /timeline/{id}/latest)', () => {
        cy.request('http://localhost:8088/timeline/bcaf9ad0-7d5b-4941-9f0a-5ce844ea4061/latest')
            .then((response) => {
                let body = response.body
                expect(response.status).eq(200)
                expect(body).to.haveOwnProperty('id')
                expect(body).to.haveOwnProperty('posts')
                expect(body).property('posts').to.be.an('array')

                for (const post of body.posts) {
                    expect(post).to.haveOwnProperty('id')
                    expect(post).to.haveOwnProperty('text')
                    expect(post).to.haveOwnProperty('timestamp')
                    expect(post).to.haveOwnProperty('user')
                }
            })
    })

    it('checks cached and latest', () => {
        let latestTimeline
        let secondLatestTimeline
        let cachedTimeline
        let secondCachedTimeline
        let postToDelete

        // get latest timeline
        cy.request('GET', 'http://localhost:8088/timeline/4abbfcff-f7b6-4cbd-81f2-ce3eb0171f32' + '/latest').then(response => {
            console.log(response)
            expect(response.status).eq(200)
            latestTimeline = response.body
        })

        // get cached timeline
        cy.request('GET', 'http://localhost:8088/timeline/4abbfcff-f7b6-4cbd-81f2-ce3eb0171f32').then(response => {
            expect(response.status).eq(200)
            cachedTimeline = response.body
            postToDelete = response.body.posts[0]

            // assert that they are equal
            expect(JSON.stringify(cachedTimeline), 'checks that cached is the same as the latest').to.deep.eq(JSON.stringify(latestTimeline))

            // delete a post
            cy.request('DELETE', 'http://localhost:8089/posts/' + postToDelete.id).then(response => {
                expect(response.status).eq(200)
            })
        })

        // get cached timeline
        cy.request('GET', 'http://localhost:8088/timeline/4abbfcff-f7b6-4cbd-81f2-ce3eb0171f32').then(response => {
            expect(response.status).eq(200)
            secondCachedTimeline = response.body
            // assert that it is still the same
            expect(JSON.stringify(secondCachedTimeline), 'checks that cached is the same as previous cached without a refreshing the timeline').to.eq(JSON.stringify(cachedTimeline))
        })

        // get latest timeline
        cy.request('GET', 'http://localhost:8088/timeline/4abbfcff-f7b6-4cbd-81f2-ce3eb0171f32' + '/latest').then(response => {
            expect(response.status).eq(200)
            secondLatestTimeline = response.body
            let firstLatestTimelineMinusDeletedPost = latestTimeline.posts.filter(p => p.id != postToDelete.id)
            // assert that it is equal to the cached timeline minus the deleted post
            expect(JSON.stringify(secondLatestTimeline), 'checks that latest is not the same as cached after a change').to.not.eq(JSON.stringify(cachedTimeline))
            // expect(JSON.stringify(secondLatestTimeline.posts), 'checks that latest is the same as cached minus the change').to.eq(JSON.stringify(firstLatestTimelineMinusDeletedPost))
        })
    })
})