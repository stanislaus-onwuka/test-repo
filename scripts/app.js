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


// Progress bar

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "sg8u0cuepl61",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "qxS4VS_1bNgqXc8LOyNLQwNpipTcGNlpWRRFXXhQ0Ls"
});


let currentAmount,goal,percentage;

client.getEntries({
  content_type: "jayTeeFoundation" 
})
.then(response => {
  // document.querySelector('body').style.display = 'block';
    const values = response.items;
    currentAmount = values[0].fields.amountDonated;
    const currentAmountInNaira = (currentAmount)*420.06;
    goal = values[0].fields.donationGoal;
    const goalInNaira = goal*450;
    percentage = (currentAmount/goal)*100;
    document.querySelectorAll('.amount-in-naira').forEach((val) =>{
        val.innerHTML = `₦${currentAmountInNaira}`;
    })
    document.querySelectorAll('.amount-in-euro').forEach((val) =>{
        val.innerHTML = `£${currentAmount}`;
    })
    document.querySelectorAll('.goal-in-naira').forEach((val) =>{
        val.innerHTML = `₦${goalInNaira}`;
    })
    document.querySelectorAll('.goal-in-euro').forEach((val) =>{
        val.innerHTML = `£${goal}`;
    })
    
    document.querySelectorAll('.progress-bar').forEach( (progress) => {
      progress.style.setProperty('--variable-width', `${percentage}%`)
    })
    
 
})

.catch(console.error)
