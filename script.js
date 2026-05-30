const homePage = document.getElementById('home-page');
const subjectsPage = document.getElementById('subjects-page');
const detailPage = document.getElementById('detail-page');
const subjectButtons = document.getElementById('subject-buttons');
const subjectsTitle = document.getElementById('subjects-title');
const subjectsSubtitle = document.getElementById('subjects-subtitle');
const detailTitle = document.getElementById('detail-title');
const detailInfo = document.getElementById('detail-info');
const topicText = document.getElementById('topic-text');
const mapTopicBtn = document.getElementById('map-topic');
const moreToggle = document.getElementById('more-toggle');
const moreList = document.getElementById('more-list');
const doubtBtn = document.getElementById('doubt-btn');
const doubtModal = document.getElementById('doubt-modal');
const doubtClose = document.getElementById('doubt-close');
const doubtSearchBtn = document.getElementById('doubt-search');
const doubtInput = document.getElementById('doubt-input');
const doubtResults = document.getElementById('doubt-results');
const enterApp = document.getElementById('enter-app');
const subjectsBack = document.getElementById('subjects-back');
const detailBack = document.getElementById('detail-back');
const startBtn = document.getElementById('start-btn');
const onboardGrade = document.getElementById('onboard-grade');
const onboardSyllabus = document.getElementById('onboard-syllabus');

let currentGrade = null;
let currentSubject = null;
let currentSyllabus = 'Generic';

const gradeMap = {
  1: [
    {subject:'Math', title:'Arithmetic'},
    {subject:'English', title:'Literacy'},
    {subject:'Science', title:'Science education'},
    {subject:'Social Studies', title:'Social studies'}
  ],
  2: [
    {subject:'Math', title:'Arithmetic'},
    {subject:'English', title:'Phonics'},
    {subject:'Science', title:'Science education'},
    {subject:'Social Studies', title:'Geography'}
  ],
  3: [
    {subject:'Math', title:'Multiplication'},
    {subject:'English', title:'Reading'},
    {subject:'Science', title:'Plants'},
    {subject:'Social Studies', title:'Local history'}
  ],
  4: [
    {subject:'Math', title:'Fractions'},
    {subject:'English', title:'Grammar'},
    {subject:'Science', title:'Electricity'},
    {subject:'Social Studies', title:'History'}
  ],
  5: [
    {subject:'Math', title:'Fractions'},
    {subject:'English', title:'Grammar'},
    {subject:'Science', title:'Human body'},
    {subject:'Social Studies', title:'Civics'}
  ],
  6: [
    {subject:'Math', title:'Decimals'},
    {subject:'English', title:'Literature'},
    {subject:'Science', title:'Biology'},
    {subject:'Social Studies', title:'Geography'}
  ],
  7: [
    {subject:'Math', title:'Algebra'},
    {subject:'English', title:'Writing'},
    {subject:'Science', title:'Chemistry'},
    {subject:'Social Studies', title:'World history'}
  ],
  8: [
    {subject:'Math', title:'Algebra'},
    {subject:'English', title:'Composition'},
    {subject:'Science', title:'Physics'},
    {subject:'Social Studies', title:'Civics'}
  ],
  9: [
    {subject:'Math', title:'Algebra'},
    {subject:'English', title:'Literature'},
    {subject:'Science', title:'Biology'},
    {subject:'Social Studies', title:'Modern history'}
  ],
  10: [
    {subject:'Math', title:'Geometry'},
    {subject:'English', title:'Literature'},
    {subject:'Science', title:'Chemistry'},
    {subject:'Social Studies', title:'Economics'}
  ],
  11: [
    {subject:'Mathematics', title:'Calculus'},
    {subject:'Physics', title:'Classical mechanics'},
    {subject:'Chemistry', title:'Organic chemistry'},
    {subject:'Biology', title:'Cell (biology)'}
  ],
  12: [
    {subject:'Mathematics', title:'Calculus'},
    {subject:'Physics', title:'Electromagnetism'},
    {subject:'Chemistry', title:'Physical chemistry'},
    {subject:'Economics', title:'Microeconomics'}
  ]
};

const fallback = {
  'Arithmetic':'Basic arithmetic: counting, adding, subtracting, simple problem solving.',
  'Literacy':'Developing reading and writing skills; phonics, vocabulary, and comprehension.',
  'Science education':'Introduce observation, curiosity and simple experiments about the natural world.',
  'Social studies':'Learning about communities, maps, and how people live together.',
  'Phonics':'Sounds and letters: connecting spoken sounds to written letters.',
  'Geography':'Understanding maps, places, landforms, and where people live.',
  'Multiplication':'Learning multiplication tables and applying them to solve problems.',
  'Reading':'Building reading fluency, comprehension and enjoyment of stories.',
  'Plants':'Basics of plant life: growth, parts of a plant, and simple ecosystems.',
  'Local history':'Stories about the local community and important events.',
  'Fractions':'Introduction to parts of a whole, comparing and using fractions.',
  'Grammar':'Parts of speech, sentence structure, and clear writing basics.',
  'Electricity':'Simple concepts: circuits, conductors, and everyday uses of electricity.',
  'Human body':'Overview of body systems and healthy habits.',
  'Civics':'How rules, governments and communities work together.',
  'Decimals':'Understanding decimal numbers and place value.',
  'Biology':'Introduction to living organisms, cells, and ecosystems.',
  'Algebra':'Foundations of algebra: expressions, equations, and problem solving.',
  'Writing':'Organizing ideas, planning and clear written expression.',
  'Chemistry':'Basic matter properties, simple reactions and laboratory safety.',
  'Physics':'Motion, forces and energy basics with hands-on examples.',
  'Modern history':'Key events from recent centuries and how they shaped the world.',
  'Geometry':'Shapes, angles, area, and logical problem solving.',
  'Economics':'Basic ideas about goods, services, money, and markets.',
  'Calculus':'Foundations of limits, functions, and simple derivatives.',
  'Classical mechanics':'Motion, forces, and how objects move in the world.',
  'Organic chemistry':'Basics of carbon-based compounds and laboratory safety.',
  'Cell (biology)':'Structure and function of cells, the building blocks of life.',
  'Electromagnetism':'Electricity and magnetism, plus how energy moves through fields.',
  'Physical chemistry':'Matter, energy, and chemical systems from a scientific view.',
  'Microeconomics':'Introduction to money, markets, supply and demand.'
};

function showPage(pageId) {
  [homePage, subjectsPage, detailPage].forEach(page => {
    page.classList.remove('active');
    page.classList.add('hidden');
  });
  const page = document.getElementById(pageId);
  if (page) {
    page.classList.remove('hidden');
    page.classList.add('active');
  }
}

function populateOnboardGrades() {
  onboardGrade.innerHTML = '<option value="" selected disabled>Select grade</option>';
  for (let i = 1; i <= 12; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `Grade ${i}`;
    onboardGrade.appendChild(option);
  }
}

function populateSubjects() {
  subjectButtons.innerHTML = '';
  if (!currentGrade || !gradeMap[currentGrade]) {
    subjectsTitle.textContent = 'No content available';
    subjectsSubtitle.textContent = 'Choose another grade to continue.';
    subjectButtons.classList.add('hidden');
    return;
  }

  const subjects = gradeMap[currentGrade];
  subjectsTitle.textContent = `Subjects for Grade ${currentGrade}`;
  subjectsSubtitle.textContent = `Syllabus: ${currentSyllabus} • Tap a subject to open the full guide.`;
  subjectButtons.classList.remove('hidden');

  subjects.forEach(item => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'subject-button';
    button.innerHTML = `<strong>${escapeHtml(item.subject)}</strong><span>${escapeHtml(item.title)}</span>`;
    button.addEventListener('click', async () => {
      await openDetail(item.subject, item.title);
    });
    subjectButtons.appendChild(button);
  });
}

function populateMoreTopics() {
  moreList.innerHTML = '';
  const topics = new Set();
  Object.values(gradeMap).forEach(arr => arr.forEach(s => topics.add(s.title)));
  Array.from(topics).slice(0, 12).forEach(title => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = title;
    button.addEventListener('click', async () => {
      await openDetail(title, title);
    });
    moreList.appendChild(button);
  });
}

moreToggle.addEventListener('click', () => {
  moreList.classList.toggle('hidden');
});

async function fetchSummary(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    return data.extract || fallback[title] || `Quick guide for ${title}.`;
  } catch (e) {
    return fallback[title] || `Quick guide for ${title}.`;
  }
}

async function openDetail(subject, title) {
  currentSubject = subject;
  detailTitle.textContent = subject;
  detailInfo.textContent = 'Loading subject details…';
  const summary = await fetchSummary(title);
  detailInfo.textContent = summary;
  topicText.value = '';
  showPage('detail-page');
}

async function showTopicDetail(topic) {
  if (!topic) return;
  detailInfo.textContent = 'Loading topic details…';
  const summary = await fetchSummary(topic);
  detailInfo.textContent = summary;
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function searchWikipedia(query) {
  return fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + encodeURIComponent(query) + '&format=json&origin=*')
    .then(res => res.ok ? res.json() : null)
    .then(data => data?.query?.search || [])
    .catch(() => []);
}

function bindEvents() {
  if (enterApp) {
    enterApp.addEventListener('click', () => {
      showPage('subjects-page');
    });
  }

  if (subjectsBack) {
    subjectsBack.addEventListener('click', () => {
      showPage('home-page');
    });
  }

  if (detailBack) {
    detailBack.addEventListener('click', () => {
      showPage('subjects-page');
    });
  }

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      const grade = parseInt(onboardGrade.value, 10);
      const syllabus = onboardSyllabus.value || 'Generic';
      if (!grade) return alert('Please choose a grade.');
      currentGrade = grade;
      currentSyllabus = syllabus.charAt(0).toUpperCase() + syllabus.slice(1);
      populateSubjects();
    });
  }

  if (mapTopicBtn) {
    mapTopicBtn.addEventListener('click', () => {
      const topic = topicText.value.trim();
      if (!topic) return;
      showTopicDetail(topic);
    });
  }

  if (doubtBtn) {
    doubtBtn.addEventListener('click', () => {
      doubtModal.classList.remove('hidden');
    });
  }

  if (doubtClose) {
    doubtClose.addEventListener('click', () => {
      doubtModal.classList.add('hidden');
    });
  }

  if (doubtSearchBtn) {
    doubtSearchBtn.addEventListener('click', async () => {
      const query = doubtInput.value.trim();
      if (!query) return;
      doubtResults.textContent = 'Searching...';
      const results = await searchWikipedia(query);
      doubtResults.innerHTML = '';
      if (results.length === 0) {
        doubtResults.textContent = 'No results found. Try another keyword.';
        return;
      }
      results.slice(0, 5).forEach(item => {
        const card = document.createElement('div');
        card.className = 'doubt-item';
        card.innerHTML = `<strong>${item.title}</strong><div>${item.snippet.replace(/<span class="searchmatch">/g, '').replace(/<\/span>/g, '')}</div>`;
        card.addEventListener('click', async () => {
          const summary = await fetchSummary(item.title);
          detailTitle.textContent = item.title;
          detailInfo.textContent = summary;
          doubtModal.classList.add('hidden');
          showPage('detail-page');
        });
        doubtResults.appendChild(card);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  populateOnboardGrades();
  populateMoreTopics();
  bindEvents();
  showPage('home-page');
});
