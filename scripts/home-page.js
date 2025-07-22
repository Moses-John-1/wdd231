// ========== RESPONSIVE NAVIGATION ==========
const hamButton = document.querySelector('#ham-btn');
const navigation = document.querySelector('#nav-bar');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('show');
    hamButton.classList.toggle('show');
});

// ========== YEAR AND LAST MODIFIED ==========
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// ========== COURSE DATA ==========
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// ========== SELECT DOM ELEMENTS ==========
const courseContainer = document.getElementById('course-cards');
const totalCreditsSpan = document.getElementById('total-credits');
const courseDetails = document.getElementById('courseDetails');

// ========== DISPLAY COURSE DETAILS ==========
function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="closeModal" class="close-btn">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    courseDetails.showModal();

    document.getElementById('closeModal').addEventListener('click', () => {
        courseDetails.close();
    });
}

// Close modal when clicking outside it
courseDetails.addEventListener('click', (event) => {
    const rect = courseDetails.getBoundingClientRect();
    if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
    ) {
        courseDetails.close();
    }
});

// ========== DISPLAY COURSES ==========
function displayCourses(courseList) {
    courseContainer.innerHTML = '';

    let totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);

    courseList.forEach(course => {
        let courseBox = document.createElement('div');
        courseBox.classList.add('course-box');

        if (course.completed) {
            courseBox.classList.add('completed');
        } else {
            courseBox.classList.add('incomplete');
        }

        courseBox.innerHTML = `
            ${course.completed ? '&#10003;' : '&#10060;'} ${course.subject} ${course.number}
        `;

        // Show details on click
        courseBox.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        courseContainer.appendChild(courseBox);
    });

    totalCreditsSpan.textContent = totalCredits;
}

// ========== FILTER BUTTONS ==========
displayCourses(courses);

const buttons = document.querySelectorAll('.filter-buttons button');

function setActiveButton(activeId) {
    buttons.forEach(button => {
        if (button.id === activeId) {
            button.classList.add('active-btn');
        } else {
            button.classList.remove('active-btn');
        }
    });
}

document.getElementById('all').addEventListener('click', () => {
    displayCourses(courses);
    setActiveButton('all');
});

document.getElementById('cse').addEventListener('click', () => {
    const filtered = courses.filter(course => course.subject === 'CSE');
    displayCourses(filtered);
    setActiveButton('cse');
});

document.getElementById('wdd').addEventListener('click', () => {
    const filtered = courses.filter(course => course.subject === 'WDD');
    displayCourses(filtered);
    setActiveButton('wdd');
});

setActiveButton('all');

// ========== WAYFINDING NAVIGATION ==========
const currentPage = window.location.href;
const navLinks = document.querySelectorAll('.navigation a');

navLinks.forEach(link => {
    if (link.href === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});
