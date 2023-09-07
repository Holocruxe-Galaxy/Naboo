const fex_button = document.getElementById('fex');
const documentation_button = document.getElementById('documentation');

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

fex_button.addEventListener('click', async () => {
  try {
    if (window.sessionStorage.getItem('token')) {
      window.location.assign(
        `${document.URL}fex?token=${window.sessionStorage.getItem('token')}`,
      );
      return;
    }
    const { value: formValue } = await Swal.fire({
      icon: 'question',
      title: 'Login',
      toast: true,
      html: ` 
      <p align="left">Username</p>
      <input id="username" >
      <p align="left">Password</p>
      <input id="password" type="password">
      `,
      preConfirm: () => {
        return {
          username: document.getElementById('username').value,
          password: document.getElementById('password').value,
        };
      },
    });
    const result = await postData('/login/fex', formValue);
    if (result.statusCode) {
      Swal.fire({
        icon: 'error',
        title: 'Algo está mal',
        toast: true,
        text: 'O el usuario o la contraseña están mal',
      });
      return;
    }
    window.sessionStorage.setItem('token', result.token);
    window.sessionStorage.setItem('id', result.userId);
    const resultado = await Swal.fire({
      icon: 'success',
      title: '¡Excelente!',
      toast: true,
      text: 'Presione Ingresar para continuar',
      confirmButtonText: 'Ingresar',
    });
    if (resultado.isConfirmed) {
      window.location.assign(`${document.URL}fex?token=${result.token}`);
      return;
    }
    return;
  } catch (error) {
    console.log('error', error);
  }
});

documentation_button.addEventListener('click', () => {
  window.location.assign(`${document.URL}docs`);
});
