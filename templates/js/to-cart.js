function addItemToCart(productName, price) {
    const item = document.createElement('div');
    item.classList.add('item');

    const img = document.createElement('img');
    img.src = `product_images/${productName.toLowerCase()}.jpg`;
    img.alt = productName;

    const name = document.createElement('h2');
    name.textContent = productName;

    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: $${price.toFixed(2)}`;

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeItem(item, price));

    item.appendChild(img);
    item.appendChild(name);
    item.appendChild(priceElement);
    item.appendChild(removeButton);

    cart.appendChild(item);

    total += price;
    updateTotal();
}