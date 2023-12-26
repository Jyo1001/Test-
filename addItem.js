document.addEventListener('DOMContentLoaded', function () {
  // Fetch the JSON data to get categories and subcategories
  fetch("./items.json")
      .then(response => response.json())
      .then(data => {
          // Populate category dropdown
          populateDropdown("itemCategory", data.categories);

          // Populate subcategory dropdown based on the selected category
          document.getElementById("itemCategory").addEventListener("change", function () {
              const selectedCategory = this.value;
              const subcategoryDropdown = document.getElementById("itemSubcategory");
              const selectedCategoryData = data.categories.find(category => category.name === selectedCategory);

              if (selectedCategoryData) {
                  populateDropdown("itemSubcategory", selectedCategoryData.subcategories);
              } else {
                  // Clear subcategory dropdown if the selected category is not found
                  subcategoryDropdown.innerHTML = "";
              }
          });

          // Display existing items
          displayExistingItems(data.categories);
      })
      .catch(error => console.error('Error fetching JSON:', error));

  // Handle form submission
  document.getElementById("addItemForm").addEventListener("submit", function (event) {
      event.preventDefault();

      // Retrieve form data
      const formData = new FormData(this);
      const newItem = {};

      // Convert form data to object
      formData.forEach((value, key) => {
          newItem[key] = value;
      });

      // Save the new item
      saveNewItemLocally(newItem);

      // Optional: Refresh the displayed items after adding the new item
      fetch("./items.json")
          .then(response => response.json())
          .then(data => {
              displayExistingItems(data.categories);
          })
          .catch(error => console.error('Error fetching JSON:', error));
  });
});

// Function to display existing items
function displayExistingItems(categories) {
  const existingItemsContainer = document.getElementById("existingItems");

  // Clear existing items
  existingItemsContainer.innerHTML = "";

  // Iterate through categories and subcategories
  categories.forEach(category => {
      category.subcategories.forEach(subcategory => {
          // Create a section for each subcategory
          const subcategorySection = document.createElement("section");
          subcategorySection.innerHTML = `<h2>${category.name} - ${subcategory.name}</h2>`;

          // Create a list for the products in the subcategory
          const productList = document.createElement("ul");

          // Iterate through products
          subcategory.products.forEach(product => {
              // Create list item for each product
              const listItem = document.createElement("li");
              listItem.innerHTML = `<strong>${product.name}</strong> - ${product.description}, Price: $${product.price.toFixed(2)}`;
              productList.appendChild(listItem);
          });

          // Append the product list to the subcategory section
          subcategorySection.appendChild(productList);

          // Append the subcategory section to the existing items container
          existingItemsContainer.appendChild(subcategorySection);
      });
  });
}

// Function to populate dropdown options
function populateDropdown(elementId, data) {
  const dropdown = document.getElementById(elementId);

  // Clear existing options
  dropdown.innerHTML = "";

  // Add default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Select...";
  dropdown.add(defaultOption);

  // Add options based on the provided data
  data.forEach(item => {
      const option = document.createElement("option");
      option.value = item.name;
      option.text = item.name;
      dropdown.add(option);
  });
}

// Function to save a new item to the JSON file
function saveNewItemLocally(newItem) {
  // Fetch the existing data from the JSON file
  fetch("./items.json")
      .then(response => response.json())
      .then(data => {
          // Add the new item to the existing data
          // You might want to add validation and checks here
          data.categories.forEach(category => {
              category.subcategories.forEach(subcategory => {
                  subcategory.products.push(newItem);
              });
          });

          // Save the updated data back to the JSON file
          const updatedData = JSON.stringify(data);
          return fetch("./items.json", {
              method: 'PUT', // or 'POST' depending on your server setup
              headers: {
                  'Content-Type': 'application/json',
              },
              body: updatedData,
          });
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to save the new item.');
          }
          // Optionally, you can display a success message or take other actions
          console.log('New item saved successfully!');
      })
      .catch(error => console.error('Error saving new item:', error));
}

