import TaskList from "@/components/TaskList"

describe('TaskList Component', () => {
  it('renders TaskList component', () => {
    cy.mount(<TaskList />)
    cy.get('[data-testid="task-list"]').should('exist')
  })
})