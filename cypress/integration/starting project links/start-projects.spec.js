/// <reference types="cypress" />

describe('Where to begin links', () => {
    it('Verify request status for PXB Web App guide', function () {
        cy.visit('localhost:3000/get-started/new-project')
        cy.get(':nth-child(4) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Where to begin links', () => {
    it('Verify request status for PXB Mobile App guide', function () {
        cy.get(':nth-child(6) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Web App links', () => {
    it('Verify request status for PXB Framework intro', function () {
        cy.visit('localhost:3000/get-started/web')
        cy.get(':nth-child(7) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile App links', () => {
    it('Verify request status for iOS guide', function () {
        cy.visit('localhost:3000/get-started/mobile')
        cy.get('ul > :nth-child(1) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile App links', () => {
    it('Verify request status for Android guide', function () {
        cy.get('ul > :nth-child(2) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile App links', () => {
    it('Verify request status for PXB Mobile Framework intro', function () {
        cy.get(':nth-child(15) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile App links', () => {
    it('Verify request status for Android Material io', function () {
        cy.get('[href="https://material.io/develop/android/"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile App links', () => {
    it('Verify request status for iOS Material io', function () {
        cy.get('[href="https://material.io/develop/ios/"]').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Mobile App links', () => {
    it('Verify PX Blue email', function () {
        cy.get('blockquote > p > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(href).to.eq('mailto:pxblue@eaton.com')

                })
        });
    });
});