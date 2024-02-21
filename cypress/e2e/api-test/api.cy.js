/// <reference types="cypress" />

describe('API test for extract information from ID card', () => {
    context('POST /identity/ocr', () => {
        const endpoint = "/identity/ocr";

        it('Can extract information from ID card successfully', () => {
            let imageData = "image_base64";

            cy.request({
                method: "POST",
                url: endpoint,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    image: imageData,
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property("ID").to.be.a('string');
                expect(response.body).to.have.property("Name").to.be.a('string');
                expect(response.body).to.have.property("Birthday").to.be.a('string');
                expect(response.body).to.have.property("Address").to.be.a('string');
            });
        })

        it('Cannot extract information from ID card because submitting invalid image', () => {
            let imageData = "invalid_image_base64";

            cy.request({
                method: "POST",
                url: endpoint,
                failOnStatusCode: false,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    image: imageData,
                },
            }).then((response) => {
                expect(response.status).to.be.oneOf([400, 422]);
            });
        })
    })
})