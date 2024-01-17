function handleUpload() {
    var file = document.getElementById('uploadFile').files[0];
    var reader = new FileReader();
  
    reader.onload = function (e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: 'array' });
      var sheetName = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[sheetName];
      var drivers = XLSX.utils.sheet_to_json(worksheet, { header: 'A', defval: '' });
  
      displayDrivers(drivers);
    };
  
    reader.readAsArrayBuffer(file);
  }
  
  function displayDrivers(drivers) {
    var driversTable = document.getElementById('driversData');
  
    drivers.forEach(function (driver) {
      var row = document.createElement('tr');
      var nameCell = document.createElement('td');
      var licenseCell = document.createElement('td');
      var vehicleCell = document.createElement('td');
  
      nameCell.textContent = driver.Name || '';
      licenseCell.textContent = driver['License Number'] || '';
      vehicleCell.textContent = driver['Vehicle Type'] || '';
  
      row.appendChild(nameCell);
      row.appendChild(licenseCell);
      row.appendChild(vehicleCell);
      driversTable.appendChild(row);
    });
  }