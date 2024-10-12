import TaskForm from '@/components/taskList/TaskForm'
import React from 'react'

describe('TaskForm Component', () => {
    it('renders correctly', () => {
        const mockProps = {
            newTask: '',
            setNewTask: cy.stub(),
            handleSubmit: cy.stub(),
            setShowElements: cy.stub(),
            tasksExist: false,
            showElements: false,
        }

        cy.mount(<TaskForm {...mockProps} />)
        cy.get('input[placeholder="Type to add new task"]').should('exist')
        cy.get('svg').should('have.class', 'text-blue-500')
    })

    it('calls setNewTask when typing', () => {
        const setNewTask = cy.stub()
        const mockProps = {
            newTask: '',
            setNewTask,
            handleSubmit: cy.stub(),
            setShowElements: cy.stub(),
            tasksExist: false,
            showElements: false,
        }

        cy.mount(<TaskForm {...mockProps} />)
        cy.get('input[placeholder="Type to add new task"]').type('New Task')
        cy.wrap(setNewTask).should('have.been.calledWith', 'New Task')
    })

    it('calls setShowElements when input is focused', () => {
        const setShowElements = cy.stub()
        const mockProps = {
            newTask: '',
            setNewTask: cy.stub(),
            handleSubmit: cy.stub(),
            setShowElements,
            tasksExist: false,
            showElements: false,
        }

        cy.mount(<TaskForm {...mockProps} />)
        cy.get('input[placeholder="Type to add new task"]').focus()
        cy.wrap(setShowElements).should('have.been.calledWith', true)
    })

    it('shows avatar when tasks do not exist', () => {
        const mockProps = {
            newTask: '',
            setNewTask: cy.stub(),
            handleSubmit: cy.stub(),
            setShowElements: cy.stub(),
            tasksExist: false,
            showElements: false,
        }

        cy.mount(<TaskForm {...mockProps} />)
        cy.get('img[alt="@usuario"]').should('exist')
    })

    it('hides avatar when tasks exist', () => {
        const mockProps = {
            newTask: '',
            setNewTask: cy.stub(),
            handleSubmit: cy.stub(),
            setShowElements: cy.stub(),
            tasksExist: true,
            showElements: false,
        }

        cy.mount(<TaskForm {...mockProps} />)
        cy.get('img[alt="@usuario"]').should('not.exist')
    })
})