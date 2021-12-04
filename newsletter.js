let isFormActive = false;
let isNotificationsActive = false;
const duration = .2;
const transitionY = 10;
const easing = Sine.easeOut;

const notifyButton = document.getElementsByClassName('notify')[0];
const newsletterButton = document.getElementsByClassName('newsletter')[0];

const emailInput = document.getElementsByClassName('email-input')[0];
const nameInput = document.getElementsByClassName('name-input')[0];

const form = document.getElementsByClassName('form')[0];

//TweenLite.set(form, {opacity: 0, y: transitionY})
TweenLite.set(notifyButton, { opacity: 1, y: 0 });
TweenLite.set(emailInput, { opacity: 0, y: transitionY });
TweenLite.set(nameInput, { opacity: 0, y: transitionY });

newsletterButton.addEventListener("click", () => {
  if (isFormActive) {
    var tl = new TimelineLite();
    tl.call(() => {
      document.body.classList.remove('is-form');
    });
    tl.to(emailInput, duration, { opacity: 0, y: transitionY, ease: easing });
    tl.to(nameInput, duration, { opacity: 0, y: transitionY, ease: easing }, '-0.1');
    tl.to(notifyButton, duration, { opacity: 1, y: 0, ease: easing });
    tl.play();
    console.log("open");
  } else {
    var tl = new TimelineLite();
    tl.call(() => {
      document.body.classList.add('is-form');
    });
    tl.to(notifyButton, 0.15, { opacity: 0, y: -transitionY, ease: easing });
    tl.to(emailInput, 0.15, { opacity: 1, y: 0, ease: easing }, '+0.1');
    tl.call(() => {
      emailInput.focus();
    });
    tl.to(nameInput, duration, { opacity: 1, y: 0, ease: easing });
    tl.play();
    console.log("close");
  }
  isFormActive = !isFormActive;
});

notifyButton.addEventListener("click", () => {
  if (isNotificationsActive) {
    document.body.classList.remove('is-notify');
  } else {
    document.body.classList.add('is-notify');
  }
  isNotificationsActive = !isNotificationsActive;
});