const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/addItem', (req, res) => {
  try {
    const rawData = fs.readFileSync('./items.json');
    const data = JSON.parse(rawData);

    // Add the new item to the appropriate category and subcategory
    const category = req.body.itemCategory;
    const subcategory = req.body.itemSubcategory;

    const selectedCategory = data.categories.find(c => c.name === category);
    const selectedSubcategory = selectedCategory.subcategories.find(s => s.name === subcategory);

    selectedSubcategory.products.push({
      id: data.categories.flatMap(c => c.subcategories.flatMap(s => s.products)).length + 1,
      name: req.body.itemName,
      description: req.body.itemDescription,
      image: req.body.itemImage,
      price: parseFloat(req.body.itemPrice),
    });

    // Save the updated data back to the JSON file
    fs.writeFileSync('./items.json', JSON.stringify(data, null, 2));

    res.status(200).json({ message: 'Item added successfully.' });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
