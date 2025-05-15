const quizData = [
     {
       question: "Which of the following is NOT a programming language?",
       options: ["Python", "HTML", "Java", "C++"],
       answer: 1
     },
     {
       question: "What does the 'for' loop do?",
       options: ["Defines a function", "Executes code repeatedly", "Checks conditions", "Imports libraries"],
       answer: 1
     },
     {
       question: "Which data structure uses LIFO (Last In, First Out)?",
       options: ["Queue", "Stack", "Array", "Linked List"],
       answer: 1
     },
     {
       question: "What is the output of 3 + '3' in JavaScript?",
       options: ["6", "'6'", "33", "Error"],
       answer: 2
     },
     {
       question: "Which keyword is used to define a class in Python?",
       options: ["function", "def", "class", "object"],
       answer: 2
     },
     {
       question: "Which of these is a compiled language?",
       options: ["Python", "JavaScript", "Java", "PHP"],
       answer: 2
     },
     {
       question: "What is a function that calls itself called?",
       options: ["Constructor", "Recursive", "Callback", "Binder"],
       answer: 1
     },
     {
       question: "Which symbol is used for comments in C/C++?",
       options: ["#", "//", "<!-- -->", "--"],
       answer: 1
     },
     {
       question: "Which of these is NOT a valid variable name?",
       options: ["_value", "2value", "value2", "value_"],
       answer: 1
     },
     {
       question: "What does 'null' represent in most programming languages?",
       options: ["Zero", "False", "A missing or empty value", "An undefined variable"],
       answer: 2
     }
   ];
   
   let currentQuestion = 0;
   let score = 0;
   let incorrectAnswers = [];
   
   const quizContainer = document.getElementById('quiz');
   const nextBtn = document.getElementById('nextBtn');
   const resultDiv = document.getElementById('result');
   const recommendBtn = document.getElementById('recommendBtn');
   const projectsDiv = document.getElementById('projects');
   
   recommendBtn.style.display = 'none';
   
   function loadQuestion(index) {
     const q = quizData[index];
     quizContainer.innerHTML = `
       <p>${q.question}</p>
       ${q.options.map((opt, i) => `
         <label><input type="radio" name="answer" value="${i}"> ${opt}</label>
       `).join('')}
     `;
   }
   
   nextBtn.addEventListener('click', () => {
     const selected = document.querySelector('input[name="answer"]:checked');
     if (!selected) return alert("Please select an answer.");
   
     const selectedIndex = parseInt(selected.value);
     const correctIndex = quizData[currentQuestion].answer;
   
     nextBtn.disabled = true;
     nextBtn.classList.remove("correct", "wrong");
   
     if (selectedIndex === correctIndex) {
       score += 2;
       nextBtn.classList.add("correct");
     } else {
       incorrectAnswers.push({
         question: quizData[currentQuestion].question,
         selected: quizData[currentQuestion].options[selectedIndex],
         correct: quizData[currentQuestion].options[correctIndex]
       });
       nextBtn.classList.add("wrong");
     }
   
     quizContainer.classList.add("fade-out");
   
     setTimeout(() => {
       currentQuestion++;
       if (currentQuestion < quizData.length) {
         quizContainer.classList.remove("fade-out");
         nextBtn.classList.remove("correct", "wrong");
         nextBtn.disabled = false;
         loadQuestion(currentQuestion);
       } else {
         showResult();
       }
     }, 600);
   });
   
   function showResult() {
     quizContainer.innerHTML = "";
     nextBtn.style.display = 'none';
   
     let level = "Beginner";
     if (score >= 8) level = "Expert";
     else if (score >= 4) level = "Intermediate";
   
     resultDiv.innerHTML = `
       <h2>Quiz Completed!</h2>
       <p>You scored ${score}/10</p>
       <p>Level: <strong>${level}</strong></p>
     `;
   
     if (incorrectAnswers.length > 0) {
       const details = document.createElement("details");
       details.innerHTML = `
         <summary>View Incorrect Answers (${incorrectAnswers.length})</summary>
         <ul>
           ${incorrectAnswers.map(ans => `
             <li style="margin-bottom: 10px;">
               <strong>Q:</strong> ${ans.question}<br>
               <span style="color: red;"><strong>Your Answer:</strong> ${ans.selected}</span><br>
               <span style="color: green;"><strong>Correct Answer:</strong> ${ans.correct}</span>
             </li>
           `).join('')}
         </ul>
       `;
       resultDiv.appendChild(details);
     }
   
     recommendBtn.style.display = 'block';
     recommendBtn.dataset.level = level.toLowerCase();
   }
   
   const projectPool = {
     beginner: [
       { title: "Form Validation", description: "Basic form validation project.", url: "https://example.com/form-validation" },
       { title: "Counter App", description: "Simple counter app.", url: "https://example.com/counter" },
       { title: "Image Slider", description: "Simple image slider.", url: "https://example.com/slider" }
     ],
     intermediate: [
       { title: "Todo App", description: "Todo app with local storage.", url: "https://example.com/todo" },
       { title: "Weather App", description: "Fetch weather via API.", url: "https://example.com/weather" },
       { title: "Stopwatch", description: "Simple stopwatch.", url: "https://example.com/stopwatch" }
     ],
     expert: [
       { title: "Chat App", description: "Real-time chat with WebSockets.", url: "https://example.com/chat" },
       { title: "Expense Tracker", description: "Track and chart expenses.", url: "https://example.com/expenses" },
       { title: "Code Editor", description: "Browser-based code editor.", url: "https://example.com/editor" }
     ]
   };
   
   recommendBtn.addEventListener('click', () => {
     const level = recommendBtn.dataset.level;
     const recommendations = projectPool[level] || [];
     projectsDiv.innerHTML = recommendations.map(p => `
       <div class="project">
         <h3>${p.title}</h3>
         <p>${p.description}</p>
         <a href="${p.url}" target="_blank">Visit Project</a>
       </div>
     `).join('');
   });
   
   loadQuestion(currentQuestion);
   