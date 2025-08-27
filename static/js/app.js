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

function updateBondCalc() {
  const price = parseFloat(document.getElementById('price').value.replace(/[^0-9.]/g, ''));
  const deposit = parseFloat(document.getElementById('deposit').value) / 100;
  const rate = parseFloat(document.getElementById('interest').value) / 100 / 12;
  const term = parseFloat(document.getElementById('term').value) * 12;
  if (isNaN(price) || isNaN(rate) || isNaN(term)) return;

  const loan = price * (1 - deposit);
  const monthly = (loan * rate) / (1 - Math.pow(1 + rate, -term));
  const output = document.getElementById('bondOutput');
  output.innerText = `Estimated Monthly Repayment: R${monthly.toFixed(2)}`;
}

async function polishDescription() {
  const description = document.getElementById('description').value;
  const title = document.getElementById('title').value;
  const address = document.getElementById('address').value;
  const response = await fetch('/.netlify/functions/enhanceDescription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, address, description })
  });
  const data = await response.json();
  document.getElementById('description').value = data.result || '[Error enhancing description]';
}
