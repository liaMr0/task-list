import React from 'react'
import { getStyledText } from '@/helpers/getStyledText'

const TestComponent = ({ text, condensed }: { text: string; condensed: boolean }) => (
    <div>{getStyledText(text, condensed)}</div>
)

describe('getStyledText Helper', () => {
    it('styles mentions correctly', () => {
        cy.mount(<TestComponent text="@user" condensed={false} />)
        cy.get('span').should('have.css', 'background-color', 'rgb(173, 240, 217)')
        cy.get('span').should('have.css', 'color', 'rgb(7, 168, 115)')
    })

    it('styles hashtags correctly', () => {
        cy.mount(<TestComponent text="#tag" condensed={false} />)
        cy.get('span').should('have.css', 'background-color', 'rgb(219, 199, 255)')
        cy.get('span').should('have.css', 'color', 'rgb(112, 46, 230)')
    })

    it('styles emails correctly', () => {
        cy.mount(<TestComponent text="user@example.com" condensed={false} />)
        cy.get('span').should('have.css', 'background-color', 'rgb(255, 230, 199)')
        cy.get('span').should('have.css', 'color', 'rgb(245, 142, 10)')
    })

    it('styles links correctly', () => {
        cy.mount(<TestComponent text="https://example.com" condensed={false} />)
        cy.get('span').should('have.css', 'background-color', 'rgb(214, 235, 255)')
        cy.get('span').should('have.css', 'color', 'rgb(0, 127, 255)')
    })

    it('condenses emails when condensed is true', () => {
        cy.mount(<TestComponent text="user@example.com" condensed={true} />)
        cy.get('span').find('svg').should('have.attr', 'data-icon', 'mail')
    })

    it('condenses links when condensed is true', () => {
        cy.mount(<TestComponent text="https://example.com" condensed={true} />)
        cy.get('span').find('svg').should('have.attr', 'data-icon', 'link')
    })
})