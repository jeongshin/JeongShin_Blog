const Review2020 = `/daily/2020`;
const Book = `/book-review`;
const ALGO = `/algorithms/Problems`;
const Study = `/TIL/study`;

module.exports = [
  {
    title: 'Guide',
    path: '/guide/',
    collapsable: true,
    children: []
  },
  {
    title: 'Today I Learned',
    path: '/TIL/',
    collapsable: true,
    children: [''].map(v => `${Study}/${v}`)
  },
  {
    title: 'Algorithms',
    path: '/algorithms/',
    collapsable: true,
    children: [
      '',
      'Codility',
      'Programmers-l2',
      'Programmers-l3',
      'Programmers-l4',
      'LeetCode'
    ].map(v => `${ALGO}/${v}`)
  },
  {
    title: 'Book-Review',
    path: '/book-review/',
    collapsable: true,
    children: [''].map(v => `${Book}/${v}/`)
  }
];
