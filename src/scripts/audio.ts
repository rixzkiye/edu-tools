import * as Tone from 'tone';

let audioContext: Tone.Context | null = null;
let isAudioEnabled = true;

// Sound definitions
const sounds = {
  'click': () => {
    const synth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 }
    }).toDestination();
    synth.triggerAttackRelease('C5', '32n');
  },
  'success': () => {
    const synth = new Tone.Synth({
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.3 }
    }).toDestination();
    synth.triggerAttackRelease('C6', '16n');
    setTimeout(() => synth.triggerAttackRelease('E6', '16n'), 100);
    setTimeout(() => synth.triggerAttackRelease('G6', '8n'), 200);
  },
  'error': () => {
    const synth = new Tone.Synth({
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.01, decay: 0.3, sustain: 0, release: 0.2 }
    }).toDestination();
    synth.triggerAttackRelease('F3', '8n');
  },
  'theme-change': () => {
    const synth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.05, decay: 0.2, sustain: 0, release: 0.3 }
    }).toDestination();
    synth.triggerAttackRelease('A4', '16n');
    setTimeout(() => synth.triggerAttackRelease('C5', '8n'), 150);
  },
  'spin': () => {
    const synth = new Tone.Synth({
      oscillator: { type: 'square' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.5 }
    }).toDestination();
    
    // Create a spinning sound effect
    const frequencies = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        synth.triggerAttackRelease(freq, '32n');
      }, index * 50);
    });
  },
  'confetti': () => {
    const synth = new Tone.PolySynth().toDestination();
    const notes = ['C5', 'E5', 'G5', 'C6', 'E6'];
    
    notes.forEach((note, index) => {
      setTimeout(() => {
        synth.triggerAttackRelease(note, '16n');
      }, index * 80);
    });
  },
  'notification': () => {
    const synth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.4 }
    }).toDestination();
    synth.triggerAttackRelease('G5', '8n');
    setTimeout(() => synth.triggerAttackRelease('C6', '4n'), 200);
  }
};

export async function initializeAudio() {
  try {
    // Initialize Tone.js context
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }
    audioContext = Tone.context;
    
    // Check user preference for audio
    const audioPreference = localStorage.getItem('audioEnabled');
    isAudioEnabled = audioPreference !== 'false';
    
    // Add audio toggle button functionality
    setupAudioToggle();
    
    console.log('Audio system initialized');
  } catch (error) {
    console.warn('Failed to initialize audio:', error);
    isAudioEnabled = false;
  }
}

export function playSound(soundName: keyof typeof sounds) {
  if (!isAudioEnabled || !audioContext) return;
  
  try {
    const soundFunction = sounds[soundName];
    if (soundFunction) {
      soundFunction();
    }
  } catch (error) {
    console.warn(`Failed to play sound ${soundName}:`, error);
  }
}

export function toggleAudio() {
  isAudioEnabled = !isAudioEnabled;
  localStorage.setItem('audioEnabled', isAudioEnabled.toString());
  
  // Update UI
  updateAudioToggleUI();
  
  // Play confirmation sound if enabling
  if (isAudioEnabled) {
    playSound('notification');
  }
}

function setupAudioToggle() {
  // Create audio toggle button if it doesn't exist
  let audioToggle = document.getElementById('audio-toggle');
  if (!audioToggle) {
    audioToggle = document.createElement('button');
    audioToggle.id = 'audio-toggle';
    audioToggle.className = 'fixed bottom-4 right-4 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors z-50';
    audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    document.body.appendChild(audioToggle);
  }
  
  audioToggle.addEventListener('click', toggleAudio);
  updateAudioToggleUI();
}

function updateAudioToggleUI() {
  const audioToggle = document.getElementById('audio-toggle');
  if (!audioToggle) return;
  
  const icon = audioToggle.querySelector('i');
  if (icon) {
    icon.className = isAudioEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
  }
  
  audioToggle.title = isAudioEnabled ? 'Disable Sound' : 'Enable Sound';
}

// Add click sound to all interactive elements
export function addClickSounds() {
  const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
  
  interactiveElements.forEach(element => {
    element.addEventListener('click', () => {
      playSound('click');
    });
  });
}

// Export for global use
declare global {
  interface Window {
    playSound: typeof playSound;
    toggleAudio: typeof toggleAudio;
  }
}

if (typeof window !== 'undefined') {
  window.playSound = playSound;
  window.toggleAudio = toggleAudio;
}
