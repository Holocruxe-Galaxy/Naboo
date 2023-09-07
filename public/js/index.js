const rows = document.querySelectorAll('.store_data_table tbody tr ');

rows.forEach((row) => {
  row.addEventListener('click', () => {
    const id = row.getAttribute('data-id');
    window.location.href = `/fex/stores/${id}`;
  });
});
