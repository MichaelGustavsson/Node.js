const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  console.log(formData.get('file'));
  /* file=no-car.png&xxxdescription=nisse */

  try {
    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData, //file=no-car.png
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      console.error('Ooops, något hände😳', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
