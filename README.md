# takehome-challenge
Brave Credit Interview Take Home Challenge #1

## Introductions
Welcome to the Brave Credit take home challenge. For this challenge we are going to look for you to demonstrate your front end engineering chops as you build out a simple interface for us. We will be providing just basic instructions and welcome you to put your own spin on it. Feel free to use other similar interfaces you might find, but please do not just lift the code directly from another site.

## Requirements
Imagine it is your first day at Brave Credit and after a onboarding session it is time to get to work. You were hoping for a nice easy first day, but unfortunately we have a bit of a problem. See, our UI/UX designer forgot to design an interface to allow users to sign up for our newsletter and now they have gone out on a two week technology abstinence retreat with no access to phone, email, or more importantly Figma. In order to hit our deadline we have to pull out a home run and design a nice looking intake form in **4 hours** in order to make the next code deployment.  

In order for this intake form to work properly it must meet the following conditions:
- Capture first name, last name, email, and date of birth
- Date of birth must allow a user to scroll through a list of months, days, and years (allow for users up to 99 years old)
- Save the data in a database (you can user local storage for now to mimic a database)
- Validate the user information to ensure that it is a valid email (see note on email validation)
- Validate the date of birth is a valid date.
- Validate the form is complete before submitting the information
- Mark required fields with an asterisk (first name, last name, and email are required)
- Provide a helpful tip if the user tries to submit the form and it is not valid
- Provide feedback to the user indicating that their information has been submitted
- It must look nice, so incorporate some of our corproate SVGs in to the design (see note on content)

## Instructions
1. You can use whatever framework you feel comfortable with (React, Vue, Angular, JQuery/HTML (even though not a framework)) to build the interface
2. You can use whatever styling library you like, such as Bootstrap, Tachyon, Tailwind, or just plain CSS, but we would prefer to see you use one unless your strongly prefer not to.
3. The form needs to be responsive to mobile screens and incorporate a mobile first approach...start with a width of 320px, and allow for layout changes if the screen width increases from there. Go with standard break points, i.e., 320px, 425px, 768px.
4. In order to mimic the successful saving of data, use our DBMock class to asynchronously save to local storage and retrieve from local storage...be careful though. See our intern designed the class and didn't really test much so it might not save correctly if you pass in the data incorrectly. But we can't really blame them, they did focus all their effort on learning Backbone after all.

## Getting started
1. Once access to this repo is granted, consider the 4 hours to have started. 
2. Push your code even if not finished, **4 hours** from that start time. 
3. **Try to get the core requirements down first and then tackle the nice to haves after.**
4. Provide any comments or additional considerations you might have had that did not make it in to your solution. 

## Assets
Here is a list of urls you can use for assets. These should all be publicly available, so let me know if you can't access them.
- "https://d3e1i93f88eoxl.cloudfront.net/login-visual.svg"
- "https://d3e1i93f88eoxl.cloudfront.net/logo-only.png"
- "https://d3e1i93f88eoxl.cloudfront.net/logo-text-only-blurple.svg"
- "https://d3e1i93f88eoxl.cloudfront.net/undraw_sign_in_re_o58h.svg"
- "https://d3e1i93f88eoxl.cloudfront.net/undraw_welcoming_xvuq.svg"

## DB MOCK
```
class DBMock {
  constructor() { }
  
  async putItem(key, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        localStorage.setItem(key, data);
        resolve('success')
      }, 100)
    })
  }

  async getItem(key) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const item = localStorage.getItem(key);
        resolve(item);
      })
    })
  }

}
```

## Email Validation Function
```
const isValid = (value) => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  const isValid = expression.test(value);
  return isValid;
}
```
