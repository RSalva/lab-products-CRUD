const { faker } = require("@faker-js/faker");
const Product = require("../lib/models/products.model");
const Comment = require("../lib/models/comments.model");
const { clearDB, closeDBConnection } = require("../lib/db");

console.log("seed");

async function run() {
  await clearDB();

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Sports & Outdoors",
    "Books",
    "Health & Beauty",
    "Toys & Games",
    "Automotive",
    "Grocery",
    "Pet Supplies",
  ];

  const products = [];

  for (let i = 0; i < 10; i++) {
    const product = await Product.create({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
      discount: faker.number.int({ min: 0, max: 50 }),
      category: faker.helpers.arrayElement(categories),
      stock: faker.number.int({ min: 0, max: 200 }),
    });

    products.push(product);
  }

  for (const product of products) {
    for (let j = 0; j < 5; j++) {
      await Comment.create({
        commentary: faker.lorem.sentences({ min: 1, max: 3 }),
        product: product._id,
      });
    }
  }

  console.log("✅ Datos generados correctamente");

  await closeDBConnection();
}
