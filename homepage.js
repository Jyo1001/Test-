document.addEventListener('DOMContentLoaded', function () {
  // Fetch the JSON data
  fetch("./items.json")
      .then(response => response.json())
      .then(data => {
          // Process the data and generate HTML elements for main categories buttons
          renderMainCategoryButtons(data.categories);
      })
      .catch(error => console.error('Error fetching JSON:', error));
});
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM Loaded');
  // Fetch the JSON data
  fetch("./items.json")
      .then(response => response.json())
      .then(data => {
          console.log('Fetched data:', data);
          // Process the data and generate HTML elements for main categories buttons
          renderMainCategoryButtons(data.categories);
      })
      .catch(error => console.error('Error fetching JSON:', error));
});


function renderMainCategoryButtons(categories) {
    const mainCategoryButtons = document.getElementById('mainCategoryButtons');

    if (!mainCategoryButtons) {
        console.error('Main category buttons container not found.');
        return;
    }

    // Get the subCategoryList element
    const subCategoryList = document.getElementById('subCategoryList');
    
    // Iterate through main categories
    categories.forEach(category => {
        const categoryButton = document.createElement('button');
        categoryButton.textContent = category.name;

        // Add click event listener to handle button click
        categoryButton.addEventListener('click', function () {
            // Display subcategories or products for the selected main category
            renderSubcategoriesOrProducts(subCategoryList, category.subcategories);
        });

        // Append the category button to the main category buttons
        mainCategoryButtons.appendChild(categoryButton);
    });
}

function toggleActiveClass(container, selectedButton) {
  // Remove 'active' class from the previously active button
  if (activeButton) {
    activeButton.classList.remove('active');
  }

  // Add 'active' class to the selected button
  selectedButton.classList.add('active');

  // Update the active button reference
  activeButton = selectedButton;
}






function renderSubcategoriesOrProducts(subCategoryList, subcategories) {
    // Ensure subCategoryList is valid
    if (!subCategoryList) {
        console.error('Subcategory list container not found.');
        return;
    }

    // Clear the existing content
    subCategoryList.innerHTML = '';

    // Iterate through subcategories
    subcategories.forEach(subcategory => {
        const subcategoryItem = document.createElement('div');
        subcategoryItem.innerHTML = `
            <h3>${subcategory.name}</h3>
            <!-- Add more details if needed -->

            <!-- Example: Display products for the subcategory -->
            <ul>
                ${renderProducts(subcategory.products)}
            </ul>
        `;

        // Append the subcategory item to the subcategory list
        subCategoryList.appendChild(subcategoryItem);
    });
}


function renderProducts(products) {
  // Render product items (if any)
  return products.map(product => `
      <li>
          <h4>${product.name}</h4>
          <p>${product.description}</p>
          <img src="${product.image}" alt="${product.name}">
          <p>Price: $${product.price.toFixed(2)}</p>
      </li>
  `).join('');
}
