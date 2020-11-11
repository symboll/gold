module.exports = {
  base: '',
  dest: './dist',
  title: 'node api docs',
  description: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
  themeConfig: {
    editLinks: false,
    docsDir: 'docs',
    nav: [],
    sidebar: [
      {
        title: 'fs',
        collapsable: false,
        children: [
          'fs/readdirsync',
          'fs/read',
        ]
      },
    ]
  }
}