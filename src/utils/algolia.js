const postQuery = `{
  posts: allAirtable {
      nodes {
          data {
              title
              excerpt
              body
              author
              url
              tags
              slug
              image {
                  url
              }
          }
      }
  }
}`

const flatten = arr =>
arr.map(({ nodes: { data, ...rest } }) => ({
  ...data,
  ...rest,
}))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
{
  query: postQuery,
  transformer: ({ data }) => flatten(data.posts.nodes),
  indexName: `fomox`,
  settings,
},
]

module.exports = queries;
