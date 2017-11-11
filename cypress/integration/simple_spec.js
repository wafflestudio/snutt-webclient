describe('SNUTT Web client test', () => {
  it('should show list of coursebooks', () => {
    cy.visit('http://localhost:3000');
    const coursebookDropdown = cy.get('.Select-value-label'
    console.log(coursebookDropdown);
    expect(coursebookDropdown).to.have.text('2017-W');
    console.log(coursebookDropdown);
  });
});
