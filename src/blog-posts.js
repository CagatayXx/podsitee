var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/firestore');

export const getPosts = () => {
  return [
    {
      title: require("./posts/yarisma/title.md").default,
      slug: require("./posts/yarisma/slug.md").default,
      details: require("./posts/yarisma/details.md").default,
      date: require("./posts/yarisma/date.md").default,
      image: require("./posts/yarisma/image.md").default,
      audio: "/atdan-daha-iyi.ogg"
    },
    {
      title: require("./posts/onemli/title.md").default,
      slug: require("./posts/onemli/slug.md").default,
      details: require("./posts/onemli/details.md").default,
      date: require("./posts/onemli/date.md").default,
      image: require("./posts/onemli/image.md").default,
      audio: "/atdan-daha-iyi.ogg"
    },
    {
      title: require("./posts/degisiklik/title.md").default,
      slug: require("./posts/degisiklik/slug.md").default,
      details: require("./posts/degisiklik/details.md").default,
      date: require("./posts/degisiklik/date.md").default,
      image: require("./posts/degisiklik/image.md").default,
      audio: "/atdan-daha-iyi.ogg"
    }
  ];
};
