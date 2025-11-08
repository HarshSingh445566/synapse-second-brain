console.log('[Synapse] 🚀 content.js STARTED');

function initSynapseButton() {
  try {
    if (document.getElementById('synapse-floating-btn')) {
      console.log('[Synapse] 🟡 Skipping: button already exists');
      return;
    }

    // Create floating button
    const btn = document.createElement('div');
    btn.id = 'synapse-floating-btn';
    btn.textContent = '🧠';
    Object.assign(btn.style, {
      position: 'fixed',
      zIndex: '2147483647',
      bottom: '20px',
      right: '20px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#8b5cf6',
      color: 'white',
      fontSize: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
      userSelect: 'none'
    });

    // Create chatbot container (hidden by default)
    const chatContainer = document.createElement('div');
    chatContainer.id = 'synapse-chat';
    Object.assign(chatContainer.style, {
      position: 'fixed',
      bottom: '90px',
      right: '20px',
      width: '320px',
      height: '400px',
      background: 'white',
      color: '#333',
      borderRadius: '10px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
      display: 'none',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: 'sans-serif',
      zIndex: '2147483647'
    });

    // Chat header
    const header = document.createElement('div');
    header.textContent = 'Synapse Chat';
    Object.assign(header.style, {
      background: '#8b5cf6',
      color: 'white',
      padding: '10px',
      textAlign: 'center',
      fontWeight: 'bold'
    });

    // Message area
    const messages = document.createElement('div');
    messages.id = 'synapse-messages';
    Object.assign(messages.style, {
      flex: '1',
      padding: '10px',
      overflowY: 'auto',
      fontSize: '14px'
    });

    // Input area
    const inputArea = document.createElement('div');
    Object.assign(inputArea.style, {
      display: 'flex',
      borderTop: '1px solid #ddd'
    });

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type a message...';
    Object.assign(input.style, {
      flex: '1',
      border: 'none',
      padding: '10px',
      outline: 'none'
    });

    const sendBtn = document.createElement('button');
    sendBtn.textContent = 'Send';
    Object.assign(sendBtn.style, {
      background: '#8b5cf6',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      cursor: 'pointer'
    });

    inputArea.appendChild(input);
    inputArea.appendChild(sendBtn);
    chatContainer.appendChild(header);
    chatContainer.appendChild(messages);
    chatContainer.appendChild(inputArea);

    // Append elements
    document.body.appendChild(btn);
    document.body.appendChild(chatContainer);

    // Button click toggle
    btn.onclick = () => {
      chatContainer.style.display =
        chatContainer.style.display === 'none' ? 'flex' : 'none';
    };

    // Send message
    sendBtn.onclick = () => handleUserMessage(input, messages);
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') handleUserMessage(input, messages);
    });

    console.log('[Synapse] ✅ Chatbot initialized');
  } catch (e) {
    console.error('[Synapse] ❌ CRASH:', e);
  }
}

function handleUserMessage(input, messages) {
  const text = input.value.trim();
  if (!text) return;

  appendMessage(messages, text, 'user');
  input.value = '';

  // Basic simulated reply (you can replace this with API call)
  setTimeout(() => {
    appendMessage(messages, `You said: "${text}"`, 'bot');
  }, 500);
}

function appendMessage(container, text, sender) {
  const msg = document.createElement('div');
  msg.textContent = text;
  Object.assign(msg.style, {
    margin: '8px 0',
    padding: '8px 10px',
    borderRadius: '8px',
    maxWidth: '80%',
    background: sender === 'user' ? '#8b5cf6' : '#eee',
    color: sender === 'user' ? 'white' : '#333',
    alignSelf: sender === 'user' ? 'flex-end' : 'flex-start'
  });
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

// Wait for DOM
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initSynapseButton();
} else {
  document.addEventListener('DOMContentLoaded', initSynapseButton);
}
