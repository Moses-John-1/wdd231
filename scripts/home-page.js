// Responsive Navigation
const hamButton = document.querySelector('#ham-btn');
const navigation = document.querySelector('#nav-bar');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('show');
    hamButton.classList.toggle('show');
});

// Dynamically Set Current Year
document.getElementById('year').textContent = new Date().getFullYear();

// Display Last Modified Date
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// Full Course Data Array
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
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
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

// Select DOM elements
const courseContainer = document.getElementById('course-cards');
const totalCreditsSpan = document.getElementById('total-credits');

// Display Courses Function
function displayCourses(courseList) {
    courseContainer.innerHTML = '';

    // Calculate total credits using reduce
    let totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);

    courseList.forEach(course => {
        let courseBox = document.createElement('div');
        courseBox.classList.add('course-box');

        if (course.completed) {
            courseBox.classList.add('completed');
            courseBox.innerHTML = `&#10003; ${course.subject} ${course.number}`;
        } else {
            courseBox.classList.add('incomplete');
            courseBox.innerHTML  = `&#10060; ${course.subject} ${course.number}`;
        }

        courseContainer.appendChild(courseBox);
    });

    totalCreditsSpan.textContent = totalCredits;
}

// Initial Display: All Courses
displayCourses(courses);

// Active Button Management
const buttons = document.querySelectorAll('.filter-btn');

function setActiveButton(activeId) {
    buttons.forEach(button => {
        if (button.id === activeId) {
            button.classList.add('active-btn');
        } else {
            button.classList.remove('active-btn');
        }
    });
}

// Filter Buttons Event Listeners
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

// Set "All" as Active Initially
setActiveButton('all');

// Wayfinding - Highlight Active Navigation Link
const currentPage = window.location.href;
const navLinks = document.querySelectorAll('.navigation a');

navLinks.forEach(link => {
    if (link.href === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});
