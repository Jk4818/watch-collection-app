
import { nanoid } from 'nanoid';
import { Timestamp } from 'firebase/firestore';

const sandboxWatches = [
    {
      id: nanoid(),
      name: "Omega Speedmaster Professional Moonwatch",
      dateObtained: Timestamp.fromDate(new Date()),
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-speedmaster-moonwatch-31130423001005-l.png",
    },
    {
      id: nanoid(),
      name: "Rolex Datejust 41mm",
      dateObtained: Timestamp.fromDate(new Date()),
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: "https://content.rolex.com/dam/2022/upright-bba/m126333-0010.png?impolicy=v6-upright",
    },
    {
      id: nanoid(),
      name: "Omega Seamaster Professional 300m",
      dateObtained: Timestamp.fromDate(new Date()),
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: "https://www.omegawatches.com/media/catalog/product/cache/a5c37fddc1a529a1a44fea55d527b9a116f3738da3a2cc38006fcc613c37c391/o/m/omega-seamaster-diver-300m-21030422004001-l.png",
    },
    {
      id: nanoid(),
      name: "Grand Seiko White Birch",
      dateObtained: Timestamp.fromDate(new Date()),
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: "https://www.grand-seiko.com/uk-en/-/media/Images/Product--Image/All/GrandSeiko/2022/02/19/23/14/SLGH005G/SLGH005G.png",
    },
    {
      id: nanoid(),
      name: "Breitling Navitimer",
      dateObtained: Timestamp.fromDate(new Date()),
      pricePurchased: "2500",
      resaleValue: "3000",
      imgURL: "https://www.breitling.com/media/image/2/gallery_square_700/asset-version-4a836d168b/ab0139211g1p1-navitimer-b01-chronograph-41-soldier.png",
    },
]
const sandboxData = [
  {
    id: 'column-1',
    columnTitle: 'My Collection',
    cards: [sandboxWatches[0].id,sandboxWatches[1].id,sandboxWatches[2].id]
  },
  {
    id: 'column-2',
    columnTitle: 'Wish List',
    cards: [sandboxWatches[4].id,]
  },
  {
    id: 'column-3',
    columnTitle: 'Archived',
    cards: [sandboxWatches[3].id]
  }
];


export {sandboxData, sandboxWatches};