/// <reference types="cypress" />

describe('PXB React web guide links', () => {
    it('Verify status for Create React app page ', function () {
        cy.visit('localhost:3000/development/frameworks-web/react')
        cy.get('[href="https://github.com/facebookincubator/create-react-app"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for PXB Stackblitz Org page', function () {
        cy.get('[href="http://www.stackblitz.com/@px-blue"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for PXB github Org page', function () {
        cy.get('[href="https://github.com/pxblue"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for Material-UI component page', function () {
        cy.get('ol > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for PXB NPM theme page', function () {
        cy.get(':nth-child(3) > ul > :nth-child(1) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for React theming page', function () {
        cy.get(':nth-child(16) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for Material-UI page', function () {
        cy.get(':nth-child(18) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for React browser support page', function () {
        cy.get(':nth-child(21) > :nth-child(1) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for Material-UI browser support page', function () {
        cy.get(':nth-child(21) > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for React license page', function () {
        cy.get('[href="https://github.com/facebook/react/blob/master/LICENSE"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });

    it('Verify status for Material-UI license page', function () {
        cy.get('[href="https://github.com/mui-org/material-ui/blob/master/LICENSE"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});