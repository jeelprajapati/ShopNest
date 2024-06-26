import order from "./image/order.svg";
import like from "./image/like.svg";
import logout from "./image/logout.svg";
import user from "./image/user.svg";
import lock from "./image/lock.svg";
import product1 from "./image/product-01.jpg";
import product2 from "./image/product-02.jpg";
import product3 from "./image/product-03.jpg";
import product4 from "./image/product-04.jpg";

export const products = [
  {
    id: 1,
    item: "Esprit Ruffle Shirt",
    image: product1,
    price: 1400,
    color: ["Black", "Blue", "Gray"],
    size: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 2,
    item: "Herschel supply",
    image: product2,
    price: 2800,
    color: ["White", "Red", "Black", "Blue"],
    size: ["L", "XL", "XXL", "XXXL"],
  },
  {
    id: 3,
    item: "Only Check Trouser",
    image: product3,
    price: 2000,
    color: ["White", "Red", "Black", "Blue", "Gray"],
    size: ["S", "M", "L", "XL", "XXL", "XXXL"],
  },
  {
    id: 4,
    item: "Classic Trench Coat",
    image: product4,
    price: 6000,
    color: ["White", "Red", "Black", "Blue", "Gray"],
    size: ["S", "M", "L", "XL", "XXL", "XXXL"],
  },
  {
    id: 5,
    item: "Classic Trench Coat",
    image: product4,
    price: 6000,
    color: ["White", "Black", "Blue", "Gray"],
    size: ["S", "M", "L", "XL", "XXL", "XXXL"],
  },
  {
    id: 6,
    item: "Classic Trench Coat",
    image: product4,
    price: 6000,
    color: ["White", "Red", "Black", "Gray"],
    size: ["S", "M", "L", "XL", "XXL", "XXXL"],
  },
  {
    id: 7,
    item: "Classic Trench Coat",
    image: product4,
    price: 6000,
    color: ["White", "Red", "Black", "Blue"],
    size: ["S", "M", "L", "XL", "XXL", "XXXL"],
  },
];

export const accountList=[
  {
    id:1,
    name:"Orders",
    icon:order
  },
  {
    id:2,
    name:"Favorites",
    icon:like
  },
  {
    id:3,
    name:"Personal Detail",
    icon:user
  },
  {
    id:4,
    name:"Change Password",
    icon:lock
  },
  {
    id:5,
    name:"Sign Out",
    icon:logout
  },
]