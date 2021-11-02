const sb = require('./sidebar');

module.exports = {
  title: 'JS Blog',
  description: 'JeongShin 의 코딩 블로그 👨🏻‍💻',
  markdown: {
    lineNumbers: true,
    extendMarkdown: md => {
      md.use(require('markdown-it-plantuml'));
    }
  },
  head: [
    [
      'meta',
      { name: 'google-site-verification', content: '66JKoxw93huqhAdXO3P0K86NJZne5H-M3302YHcwoWI' }
    ]
  ],
  themeConfig: {
    logo: '/images/logo.jpg',
    nav: [
      { text: 'Home', link: '/' },
      { test: 'Home', link: '/home/' },
      { text: 'About me', link: '/aboutme/' }
    ],
    sidebar: sb,
    smoothScroll: true,
    searchPlaceholder: 'Search...'
  },
  base: '/JeongShin_Blog/',
  plugins: [
    // you can use this plugin multiple times
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'theorem',
        before: info => `<div class="theorem"><p class="title">${info}</p>`,
        after: '</div>'
      }
    ],

    // this is how VuePress Default Theme use this plugin
    [
      'vuepress-plugin-container',
      {
        type: 'tip',
        defaultTitle: {
          '/': 'TIP',
          '/zh/': '提示'
        }
      }
    ]
  ]
};
