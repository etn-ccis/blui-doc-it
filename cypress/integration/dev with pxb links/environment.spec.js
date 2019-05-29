/// <reference types="cypress" />

describe('Environment links', () => {
    it('Verify status for VS Code download page ', function () {
        cy.visit('localhost:3000/development/environment')
        cy.get(':nth-child(4) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Environment links', () => {
    it('Verify status for git download page', function () {
        cy.get(':nth-child(9) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Environment links', () => {
    it('Verify status for Nodejs download page', function () {
        cy.get(':nth-child(14) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Environment links', () => {
    it('Verify status for Yarn download page', function () {
        cy.get(':nth-child(16) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});

describe('Environment links', () => {
    it('Verify status for Android Studio download page', function () {
        cy.get(':nth-child(16) > a').then(function ($a) {
            const href = $a.prop('href')
            cy.request(href)
                .should((response) => {
                    expect(response.status).to.eq(200)

                })
        });
    });
});