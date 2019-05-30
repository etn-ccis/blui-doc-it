/// <reference types="cypress" />

describe('License page links', () => {
    it('Verify request status for BSD-3-Clause', function () {
        cy.visit('localhost:3000/community/license')
        cy.get('[style="padding-bottom: 50vh;"] > div > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for code sharing', function () {
        cy.get(':nth-child(6) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Share Code page links', () => {
    it('Verify request status for stackblitz home page', function () {
        cy.visit('localhost:3000/community/sharing')
        cy.get(':nth-child(3) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for PX Blue Org github page', function () {
        cy.get('ul > :nth-child(1) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for PX Blue Org stackblitz page', function () {
        cy.get('ul > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify PX Blue email', function () {
        cy.get('[style="padding-bottom: 50vh;"] > div > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(href).to.eq('mailto:pxblue@eaton.com')

                })
        });
    });
});

describe('Report Bugs page links', () => {
    it('Verify request status for material design home page', function () {
        cy.visit('localhost:3000/community/bugs')
        cy.get('[style="padding-bottom: 50vh;"] > div > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify PX Blue email', function () {
        cy.get(':nth-child(6) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(href).to.eq('mailto:pxblue@eaton.com')

                })
        });
    });

    it('Verify request status for PX Blue Org github page', function () {
        cy.get(':nth-child(8) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Angular issues page', function () {
        cy.get(':nth-child(12) > :nth-child(1) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Angular Material page', function () {
        cy.get(':nth-child(12) > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for React issues page', function () {
        cy.get(':nth-child(14) > :nth-child(1) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Material UI issues page', function () {
        cy.get(':nth-child(14) > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Request Features page links', () => {
    it('Verify PX Blue email', function () {
        cy.visit('localhost:3000/community/features')
        cy.get(':nth-child(3) > [href="mailto:pxblue@eaton.com"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(href).to.eq('mailto:pxblue@eaton.com')

                })
        });
    });

    it('Verify request status for PX Blue github org page', function () {
        cy.get('[href="https://github.com/pxblue"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Angular issues page', function () {
        cy.get('[href="https://github.com/angular/angular/issues"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Angular material components page', function () {
        cy.get(':nth-child(6) > :nth-child(1) > ul > li > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for React issues page', function () {
        cy.get('[href="https://github.com/facebook/react/issues"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Material UI issues page', function () {
        cy.get(':nth-child(2) > ul > li > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Cordova issues page', function () {
        cy.get(':nth-child(6) > :nth-child(3) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Native Script issues page', function () {
        cy.get(':nth-child(4) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for React Native issues page', function () {
        cy.get(':nth-child(5) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('FAQ page links ', () => {
    it('Verify request status for BSD-3-Clause', function () {
        cy.visit('localhost:3000/community/faq')
        cy.get('ol > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Angular get started page', function () {
        cy.get('ul > :nth-child(1) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for React get started page', function () {
        cy.get('ul > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Apache Cordova get started page', function () {
        cy.get(':nth-child(7) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for Layout Patterns page', function () {
        cy.get(':nth-child(9) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify request status for HighCharts home page', function () {
        cy.get(':nth-child(11) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify PX Blue email', function () {
        cy.get(':nth-child(13) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(href).to.eq('mailto:pxblue@eaton.com')

                })
        });
    });

    it('Verify request status for Share code page', function () {
        cy.get(':nth-child(14) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});