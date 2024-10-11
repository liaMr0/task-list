import React from 'react'
import { TaskList } from '@/components/TaskList'
import { useTaskManager } from '@/hooks/useTaskManager'
import { useMobileDetection } from '@/hooks/useMobileDetection'

describe('TaskList Component', () => {
  it('renders loading state', () => {
    cy.stub(React, 'useEffect').callsFake(() => { })
    cy.stub(useTaskManager, 'useTaskManager').returns({
      tasks: [],
      addTask: cy.stub(),
      editTask: cy.stub(),
      isLoading: true,
      error: null,
    })
    cy.stub(useMobileDetection, 'useMobileDetection').returns(false)

    cy.mount(<TaskList />)
    cy.contains('Loading tasks...').should('be.visible')
  })

  it('renders error state', () => {
    const errorMessage = 'Failed to load tasks'
    cy.stub(React, 'useEffect').callsFake(() => { })
    cy.stub(useTaskManager, 'useTaskManager').returns({
      tasks: [],
      addTask: cy.stub(),
      editTask: cy.stub(),
      isLoading: false,
      error: errorMessage,
    })
    cy.stub(useMobileDetection, 'useMobileDetection').returns(false)

    cy.mount(<TaskList />)
    cy.contains(errorMessage).should('be.visible')
  })

  it('renders task form and list', () => {
    const tasks = [
      { id: 1, description: 'Task 1' },
      { id: 2, description: 'Task 2' },
    ]
    cy.stub(React, 'useEffect').callsFake(() => { })
    cy.stub(useTaskManager, 'useTaskManager').returns({
      tasks,
      addTask: cy.stub(),
      editTask: cy.stub(),
      isLoading: false,
      error: null,
    })
    cy.stub(useMobileDetection, 'useMobileDetection').returns(false)

    cy.mount(<TaskList />)
    cy.get('input[placeholder="Type to add new task"]').should('be.visible')
    cy.contains('Task 1').should('be.visible')
    cy.contains('Task 2').should('be.visible')
  })
})