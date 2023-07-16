const search = instantsearch({
  indexName: 'events',
  searchClient: instantMeiliSearch(
    'https://search.yabu.me',
    '99ebaa5184aecda61bd9fa569039cc8c1fc31b1dc88289f2355e857731bac1ef',
  ),
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.refinementList({
    container: "#kinds",
    attribute: "kind",
    searchable: false,
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item(hit, { html, components }) {
        return html`
        <div>
          <div class="hit-content">
            <h2>
              ${components.Highlight({ attribute: 'content', hit })}
            </h2>
            <a href="https://yabu.me/${hit.kind === 1 ? window.NostrTools.nip19.noteEncode(hit.id) : window.NostrTools.nip19.npubEncode(hit.id)}">Source</a>
          </div>
        </div>
      `;
      },
      empty(results, { html }) {
        return html`No results for <q>${results.query}</q>`;
      },
    },
  }),
]);

search.start();