function generateListing() {
  const title = document.getElementById('title').value;
  const address = document.getElementById('address').value;
  const price = document.getElementById('price').value;
  const bedrooms = document.getElementById('bedrooms').value;
  const bathrooms = document.getElementById('bathrooms').value;
  const description = document.getElementById('description').value;

  const output = document.getElementById('output');
  output.innerHTML = `
    <h2>${title}</h2>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Price:</strong> R${price}</p>
    <p><strong>Bedrooms:</strong> ${bedrooms}</p>
    <p><strong>Bathrooms:</strong> ${bathrooms}</p>
    <p><strong>Description:</strong> ${description}</p>
  `;
}

// === GP-ANCHOR: IMAGE_PREVIEW_START ===
document.getElementById('images').addEventListener('change', function (event) {
  const preview = document.getElementById('imagePreview');
  preview.innerHTML = '';
  Array.from(event.target.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'preview-thumb';
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});
// === GP-ANCHOR: IMAGE_PREVIEW_END ===
