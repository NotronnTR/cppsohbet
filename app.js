// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzmMzxSG0kmVcGumnSqysdN4SY2yjc0TQ",
  authDomain: "cppsohbet.firebaseapp.com",
  projectId: "cppsohbet",
  storageBucket: "cppsohbet.appspot.com",
  messagingSenderId: "198725254190",
  appId: "1:198725254190:web:775600bec31372390733bf",
  measurementId: "G-105DJBG7VK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Elements
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to send a message
function sendMessage() {
    const message = messageInput.value;
    if (message) {
        const messageRef = ref(db, 'messages');
        push(messageRef, {
            message: message,
            timestamp: new Date().toISOString(),
            user: 'self'
        });
        messageInput.value = '';
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Receive message
const messageRef = ref(db, 'messages');
onChildAdded(messageRef, (snapshot) => {
    const messageData = snapshot.val();
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', messageData.user === 'self' ? 'self' : 'other');
    messageElement.textContent = `${messageData.timestamp}: ${messageData.message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});
