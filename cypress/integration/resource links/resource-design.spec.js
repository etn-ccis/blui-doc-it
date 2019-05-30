/// <reference types="cypress" />

describe('Resource page design links', () => {
    it('Verify action-list repo', () => {
        cy.request('https://github.com/pxblue/action-list')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify angular action-list circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/action-list/tree/angular')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify react action-list circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/action-list/tree/react')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify action-list repo issues', () => {
        cy.request('https://github.com/pxblue/action-list/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify bottomsheet repo', () => {
        cy.request('https://github.com/pxblue/bottomsheet')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify angular bottomsheet circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/bottomsheet/tree/angular')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify react bottomsheet circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/bottomsheet/tree/react')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify bottomsheet repo issues', () => {
        cy.request('https://github.com/pxblue/bottomsheet/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify collapsible-appbar repo', () => {
        cy.request('https://github.com/pxblue/collapsible-appbar')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify angular collapsible-appbar circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/collapsible-appbar/tree/angular')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify react collapsible-appbar circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/collapsible-appbar/tree/react')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify collapsible-appbar repo issues', () => {
        cy.request('https://github.com/pxblue/collapsible-appbar/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify complex-bottomsheet repo', () => {
        cy.request('https://github.com/pxblue/complex-bottomsheet')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify angular complex-bottomsheet circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/complex-bottomsheet/tree/angular')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify react complex-bottomsheet circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/complex-bottomsheet/tree/react')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify complex-bottomsheet repo issues', () => {
        cy.request('https://github.com/pxblue/complex-bottomsheet/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify data-list repo', () => {
        cy.request('https://github.com/pxblue/data-list')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify angular data-list circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/data-list/tree/angular')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify react data-list circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/data-list/tree/react')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify data-list repo issues', () => {
        cy.request('https://github.com/pxblue/data-list/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify dynamic-stepper repo', () => {
        cy.request('https://github.com/pxblue/dynamic-stepper')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify angular dynamic-stepper circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/dynamic-stepper/tree/angular')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify react dynamic-stepper circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/dynamic-stepper/tree/react')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify dynamic-stepper repo issues', () => {
        cy.request('https://github.com/pxblue/dynamic-stepper/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify icon-navigation repo', () => {
        cy.request('https://github.com/pxblue/icon-navigation')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify angular icon-navigation circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/icon-navigation/tree/angular')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify react icon-navigation circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/icon-navigation/tree/react')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify icon-navigation repo issues', () => {
        cy.request('https://github.com/pxblue/icon-navigation/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify login repo', () => {
        cy.request('https://github.com/pxblue/login')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify angular login circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/login/tree/angular')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify react login circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/login/tree/react')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify login repo issues', () => {
        cy.request('https://github.com/pxblue/login/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify multiselect-list repo', () => {
        cy.request('https://github.com/pxblue/multiselect-list')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify angular multiselect-list circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/multiselect-list/tree/angular')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify react multiselect-list circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/multiselect-list/tree/react')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify multiselect-list repo issues', () => {
        cy.request('https://github.com/pxblue/multiselect-list/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify responsive-table repo', () => {
        cy.request('https://github.com/pxblue/responsive-table')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify angular responsive-table circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/responsive-table/tree/angular')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify react responsive-table circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/responsive-table/tree/react')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify responsive-table repo issues', () => {
        cy.request('https://github.com/pxblue/responsive-table/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify search-bar repo', () => {
        cy.request('https://github.com/pxblue/search-bar')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify angular search-bar circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/search-bar/tree/angular')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify react search-bar circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/search-bar/tree/react')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify search-bar repo issues', () => {
        cy.request('https://github.com/pxblue/search-bar/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify side-navigation repo', () => {
        cy.request('https://github.com/pxblue/side-navigation')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify angular side-navigation circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/side-navigation/tree/angular')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify react side-navigation circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/side-navigation/tree/react')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify side-navigation repo issues', () => {
        cy.request('https://github.com/pxblue/side-navigation/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify sortable-list repo', () => {
        cy.request('https://github.com/pxblue/sortable-list')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify angular sortable-list circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/sortable-list/tree/angular')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify react sortable-list circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/sortable-list/tree/react')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify sortable-list repo issues', () => {
        cy.request('https://github.com/pxblue/sortable-list/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify status-list repo', () => {
        cy.request('https://github.com/pxblue/status-list')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify angular status-list circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/status-list/tree/angular')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify react status-list circleci', () => {
        cy.request('https://circleci.com/gh/pxblue/status-list/tree/react')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify status-list repo issues', () => {
        cy.request('https://github.com/pxblue/status-list/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })
})

