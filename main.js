// Load JSON data
fetch('data/content.json')
  .then(res => res.json())
  .then(data => {
    document.title = data.site.title;
    document.getElementById('hero-title').innerText = data.sections[0].heading;
    document.getElementById('hero-subtitle').innerText = data.sections[0].subheading;
  })
  .catch(err => console.error('JSON load failed', err));

// Load CSV data and render as cards
fetch('data/items.csv')
  .then(res => res.text())
  .then(csvText => {
    const rows = csvText.trim().split('\n');
    const headers = rows[0].split(',');
    const tableData = rows.slice(1).map(row => row.split(','));

    let html = '<div style="display:flex;flex-wrap:wrap;gap:20px;">';

    tableData.forEach(row => {
      html += `
        <div style="
          background:#fff;
          border:1px solid #ccc;
          padding:15px;
          border-radius:8px;
          width:200px;
          box-shadow:0 2px 5px rgba(0,0,0,0.1);
        ">
          <h3>${row[1]}</h3>
          <p>${row[2]}</p>
        </div>
      `;
    });

    html += '</div>';
    document.getElementById('items-container').innerHTML = html;
  })
  .catch(err => console.error('CSV load failed', err));
