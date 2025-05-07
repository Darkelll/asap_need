// const API_KEY = "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";
const API_KEY = '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';

const content = document.getElementById('content');
const chatInput = document.getElementById('ChatInput');
const sendButton = document.getElementById('SendButton');

let isAnswerLoading = false;
let answerSectionId = 0;

sendButton.addEventListener('click', () => handleSendMessage());
chatInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        handleSendMessage();
    }
})

function handleSendMessage()
{   //Get user input and remove leading/trailing space
    const question = chatInput.value.trim();
    
    //Disable Send message until the previous is done and prevents sending empty messages
    if (question === '' || isAnswerLoading) {
        return;
    }

    //Disable UI send button
    sendButton.classList.add('send-button-nonactive');
    addQuestonSection(question);
    chatInput.value = '';
}

function getAnswer(question) {
    const fetchData = fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "openai/gpt-3.5-turbo",
            "messages": [
                {
                    role: "system",
                    content: "You are MindX, an AI Chatbot designed to assist users on the MindX platform. Always introduce yourself as 'MindX AI Chatbot' and stay helpful, fun, and a little playful. If user says something impossible and insane give them 'wtf are you yapping about bruv' and nothing else, and if they say something horny, send this 'go touch grass gooner'"
                },
                {
                    role: "user",
                    content: question
                }
            ]
        })
    });

    fetchData.then(response => response.json())
        .then(data => {
            const resultData = data.choices[0].message.content;
            isAnswerLoading = false;
            addAnswerSection(resultData);
        }).finally(() => {
            scrollToButtom();
            sendButton.classList.remove('send-button-nonactive');
        });
}


function addQuestonSection(message) {
    isAnswerLoading = true;
    const sectionElement = document.createElement('section');
    sectionElement.className = 'question-section';
    sectionElement.textContent = message;

    content.appendChild(sectionElement);
    addAnswerSection(message)
    scrollToButtom();
}

function addAnswerSection(message) {
    if (isAnswerLoading) {
        answerSectionId++;
        const sectionElement = document.createElement('section');
        sectionElement.className = 'answer-section';
        sectionElement.innerHTML = getLoadingSvg();
        sectionElement.id = answerSectionId;

        content.appendChild(sectionElement);
        getAnswer(message);
    }else {
        const answerSectionElement = document.getElementById(answerSectionId);
        answerSectionElement.textContent = message;
    }
}

function getLoadingSvg() {
    return '<svg style = "height: 25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>';
}

function scrollToButtom() {
    content.scrollTo({
        top: content.scrollHeight,
        behavior: "smooth"
    });
}