import { useMobileDetection } from "@/hooks/useMobileDetection"

const TestComponent = () => {
    const isNarrowScreen = useMobileDetection()
    return <div>{isNarrowScreen ? 'Narrow Screen' : 'Wide Screen'}</div>
}

describe('useMobileDetection Hook', () => {
    it('detects wide screen', () => {
        cy.viewport(1920, 1080)
        cy.mount(<TestComponent />)
        cy.contains('Wide Screen').should('be.visible')
    })

    it('detects narrow screen', () => {
        cy.viewport('iphone-x')
        cy.mount(<TestComponent />)
        cy.contains('Narrow Screen').should('be.visible')
    })

    it('updates on resize', () => {
        cy.viewport(1920, 1080)
        cy.mount(<TestComponent />)
        cy.contains('Wide Screen').should('be.visible')

        cy.viewport('iphone-x')
        cy.contains('Narrow Screen').should('be.visible')
    })
})