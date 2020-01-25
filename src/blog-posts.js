export const getPosts = () => {
  return [
    {
      title: "1500TL ödül! Sen de yarışmaya katıl!",
      slug: "yarisma",
      details: require("./posts/yarisma.md").default,
      date: "5 Aralık 2019",
      image: "/resim.png",
      audio: "atdan-daha-iyi.ogg"
    },
    {
      title: "Örnek yazı",
      slug: "ornek-yazi",
      details: require("./posts/ornek-yazi.md").default,
      date: "3 Aralık 2019",
      image: "",
      audio: "atdan-daha-iyi.ogg"
    },
    {
      title: "Merhaba dünya!",
      slug: "merhaba",
      details: require("./posts/merhaba.md").default,
      date: "1 Aralık 2019",
      image: "",
      audio: "atdan-daha-iyi.ogg"
    },
    {
      title: "Gene Merhaba dünya!",
      slug: "gene-merhaba",
      details: require("./posts/merhaba.md").default,
      date: "1 Aralık 2019",
      image: "",
      audio: "atdan-daha-iyi.ogg"
    }
  ];
};
