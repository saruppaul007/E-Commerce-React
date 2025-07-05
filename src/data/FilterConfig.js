export const filterConfig = {
  shirts: {
    categories: ["Men", "Women", "Kids"],
    subCategories: [
      "Cotton Shirts",
      "Linen Shirts",
      "Casual Shirts",
      "Formal Shirts",
      "Printed Shirts",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    priceRanges: [
      { label: "Rs. 499 - Rs. 999", min: 499, max: 999 },
      { label: "Rs. 1000 - Rs. 1599", min: 1000, max: 1599 },
      { label: "Rs. 1600 - Rs. 1999", min: 1600, max: 1999 },
    ],
    themes: ["Weekend", "Office Wear", "Vacation"],
  },
  "oversized-t-shirts": {
    categories: ["Men", "Women"],
    subCategories: ["Cotton Oversized T-Shirts", "Printed Oversized T-Shirts"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    priceRanges: [
      { label: "Rs. 499 - Rs. 999", min: 499, max: 999 },
      { label: "Rs. 1000 - Rs. 2000", min: 1000, max: 2000 },
    ],
    themes: ["Casual", "Street Style"],
  },
  tops: {
    categories: ["Women", "Kids"],
    subCategories: ["Cotton Tops", "Chiffon Tops", "Crop Tops", "Tank Tops"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    priceRanges: [
      { label: "Rs. 499 - Rs. 999", min: 499, max: 999 },
      { label: "Rs. 1000 - Rs. 1599", min: 1000, max: 1599 },
      { label: "Rs. 1600 - Rs. 2499", min: 1600, max: 2499 },
    ],
    themes: ["Party", "Casual", "Beachwear"],
  },
  sneakers: {
    categories: ["Men", "Women", "Kids"],
    subCategories: ["Running Shoes", "High Tops", "Slip-ons"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    priceRanges: [
      { label: "Rs. 1500 - Rs. 2500", min: 1500, max: 2500 },
      { label: "Rs. 2500 - Rs. 3500", min: 2500, max: 3500 },
      { label: "Rs. 3500 - Rs. 5000", min: 3500, max: 5000 },
    ],
    themes: ["Sports", "Lifestyle", "Athletic"],
  },
  jumpsuits: {
    categories: ["Women"],
    subCategories: ["Denim Jumpsuits", "Floral Jumpsuits"],
    sizes: ["XS", "S", "M", "L", "XL"],
    priceRanges: [
      { label: "Rs. 999 - Rs. 1999", min: 999, max: 1999 },
      { label: "Rs. 2000 - Rs. 2999", min: 2000, max: 2999 },
    ],
    themes: ["Casual", "Beachwear"],
  },
  jackets: {
    categories: ["Men", "Women"],
    subCategories: ["Denim Jackets", "Bomber Jackets", "Winter Coats"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    priceRanges: [
      { label: "Rs. 1499 - Rs. 2499", min: 1499, max: 2499 },
      { label: "Rs. 2500 - Rs. 3999", min: 2500, max: 3999 },
    ],
    themes: ["Winter", "Casual"],
  },
  "all-bottoms": {
    categories: ["Men", "Women", "Kids"],
    subCategories: [
      "Jeans",
      "Cotton Pants",
      "Joggers",
      "Shorts",
      "Skirts",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    priceRanges: [
      { label: "Rs. 499 - Rs. 999", min: 499, max: 999 },
      { label: "Rs. 1000 - Rs. 2499", min: 1000, max: 2499 },
    ],
    themes: ["Casual", "Formal"],
  },
  accessories: {
    categories: ["Men", "Women", "Kids"],
    subCategories: [
      "Backpacks",
      "Belts",
      "Caps",
      "Handbags",
      "Wallets",
    ],
    priceRanges: [
      { label: "Rs. 299 - Rs. 799", min: 299, max: 799 },
      { label: "Rs. 800 - Rs. 1999", min: 800, max: 1999 },
    ],
    themes: ["Travel", "Casual", "Formal"],
  },
};
