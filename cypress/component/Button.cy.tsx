import React from 'react'
import { Mail } from 'lucide-react'
import Button from '@/components/Button'

describe('Button Component', () => {
    it('renders correctly', () => {
        cy.mount(
            <Button
                icon={<Mail data-testid="mail-icon" />}
                text="Send Email"
                disabled={false}
            />
        )
        cy.get('[data-testid="mail-icon"]').should('exist')
        cy.contains('Send Email').should('exist')
    })

    it('applies custom className', () => {
        cy.mount(
            <Button
                icon={<Mail />}
                text="Send Email"
                disabled={false}
                className="custom-class"
            />
        )
        cy.get('button').should('have.class', 'custom-class')
    })

    it('disables the button when disabled prop is true', () => {
        cy.mount(
            <Button
                icon={<Mail />}
                text="Send Email"
                disabled={true}
            />
        )
        cy.get('button').should('be.disabled')
    })

    it('hides text on narrow screens', () => {
        cy.viewport('iphone-x')
        cy.mount(
            <Button
                icon={<Mail />}
                text="Send Email"
                disabled={false}
            />
        )
        cy.contains('Send Email').should('not.be.visible')
    })
})