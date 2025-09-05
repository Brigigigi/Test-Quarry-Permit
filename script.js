// // script.js
// let checklistInitialized = false;

// function showRegister() {
//   document.getElementById('registerPage').classList.remove('hidden');
//   document.getElementById('loginPage').classList.add('hidden');
//   document.getElementById('menuPage').classList.add('hidden');
//   document.getElementById('formPageUser').classList.add('hidden');
//   document.getElementById('formPageAdmin').classList.add('hidden');
//   document.getElementById('formApplicationUser').classList.add('hidden');
// }

// function showLogin() {
//   document.getElementById('loginPage').classList.remove('hidden');
//   document.getElementById('registerPage').classList.add('hidden');
//   document.getElementById('menuPage').classList.add('hidden');
//   document.getElementById('formPageUser').classList.add('hidden');
//   document.getElementById('formPageAdmin').classList.add('hidden');
//   document.getElementById('formApplicationUser').classList.add('hidden');
// }

// function showMenu() {
//   document.getElementById('menuPage').classList.remove('hidden');
//   document.getElementById('loginPage').classList.add('hidden');
//   document.getElementById('registerPage').classList.add('hidden');
//   document.getElementById('formPageUser').classList.add('hidden');
//   document.getElementById('formPageAdmin').classList.add('hidden');
//   document.getElementById('formApplicationUser').classList.add('hidden');
// }

// function showForm() {
//   const role = sessionStorage.getItem('currentRole');

//   document.getElementById('formPageUser').classList.add('hidden');
//   document.getElementById('formPageAdmin').classList.add('hidden');
//   document.getElementById('formApplicationUser').classList.add('hidden');
//   document.getElementById('menuPage').classList.add('hidden');

//   if (role === 'admin') {
//     document.getElementById('formPageAdmin').classList.remove('hidden');
//     if (!checklistInitialized) {
//       initChecklist();
//       checklistInitialized = true;
//     }
//     loadChecklist();
//     updateProgress();
//   } else {
//     document.getElementById('formPageUser').classList.remove('hidden');
//   }
// }

// function showApplicationForm() {
//   const role = sessionStorage.getItem('currentRole');

//   document.getElementById('formPageUser').classList.add('hidden');
//   document.getElementById('formPageAdmin').classList.add('hidden');
//   document.getElementById('menuPage').classList.add('hidden');

//   if (role === 'user') {
//     document.getElementById('formApplicationUser').classList.remove('hidden');
//     loadApplication();
//   } else {
//     alert('Only applicants can access the application form.');
//     showMenu();
//   }
// }

// function register() {
//   const user = document.getElementById('regUser').value.trim();
//   const pass = document.getElementById('regPass').value.trim();
//   const role = document.getElementById('regRole').value;

//   if (user && pass) {
//     localStorage.setItem('username', user);
//     localStorage.setItem('password', pass);
//     localStorage.setItem('role', role);
//     alert('Registered successfully! Please login.');
//     showLogin();
//   } else {
//     alert('Please fill out all fields.');
//   }
// }

// function login() {
//   const user = document.getElementById('loginUser').value.trim();
//   const pass = document.getElementById('loginPass').value.trim();
//   const savedUser = localStorage.getItem('username');
//   const savedPass = localStorage.getItem('password');
//   const savedRole = localStorage.getItem('role');

//   if (user === savedUser && pass === savedPass) {
//     alert('Login successful!');
//     document.getElementById('loginPage').classList.add('hidden');
//     document.getElementById('menuPage').classList.remove('hidden');
//     sessionStorage.setItem('currentRole', savedRole);

//     // Hide Application Form button for Admins
//     if (savedRole === 'admin') {
//       document.getElementById('appFormBtn').style.display = 'none';
//     } else {
//       document.getElementById('appFormBtn').style.display = 'inline-block';
//     }
//   } else {
//     alert('Invalid username or password.');
//   }
// }

// function logout() {
//   showLogin();
// }

// // Checklist (Admin)
// function initChecklist() {
//   const checkboxes = document.querySelectorAll('#checklistForm input[type="checkbox"]');
//   checkboxes.forEach(cb => {
//     cb.addEventListener('change', () => {
//       saveChecklist(false);
//       updateProgress();
//     });
//   });
// }

// function saveChecklist(showAlert = true) {
//   const checkboxes = document.querySelectorAll('#checklistForm input[type="checkbox"]');
//   const progress = Array.from(checkboxes).map(cb => cb.checked);
//   localStorage.setItem('checklistProgress', JSON.stringify(progress));
//   if (showAlert) alert('Checklist progress saved!');
// }

// function loadChecklist() {
//   const checkboxes = document.querySelectorAll('#checklistForm input[type="checkbox"]');
//   const saved = JSON.parse(localStorage.getItem('checklistProgress') || 'null');
//   if (Array.isArray(saved)) {
//     checkboxes.forEach((cb, i) => { cb.checked = !!saved[i]; });
//   }
// }

// function updateProgress() {
//   const checkboxes = document.querySelectorAll('#checklistForm input[type="checkbox"]');
//   const total = checkboxes.length;
//   const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
//   const percent = total ? Math.round((checked / total) * 100) : 0;
//   const bar = document.getElementById('progressBar');
//   const text = document.getElementById('progressText');
//   bar.style.width = percent + '%';
//   bar.setAttribute('aria-valuenow', String(percent));
//   text.textContent = percent + '% complete';
// }

// // Application Form (Applicant)
// function saveApplication() {
//   const data = {
//     applicantName: document.getElementById('applicantName').value,
//     applicantAddress: document.getElementById('applicantAddress').value,
//     appliedArea: document.getElementById('appliedArea').value,
//     resources: document.getElementById('resources').value,
//     quantity: document.getElementById('quantity').value,
//     provinceCity: document.getElementById('provinceCity').value,
//     north: document.getElementById('north').value,
//     east: document.getElementById('east').value,
//     south: document.getElementById('south').value,
//     west: document.getElementById('west').value,
//     approxArea: document.getElementById('approxArea').value,
//     fee: document.getElementById('fee').value,
//     receiptNo: document.getElementById('receiptNo').value,
//     datePaid: document.getElementById('datePaid').value,
//     tin: document.getElementById('tin').value,
//   };

//   localStorage.setItem('applicationData', JSON.stringify(data));
//   alert('Application form saved as draft!');
// }

// function loadApplication() {
//   const saved = JSON.parse(localStorage.getItem('applicationData'));
//   if (saved) {
//     document.getElementById('applicantName').value = saved.applicantName || '';
//     document.getElementById('applicantAddress').value = saved.applicantAddress || '';
//     document.getElementById('appliedArea').value = saved.appliedArea || '';
//     document.getElementById('resources').value = saved.resources || '';
//     document.getElementById('quantity').value = saved.quantity || '';
//     document.getElementById('provinceCity').value = saved.provinceCity || '';
//     document.getElementById('north').value = saved.north || '';
//     document.getElementById('east').value = saved.east || '';
//     document.getElementById('south').value = saved.south || '';
//     document.getElementById('west').value = saved.west || '';
//     document.getElementById('approxArea').value = saved.approxArea || '';
//     document.getElementById('fee').value = saved.fee || '';
//     document.getElementById('receiptNo').value = saved.receiptNo || '';
//     document.getElementById('datePaid').value = saved.datePaid || '';
//     document.getElementById('tin').value = saved.tin || '';
//   }
// }

// // Generate formatted HTML for PDF
// function getApplicationContent(saved) {
//   return `
//     <h2>Quarry Permit Application</h2>
//     <p><strong>Applicant:</strong> ${saved.applicantName}</p>
//     <p><strong>Address:</strong><br>${saved.applicantAddress}</p>
//     <p><strong>Size of Applied Area (hectares):</strong> ${saved.appliedArea}</p>
//     <p><strong>Quarry Resources:</strong> ${saved.resources}</p>
//     <p><strong>Quantity:</strong> ${saved.quantity}</p>
//     <p><strong>Province/City:</strong> ${saved.provinceCity}</p>
//     <p><strong>Boundaries:</strong><br>
//        North: ${saved.north}<br>
//        East: ${saved.east}<br>
//        South: ${saved.south}<br>
//        West: ${saved.west}</p>
//     <p><strong>Approximate Area (hectares):</strong> ${saved.approxArea}</p>
//     <p><strong>Application Fee:</strong> ${saved.fee}</p>
//     <p><strong>Official Receipt No.:</strong> ${saved.receiptNo}</p>
//     <p><strong>Date Paid:</strong> ${saved.datePaid}</p>
//     <p><strong>TIN:</strong> ${saved.tin}</p>

//     <div class="signature">
//       <div class="signature-line">Applicant’s Signature</div>
//     </div>
//   `;
// }

// function printApplication() {
//   const saved = JSON.parse(localStorage.getItem('applicationData'));
//   if (!saved) {
//     alert("Please fill out and save the form first.");
//     return;
//   }

//   const { jsPDF } = window.jspdf;
//   const doc = new jsPDF();

//   doc.setFont("times", "normal");
//   doc.setFontSize(14);

//   // Title
//   doc.text("Quarry Permit Application", 105, 20, { align: "center" });

//   let y = 40;
//   doc.text(`Applicant: ${saved.applicantName}`, 20, y); y+=10;
//   doc.text(`Address: ${saved.applicantAddress}`, 20, y); y+=20;
//   doc.text(`Size of Applied Area (hectares): ${saved.appliedArea}`, 20, y); y+=10;
//   doc.text(`Quarry Resources: ${saved.resources}`, 20, y); y+=10;
//   doc.text(`Quantity: ${saved.quantity}`, 20, y); y+=10;
//   doc.text(`Province/City: ${saved.provinceCity}`, 20, y); y+=10;
//   doc.text(`Boundaries:`, 20, y); y+=10;
//   doc.text(`   North: ${saved.north}`, 30, y); y+=10;
//   doc.text(`   East: ${saved.east}`, 30, y); y+=10;
//   doc.text(`   South: ${saved.south}`, 30, y); y+=10;
//   doc.text(`   West: ${saved.west}`, 30, y); y+=10;
//   doc.text(`Approximate Area (hectares): ${saved.approxArea}`, 20, y); y+=10;
//   doc.text(`Application Fee: ${saved.fee}`, 20, y); y+=10;
//   doc.text(`Official Receipt No.: ${saved.receiptNo}`, 20, y); y+=10;
//   doc.text(`Date Paid: ${saved.datePaid}`, 20, y); y+=10;
//   doc.text(`TIN: ${saved.tin}`, 20, y); y+=30;

//   // Signature section
//   doc.text("_________________________", 150, y);
//   doc.text("Applicant's Signature", 150, y+10);

//   doc.save("quarry-application.pdf");
// }

// function previewApplication() {
//   const saved = JSON.parse(localStorage.getItem('applicationData'));
//   if (!saved) {
//     alert("Please fill out and save the form first.");
//     return;
//   }

//   const { jsPDF } = window.jspdf;
//   const doc = new jsPDF();

//   doc.setFont("times", "normal");
//   doc.setFontSize(14);

//   // Title
//   doc.text("Quarry Permit Application", 105, 20, { align: "center" });

//   let y = 40;
//   doc.text(`Applicant: ${saved.applicantName}`, 20, y); y+=10;
//   doc.text(`Address: ${saved.applicantAddress}`, 20, y); y+=20;
//   doc.text(`Size of Applied Area (hectares): ${saved.appliedArea}`, 20, y); y+=10;
//   doc.text(`Quarry Resources: ${saved.resources}`, 20, y); y+=10;
//   doc.text(`Quantity: ${saved.quantity}`, 20, y); y+=10;
//   doc.text(`Province/City: ${saved.provinceCity}`, 20, y); y+=10;
//   doc.text(`Boundaries:`, 20, y); y+=10;
//   doc.text(`   North: ${saved.north}`, 30, y); y+=10;
//   doc.text(`   East: ${saved.east}`, 30, y); y+=10;
//   doc.text(`   South: ${saved.south}`, 30, y); y+=10;
//   doc.text(`   West: ${saved.west}`, 30, y); y+=10;
//   doc.text(`Approximate Area (hectares): ${saved.approxArea}`, 20, y); y+=10;
//   doc.text(`Application Fee: ${saved.fee}`, 20, y); y+=10;
//   doc.text(`Official Receipt No.: ${saved.receiptNo}`, 20, y); y+=10;
//   doc.text(`Date Paid: ${saved.datePaid}`, 20, y); y+=10;
//   doc.text(`TIN: ${saved.tin}`, 20, y); y+=30;

//   // Signature section
//   doc.text("_________________________", 150, y);
//   doc.text("Applicant's Signature", 150, y+10);

//   // Convert to Blob and open in new tab
//   const pdfBlob = doc.output('blob');
//   const pdfUrl = URL.createObjectURL(pdfBlob);
//   window.open(pdfUrl, '_blank');
// }


// ----------------------- PAGE TOGGLING -----------------------
let checklistInitialized = false;

function togglePages(showId) {
  const pages = ['registerPage','loginPage','menuPage','formPageUser','formPageAdmin','formApplicationUser'];
  pages.forEach(id => document.getElementById(id).classList.toggle('hidden', id !== showId));
}

function showRegister() { togglePages('registerPage'); }
function showLogin() { togglePages('loginPage'); }
function showMenu() { togglePages('menuPage'); }

function showForm() {
  const role = sessionStorage.getItem('currentRole');
  togglePages(role==='admin' ? 'formPageAdmin' : 'formPageUser');
  if(role==='admin' && !checklistInitialized){
    initChecklist();
    checklistInitialized=true;
    loadChecklist();
    updateProgress();
  }
  if(role==='user') loadApplication();
}

function showApplicationForm() {
  if(sessionStorage.getItem('currentRole')==='user'){
    togglePages('formApplicationUser');
    loadApplication();
  } else { alert('Only applicants can access this form.'); showMenu(); }
}

// ----------------------- HELPER FUNCTIONS -----------------------
function getCsrfToken() {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
}

async function safeFetch(url, options={}) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'X-CSRF-TOKEN': getCsrfToken(),
        ...(options.headers || {})
      }
    });

    const text = await res.text(); // read as text first
    let data;
    try {
      data = text ? JSON.parse(text) : {}; // parse JSON if possible
    } catch(e) {
      console.error('Response is not valid JSON:', text);
      throw new Error('Server returned invalid JSON');
    }

    if (!res.ok) throw new Error(data.message || 'Server error');
    return data;
  } catch(err) {
    alert(err.message);
    throw err;
  }
}

// ----------------------- AUTH -----------------------
async function register() {
  const username = document.getElementById('regUser').value.trim();
  const password = document.getElementById('regPass').value.trim();
  const role = document.getElementById('regRole').value;
  if(!username || !password){ alert('Please fill out all fields'); return; }

  await safeFetch('/register', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({username,password,role})
  });
  alert('Registered successfully! Please login.');
  showLogin();
}

async function login() {
  const username = document.getElementById('loginUser').value.trim();
  const password = document.getElementById('loginPass').value.trim();
  if(!username || !password){ alert('Please fill out all fields'); return; }

  const data = await safeFetch('/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({username,password})
  });

  sessionStorage.setItem('currentRole', data.role);
  document.getElementById('appFormBtn').style.display = data.role==='admin'?'none':'inline-block';
  showMenu();
}

async function logout() {
  await safeFetch('/logout',{method:'POST'});
  sessionStorage.removeItem('currentRole');
  showLogin();
}

// ----------------------- ADMIN CHECKLIST -----------------------
function initChecklist() {
  document.querySelectorAll('#checklistForm input[type="checkbox"]')
    .forEach(cb => cb.addEventListener('change', () => {
      saveChecklist(false);
      updateProgress();
    }));
}

async function saveChecklist(showAlert=true) {
  const items = Array.from(document.querySelectorAll('#checklistForm input[type="checkbox"]'))
                    .map(cb => cb.checked);
  await safeFetch('/checklist/save',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({items})
  });
  if(showAlert) alert('Checklist progress saved!');
}

async function loadChecklist() {
  const data = await safeFetch('/checklist/load');
  document.querySelectorAll('#checklistForm input[type="checkbox"]')
          .forEach((cb,i) => { cb.checked = !!data.items[i]; });
  updateProgress();
}

function updateProgress() {
  const boxes = document.querySelectorAll('#checklistForm input[type="checkbox"]');
  const checked = Array.from(boxes).filter(cb=>cb.checked).length;
  const percent = boxes.length ? Math.round((checked/boxes.length)*100) : 0;
  const bar = document.getElementById('progressBar');
  const text = document.getElementById('progressText');
  bar.style.width = percent+'%';
  text.textContent = percent+'% complete';
}

// ----------------------- APPLICANT APPLICATION FORM -----------------------
async function saveApplication() {
  const fields = ['applicantName','applicantAddress','appliedArea','resources','quantity','provinceCity','north','east','south','west','approxArea','fee','receiptNo','datePaid','tin'];
  const data = {};
  fields.forEach(f => data[f] = document.getElementById(f).value);

  await safeFetch('/application/save',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data)
  });
  alert('Application form saved as draft!');
}

async function loadApplication() {
  const result = await safeFetch('/application/load');
  if(result.form){
    Object.entries(result.form).forEach(([k,v])=>{
      const el = document.getElementById(k);
      if(el) el.value = v;
    });
  }
}

// ----------------------- PDF GENERATION -----------------------
function printApplication() {
  const saved = getApplicationData();
  if(!saved) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFont("times","normal"); doc.setFontSize(14);

  doc.text("Quarry Permit Application", 105, 20, {align:"center"});

  let y=40;
  for(const [key,value] of Object.entries(saved)){
    if(key==='applicantAddress'){
      doc.text(`Address: ${value}`, 20, y); y+=20;
    } else {
      const label = key.replace(/([A-Z])/g,' $1').replace(/^./, str=>str.toUpperCase());
      doc.text(`${label}: ${value}`, 20, y); y+=10;
    }
  }

  doc.text("_________________________", 150, y);
  doc.text("Applicant's Signature", 150, y+10);
  doc.save("quarry-application.pdf");
}

function previewApplication() {
  const saved = getApplicationData();
  if(!saved) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFont("times","normal"); doc.setFontSize(14);

  doc.text("Quarry Permit Application", 105, 20, {align:"center"});
  let y=40;
  for(const [key,value] of Object.entries(saved)){
    if(key==='applicantAddress'){
      doc.text(`Address: ${value}`, 20, y); y+=20;
    } else {
      const label = key.replace(/([A-Z])/g,' $1').replace(/^./, str=>str.toUpperCase());
      doc.text(`${label}: ${value}`, 20, y); y+=10;
    }
  }

  doc.text("_________________________", 150, y);
  doc.text("Applicant's Signature", 150, y+10);

  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
}

function getApplicationData() {
  const fields = ['applicantName','applicantAddress','appliedArea','resources','quantity','provinceCity','north','east','south','west','approxArea','fee','receiptNo','datePaid','tin'];
  const data = {};
  let empty = true;
  fields.forEach(f => {
    const el = document.getElementById(f);
    if(el && el.value) { data[f] = el.value; empty=false; }
  });
  if(empty){ alert("Please fill out and save the form first."); return null; }
  return data;
}
