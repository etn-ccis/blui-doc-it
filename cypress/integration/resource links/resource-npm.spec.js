/// <reference types="cypress" />

describe('Resource page links', () => {
    it('Verify request for PXB NPM org page', () => {
        cy.request('https://www.npmjs.com/org/pxblue')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify request for PX Blue github org page', () => {
        cy.request('https://github.com/pxblue')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB colors repo', () => {
        cy.request('https://github.com/pxblue/colors/tree/master')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB colors NPM package', () => {
        cy.request('https://www.npmjs.com/package/@pxblue/colors')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB colors branding NPM package', () => {
        cy.request('https://www.npmjs.com/package/@pxblue/colors-branding')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB colors repo issues', () => {
        cy.request('https://github.com/pxblue/colors/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB highcharts repo', () => {
        cy.request('https://github.com/pxblue/highcharts/tree/master')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB highcharts NPM package', () => {
        cy.request('https://www.npmjs.com/package/@pxblue/highcharts')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB highcharts repo issues', () => {
        cy.request('https://github.com/pxblue/highcharts/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB icons repo', () => {
        cy.request('https://github.com/pxblue/icons/tree/master')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB icons NPM package', () => {
        cy.request('https://www.npmjs.com/package/@pxblue/icons')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB icons-svg NPM package', () => {
        cy.request('https://www.npmjs.com/package/@pxblue/icons-svg')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB ng-progress-icons NPM package', () => {
        cy.request('https://www.npmjs.com/package/@pxblue/ng-progress-icons')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB react-progress-icons NPM package', () => {
        cy.request('https://www.npmjs.com/package/@pxblue/react-progress-icons')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB symbols NPM package', () => {
        cy.request('https://www.npmjs.com/package/@pxblue/symbols')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB icons repo issues', () => {
        cy.request('https://github.com/pxblue/icons/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB icons-mui repo', () => {
        cy.request('https://github.com/pxblue/icons-mui/tree/master')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB icons-mui NPM package', () => {
        cy.request('https://www.npmjs.com/package/@pxblue/icons-mui')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB icons-mui repo issues', () => {
        cy.request('https://github.com/pxblue/icons-mui/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB mapbox repo', () => {
        cy.request('https://github.com/pxblue/mapbox/tree/master')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB mapbox NPM package', () => {
        cy.request('https://www.npmjs.com/package/@pxblue/mapbox')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB mapbox repo issues', () => {
        cy.request('https://github.com/pxblue/mapbox/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB symbols-mui repo', () => {
        cy.request('https://github.com/pxblue/symbols-mui/tree/master')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB symbols-mui NPM package', () => {
        cy.request('https://www.npmjs.com/package/@pxblue/symbols-mui')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB symbols-mui repo issues', () => {
        cy.request('https://github.com/pxblue/symbols-mui/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB themes repo', () => {
        cy.request('https://github.com/pxblue/themes/tree/master')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB themes NPM package', () => {
        cy.request('https://www.npmjs.com/package/@pxblue/themes')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })

    it('Verify PXB themes repo issues', () => {
        cy.request('https://github.com/pxblue/themes/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug')
            .should((response) => {
                expect(response.status).to.eq(200)
            })
    })
})