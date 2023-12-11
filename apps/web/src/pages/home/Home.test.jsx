import Home from './Home';

describe('<Home />', () => {
  it('mounts', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Home />);
  });
});
