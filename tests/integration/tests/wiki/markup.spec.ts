import { NavRoute, serverName } from 'utils/routes';

describe('markup', () => {
  it('converts text to components', () => {
    cy.visit(`/${serverName}${NavRoute.WIKI}/proposals/new`);
    cy.dataCy('title', 'input').type('Wiki page title');

    // Simple
    cy.dataCy('content', 'textarea').type('Wiki page content');
    cy.dataCy('content', 'div').should('have.html', 'Wiki page content');

    // Newline
    cy.dataCy('content', 'textarea').type('\nwith a new line');
    cy.dataCy('content', 'div').should('have.html', 'Wiki page content<br>with a new line');

    // Bold, italic
    cy.dataCy('content', 'textarea')
      .clear()
      .type('text is *italic* **bold** ***italic and bold***');
    cy.dataCy('content', 'div').should(
      'have.html',
      'text is <em>italic</em> <strong>bold</strong> <strong><em>italic and bold</em></strong>',
    );

    // Striked
    cy.dataCy('content', 'textarea').clear().type('text is ~~striked~~');
    cy.dataCy('content', 'div').should('include.html', 'text is <span');
    cy.dataCy('content', 'div').find('span').should('have.css', 'text-decoration');

    // Spoiler
    cy.dataCy('content', 'textarea').clear().type('text is ||hidden||');
    cy.dataCy('content', 'div').should('include.html', 'text is <span');
    cy.dataCy('content', 'div')
      .find('span')
      .should('have.css', 'color', 'rgba(0, 0, 0, 0)')
      .click()
      .should('not.have.css', 'color', 'rgba(0, 0, 0, 0)');

    // Title
    cy.dataCy('content', 'textarea').clear().type('==Title==');
    cy.dataCy('content', 'div').should('include.html', '<h2').and('include.text', 'Title');
    cy.dataCy('content', 'textarea').clear().type('==Title==\n\nText'); // ignore one newline
    cy.dataCy('content', 'div').should('include.html', '</h2><br>Text');

    // External link
    cy.dataCy('content', 'textarea').clear().type('[url]');
    cy.dataCy('content', 'div')
      .should('include.html', '<a target="_blank" rel="noopener"')
      .and('include.html', 'href="url">url</a>');

    // Discord link
    cy.dataCy('content', 'textarea').clear().type('[[[discord-url]]]');
    cy.dataCy('content', 'div')
      .should('include.html', 'href="discord-url"')
      .and('include.html', '<svg')
      .and('include.html', 'Lien discord');
    cy.dataCy('content', 'textarea').clear().type('[[[discord-url]]](Nom du lien discord)');
    cy.dataCy('content', 'div')
      .should('include.html', 'href="discord-url"')
      .and('include.html', '<svg')
      .and('include.html', 'Nom du lien discord');

    // Wiki internal link
    cy.seedCollection('wikiPages', 'wikiPages');
    cy.dataCy('content', 'textarea').clear().type('[[Unknown wiki page name]]');
    cy.dataCy('content', 'div')
      .should('include.html', '<a')
      .and('include.text', 'Unknown wiki page name');
    cy.dataCy('content', 'div').find('a').should('have.css', 'color', 'rgb(197, 48, 48)');
    cy.dataCy('content', 'textarea').clear().type('[[Wiki page 2]]');
    cy.dataCy('content', 'div').should('include.html', '<a').and('include.text', 'Wiki page 2');
    cy.dataCy('content', 'div').find('a').should('have.css', 'color', 'rgb(194, 230, 255)');
    cy.dataCy('content', 'textarea').clear().type('[[Wiki page 2|A different name]] and the suite');
    cy.dataCy('content', 'div')
      .should('include.html', 'wiki-page-2')
      .and('include.text', 'A different name and the suite')
      .and('include.html', '</a> and the suite');
    cy.dataCy('content', 'textarea').clear().type('[[Wiki page 2|Banana]]s and the suite');
    cy.dataCy('content', 'div')
      .should('include.html', 'wiki-page-2')
      .and('include.text', 'Bananas and the suite')
      .and('include.html', '</a> and the suite');

    // Icon
    cy.dataCy('content', 'textarea').clear().type('{{}{{}UnknownIconName}}');
    cy.dataCy('content', 'div').should('include.html', '<span title="Icône non trouvée"');
    cy.dataCy('content', 'textarea').clear().type('{{}{{}Gi3DHammer}}');
    cy.dataCy('content', 'div')
      .should('not.include.html', '<span title="Icône non trouvée"')
      .and('include.html', '<svg');

    // Image
    cy.dataCy('content', 'textarea').clear().type('<<url>>');
    cy.dataCy('content', 'div').should('include.html', '<button');
    cy.dataCy('content', 'div').find('div').should('have.css', 'display', 'block');
    cy.dataCy('content', 'div')
      .find('img')
      .should('have.css', 'width', '200px')
      .and('have.css', 'height', '200px')
      .and('have.css', 'object-fit', 'contain')
      .and('have.css', 'object-position', '50% 50%')
      .and('not.contain.html', 'figcaption');
    cy.dataCy('content', 'textarea').clear().type('<<url>>342x342');
    cy.dataCy('content', 'div')
      .find('img')
      .should('have.css', 'width', '342px')
      .and('have.css', 'height', '342px');
    cy.dataCy('content', 'textarea').clear().type('<<url>>t');
    cy.dataCy('content', 'div').find('div').should('have.css', 'display', 'inline');
    cy.dataCy('content', 'textarea').clear().type('<<url>>r');
    cy.dataCy('content', 'div').find('img').should('have.css', 'object-fit', 'cover');
    cy.dataCy('content', 'textarea').clear().type('<<url>>g');
    cy.dataCy('content', 'div').find('img').should('have.css', 'object-position', '0% 50%');
    cy.dataCy('content', 'textarea').clear().type('<<url>>(legend)');
    cy.dataCy('content', 'div').should('have.text', 'legend');
    cy.dataCy('content', 'textarea').clear().type('<<url>>160x140rtd(legend)');
    cy.dataCy('content', 'div').find('div').should('have.css', 'display', 'inline');
    cy.dataCy('content', 'div')
      .find('img')
      .should('have.css', 'width', '160px')
      .and('have.css', 'height', '140px')
      .and('have.css', 'object-fit', 'cover')
      .and('have.css', 'object-position', '100% 50%');
    cy.dataCy('content', 'div').should('have.text', 'legend');

    // Grid
    cy.dataCy('content', 'textarea')
      .clear()
      .type('<Grille 70% 30%>\n<Colonne>Column 1<Colonne>Column 2</Grille>');
    cy.dataCy('content', 'div')
      .children()
      .should('have.css', 'display', 'grid')
      .and('have.css', 'grid-template-columns', '946.4px 405.6px') //70% 30%
      .and('have.text', 'Column 1Column 2')
      .find('div')
      .should('have.length', 2);

    // Pre (ignore markup)
    cy.dataCy('content', 'textarea')
      .clear()
      .type('`1 *2* **3** ***4*** ~~5~~ ||6|| [7] [[8]] [[[9]]] <<10>> {{}{{}11}}`');
    cy.dataCy('content', 'div')
      .should('contain.html', '<pre')
      .and(
        'contain.html',
        '1 *2* **3** ***4*** ~~5~~ ||6|| [7] [[8]] [[[9]]] &lt;&lt;10&gt;&gt; {{11}}',
      );

    // No xss vulnerability
    cy.dataCy('content', 'textarea').type('Text in <strong>bold</strong>');
    cy.dataCy('content', 'div').should('contain.html', 'Text in &lt;strong&gt;bold&lt;/strong&gt;');
  });
});
