module.exports = {
  title: "Vue Concepts",
  themeConfig: {
    sidebar: [
      { text: "基础概念", link: "base-concept/" },
      { text: "进阶概念", link: "enhance-concept/" },
      { text: "vue-router", link: "vue-router/" },
      { text: "vuex", link: "vuex/" },
      {
        text: "项目搭建",
        link: "build/",
        children: [
          {
            text: "初始化",
            link: "build/init",
          },
          { text: "项目结构", link: "build/frame" },
          { text: "其他工具", link: "build/resource" },
        ],
      },
      { text: "开发模板" },
    ],
  },
};
