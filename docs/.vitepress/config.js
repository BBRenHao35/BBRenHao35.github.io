export default {
  themeConfig: {
    siteTitle: "Axel Blog",
    lastUpdated: true,
    // logo: "/logo.png",
    docFooter: { prev: '上一篇', next: '下一篇' },
    // =========================================================
    // navbar
    nav: [
      { text: "首頁", link: "/index.md" },
      // { text: "sample", link: "/index_sample.md" },
      // {
      //   text: "Drop Menu",
      //   items: [
      //     { text: 'Item A', link: '/item-1' },
      //     { text: 'Item B', link: '/item-2' },
      //   ]
      // }
    ],
    // GitHub Link
    socialLinks: [
      { icon: "github", link: "https://github.com/axel1227" },
    ],
    // =========================================================
    // sidebar
    sidebar: [
      {
        // text: "Markdown",
        items: [
          { text: "Markdown 語法", link: "/post/markdown.md", },
          { text: "Git 指令", link: "/post/git.md", },
          { text: "VitePress 安裝", link: "/post/vitepress.md", },
        ],
      },
      // {
      //   text: "sample",
      //   items: [
      //     { text: "sample1", link: "/sample/sample1.md", },
      //     { text: "sample2", link: "/sample/sample2.md" },
      //   ],
      //   collapsible: true, // 開啟側邊折疊功能
      //   collapsed: false // 預設展開側邊攔
      // },
    ],
    // =========================================================
  }
}