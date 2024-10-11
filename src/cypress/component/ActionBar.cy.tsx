import ActionBar from '@/components/taskList/ActionBar'
import React from 'react'

describe('ActionBar Component', () => {
    const defaultProps = {
        showElements: true,
        newTask: '',
        isNarrowScreen: false,
        editingTaskId: null,
        hideElements: cy.stub(),
        handleSubmit: cy.stub(),
    }

    it('renders correctly when not narrow screen', () => {
        cy.mount(<ActionBar {...defaultProps} />)
        cy.contains('Open').should('exist')
        cy.contains('Today').should('exist')
        cy.contains('Public').should('exist')
        cy.contains('Highlight').should('exist')
        cy.contains('Estimation').should('exist')
        cy.contains('Cancel').should('exist')
        cy.contains('Ok').should('exist')
    })

    it('renders correctly when narrow screen', () => {
        cy.mount(<ActionBar {...defaultProps} isNarrowScreen={true} />)
        cy.contains('Cancel').should('not.exist')
        cy.get('button').last().find('svg').should('exist')
    })

    it('disables buttons when newTask is empty', () => {
        cy.mount(<ActionBar {...defaultProps} />)
        cy.contains('Open').should('be.disabled')
        cy.contains('Today').should('be.disabled')
        cy.contains('Public').should('be.disabled')
        cy.contains('Highlight').should('be.disabled')
        cy.contains('Estimation').should('be.disabled')
    })

    it('enables buttons when newTask is not empty', () => {
        cy.mount(<ActionBar {...defaultProps} newTask="New Task" />)
        cy.contains('Open').should('not.be.disabled')
        cy.contains('Today').should('not.be.disabled')
        cy.contains('Public').should('not.be.disabled')
        cy.contains('Highlight').should('not.be.disabled')
        cy.contains('Estimation').should('not.be.disabled')
    })

    it('calls hideElements when Cancel is clicked', () => {
        const hideElements = cy.stub()
        cy.mount(<ActionBar {...defaultProps} hideElements={hideElements} />)
        cy.contains('Cancel').click()
        cy.wrap(hideElements).should('have.been.called')
    })

    it('calls handleSubmit when Ok is clicked and newTask is not empty', () => {
        const handleSubmit = cy.stub()
        cy.mount(<ActionBar {...defaultProps} newTask="New Task" handleSubmit={handleSubmit} />)
        cy.contains('Add').click()
        cy.wrap(handleSubmit).should('have.been.called')
    })
})