describe('shared-ui: TopicButton component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=topicbutton--primary&args=topicName:React')
  );

  it('should render the topic name', () => {
    cy.get('[data-testid=topicName]').should('contain', 'React');
  });

  it('should correctly pass the topic name to the click event', () => {
    cy.get('[data-testid=topicButton]').click();

    cy.get('[data-testid=click-result]').should('contain', 'React');
  });
});
