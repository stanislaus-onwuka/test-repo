// Typewriter Effect
class TypeWriter {
    constructor(txtElement, words, wait = 10000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 20);
      this.type();
    }
  
    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];
  
      this.txt = fullTxt.substring(0, this.txt.length + 1);
      // Insert txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      // Initial Type Speed
      let typeSpeed = 70;

      if(this.txt === fullTxt){
          document.querySelector('.txt').style.border = 'none';
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  
  // Init On DOM Load
  document.addEventListener('DOMContentLoaded', init);
  
  // Init App
  function init() {
    const txtElement = document.querySelector('.type-txt');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}


// Scroll up button

const scrollUpBtn = document.querySelector('#scroll-up-btn');
const gallerySection = document.querySelector('.mini-gallery');

window.addEventListener('scroll', () =>{
  if (gallerySection.getBoundingClientRect().top < (window.scrollY - window.innerHeight)){
    scrollUpBtn.style.display = 'block';
  }else{
    scrollUpBtn.style.display = 'none';
  }
})

