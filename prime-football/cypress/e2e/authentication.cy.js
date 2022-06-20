describe('Authentication tests', () => {

    it('refuses access when not authenticated', () => {
        cy.request({
            url: 'http://85.10.139.127:9080/timeline/bcaf9ad0-7d5b-4941-9f0a-5ce844ea4061',
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).eq(401)
        })
    })

    it('allows access when authenticated', () => {
        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5MGZiMWFlMDQ4YTU0OGZiNjgxYWQ2MDkyYjBiODY5ZWE0NjdhYzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJpbWUtZm9vdGJhbGwiLCJhdWQiOiJwcmltZS1mb290YmFsbCIsImF1dGhfdGltZSI6MTY1NTY4Mjk0NCwidXNlcl9pZCI6IkJrZHFSM2FqWGtldzk5bWtGczFoZXpoSXVZODIiLCJzdWIiOiJCa2RxUjNhalhrZXc5OW1rRnMxaGV6aEl1WTgyIiwiaWF0IjoxNjU1NjgyOTQ0LCJleHAiOjE2NTU2ODY1NDQsImVtYWlsIjoidGVzdDEyM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdDEyM0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.EI04QL_1qMJbtY6v2Ifj2uzCAIdO_EtqMUr-0psfZyloWY1loKd-zeV2t_dlcTPgVXF1YXUnPQK_QdgaXZ1S63q_mFHUnIZGtwrCESyO7sRrlXIDAFfgf0KkDlNlr1ELfpDZXpaUrZ7rkJ5vHYHsPeu5xeH4A9QiGcTlbdhPysTfaRG8-wQMCH5cywqVelMJVBobbFvAsZDs7U3DFUaibx4T9h0-BpuyufMxx2Ygqnwe1EOpnehOz-cQk-yyM3bNxTiGCnGBDCpFJxkCEBMMlwMlOX1Iga5X68uZurG9FiqvpcE-lafbdkIjUMdjPr4DxiIbO1c93oEpintCfOWPvg'
        cy.request({
            method: 'GET',
            url: 'http://85.10.139.127:9080/timeline/bcaf9ad0-7d5b-4941-9f0a-5ce844ea4061',
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            expect(response.status).eq(200)
        })
    })
})