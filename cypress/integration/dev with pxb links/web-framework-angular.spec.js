/// <reference types="cypress" />

describe('PXB Angular web guide links', () => {
    it('Verify status for Angular CLI home page ', function () {
        cy.visit('localhost:3000/development/frameworks-web/angular')
        cy.get('[href="http://cli.angular.io/"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('PXB Angular web guide links', () => {
    it('Verify status for PXB Stackblitz Org page', function () {
        cy.get('[href="http://www.stackblitz.com/@px-blue"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('PXB Angular web guide links', () => {
    it('Verify status for PXB github Org page', function () {
        cy.get('[href="https://github.com/pxblue"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('PXB Angular web guide links', () => {
    it('Verify status for Angular Material page', function () {
        cy.get('ol > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('PXB Angular web guide links', () => {
    it('Verify status for PXB NPM theme page', function () {
        cy.get(':nth-child(3) > ul > li > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('PXB Angular web guide links', () => {
    it('Verify status for Angular theme page', function () {
        cy.get(':nth-child(19) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('PXB Angular web guide links', () => {
    it('Verify status for Angular theming page', function () {
        cy.get(':nth-child(17) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('PXB Angular web guide links', () => {
    it('Verify status for Material Angular components page', function () {
        cy.get(':nth-child(19) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('PXB Angular web guide links', () => {
    it('Verify status for Angular browsers page', function () {
        cy.get(':nth-child(22) > :nth-child(1) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('PXB Angular web guide links', () => {
    it('Verify status for Angular components material page', function () {
        cy.get(':nth-child(22) > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('PXB Angular web guide links', () => {
    it('Verify status for Angular license page', function () {
        cy.get('[href="https://github.com/angular/angular/blob/master/LICENSE"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('PXB Angular web guide links', () => {
    it('Verify status for Angular component license page', function () {
        cy.get('[href="https://github.com/angular/material2/blob/master/LICENSE"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});