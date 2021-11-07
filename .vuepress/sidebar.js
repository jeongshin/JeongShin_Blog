const ALGO = `/algorithms/Problems`;
const ALLIVE = `/Projects/Allive`;

module.exports = [
  {
    title: 'Guide',
    path: '/guide/',
    collapsable: true,
    children: []
  },
  // {
  //   title: 'Today I Learned',
  //   path: '/TIL/',
  //   collapsable: true,
  //   children: [''].map(v => `${Study}/${v}`)
  // },
  {
    title: 'Projects',
    path: '/Projects/',
    collapsable: true,
    children: [''].map(v => `${ALLIVE}/${v}`)
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
  }
];
