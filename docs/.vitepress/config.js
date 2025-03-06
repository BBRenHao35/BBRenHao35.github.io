export default {
  themeConfig: {
    siteTitle: "豪 Blog",
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
      { icon: "github", link: "https://github.com/BBRenHao35" },
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
          { text: "Docker", link: "/post/docker.md" },
          { text: "Cookie", link: "/post/cookie.md" },
          { text: "Session", link: "/post/session.md" },
          { text: "JWT", link: "/post/jwt.md" },
          { text: "DNS", link: "/post/dns.md" },
          { text: "StaticIP", link: "/post/staticip.md" },
          { text: "SSH", link: "/post/ssh.md" },
          { text: "Lambda", link: "/post/lambda.md" },
        ],
      },
      {
        text: "DB",
        items: [
          { text: "Postgres + pgAdmin", link: "/db/postgres.md", },
          { text: "Cassandra CQL + Cassandra", link: "/db/cassandra.md" },
          { text: "Mongo + Mongo Express", link: "/db/mongo.md" },
          { text: "Redis + Redisinsight", link: "/db/redis.md" },
        ],
        collapsible: true, // 開啟側邊折疊功能
        collapsed: false // 預設展開側邊攔
      },
      {
        text: "Security",
        items: [
          { text: "Sonarqube", link: "/security/sonarqube.md", },
        ]
      }
    ],
    // =========================================================
  }
}