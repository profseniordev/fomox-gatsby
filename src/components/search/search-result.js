import { Link } from "gatsby";
import { default as React } from "react";
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom";
const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;
  return hitCount > 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null;
});
const PageHit = ({ hit }) => {
  return (
    <div>
      <h4>
        <Highlight attribute="data.title" hit={hit} tagName="mark" />
      </h4>
    </div>
  );
};
const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
);
const SearchResult = ({ indices, className }) => (
  <div className={className}>
    {indices.map((index) => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <PoweredBy />
  </div>
);
export default SearchResult;
