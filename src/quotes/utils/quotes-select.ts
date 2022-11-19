export default [
  'quote.id',
  'quote.content',
  'quote.userId',
  "CAST(coalesce(SUM(vote.vote), '0') AS integer) AS voteScore",
  'ARRAY_AGG(DISTINCT CASE WHEN vote.vote = 1 THEN vote.userId END) AS upvoters',
  'ARRAY_AGG(DISTINCT CASE WHEN vote.vote = -1 THEN vote.userId END) AS downvoters',
];
