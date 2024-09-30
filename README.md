# Espresso Tracker

[![Netlify Status](https://api.netlify.com/api/v1/badges/53e4bfba-be77-4ecc-9531-19274cd3e8cd/deploy-status)](https://app.netlify.com/sites/espresso-tracker-cody-keener/deploys)
(https://app.netlify.com/sites/espresso-tracker-cody-keener/deploys)

Welcome to Espresso Tracker! Whether you are a professional barista or brand new to the hobby, you will be able to track all of the shots you pull to make sure you are set up for success every time.  Life is too short to drink bad espresso, so use Espresso Tracker to pull the perfect shot every time!

[View App](#https://espresso-tracker-cody-keener.netlify.app)

## Get Started
//function that hides the Sorting Hat card and displays the main page
const startApp = () => {
  sortingHatContainer.toggleAttribute("hidden")
  mainPageContainer.toggleAttribute("hidden")
  renderCards(studentArray, hogwartsStudents)
}

## About the User
- The ideal user for this application is anyone who makes espresso
- They want to track the parameters of the shots they pull to fine tune their settings and pull the best shots they can
- The problem this app solves for them is that it allows users to track all of the variables that go into making espresso to see what settings make the best espresso

## Features
- Sign in with Google
- Create a new shot on the New Shot page
- See your past shots on the My Shots page
- Add a profile on the Profile page
- Set you default shot parameters on the Profile page
- Create, Read, Update, and Delete shots

## Video Walkthrough of Sorting Hat
COMING SOON

## Relevant Links
- [Check out the deployed site](#https://espresso-trackers-cody-keener.netlify.app/#)

## Code Snippet
<!-- //function that displays a sidebar to create a new Bean -->

const sideBarToggle = () => {
    if (sideBar === null) {
      setSideBar(
        <>
          <div style={{
            minWidth: '350px', marginTop: '64px', border: '2px solid white', borderRadius: '5px',
          }}
          >
            <BeanForm onUpdate={beanFormSubmit} />
          </div>
        </>,
      );
    } else {
      setSideBar(null);
    }
  };

## Project Screenshots
<img width="1148" alt="Screenshot of the Espresso Tracker Shot Form" src="public/espresso-tracker-shot-form.png">

## Contributors
- Cody Keener (https://github.com/codyKeener)

## ------------------------------------------------------------------------------------------ ##

## Instructions I followed:

## Goals
The goal of this project is to test your knowledge and to have a FUN time stretching yourself on your FIRST independent application that will become a part of your portfolio.

Focus on MVP. Do not spend a ton of time styling initially. Hit functionality first and then spend time on the styling of the project using bootstrap.

- READ THROUGH ALL OF THE INFORMATION BELOW before planning how you will tackle the project.
- Check the Issue Tickets to organize your process. You will have all week in class to work on this in class.
- PLEASE submit questions in help tickets if you need help. We will guide you to the resources that are available to you.
- When done, tell an instructor. Everyone will present how far they got AND their favorite piece of code that they wrote to an instructor.
- MOST OF ALL HAVE FUN!!!!!

## Instructions
See the Front End Capstone Expectations doc: https://docs.google.com/document/d/1zgPb-j0SOrwnI6G1MN9e0i58Fgfypo-loFqonlJG9ZY/edit


<!-- [See Demo](https://drt-sortinghat.netlify.app/)
 -->
## Technical Requirements
See the Front End Capstone Expectations doc: https://docs.google.com/document/d/1zgPb-j0SOrwnI6G1MN9e0i58Fgfypo-loFqonlJG9ZY/edit

## DEFINITION OF DONE
Once you have completed all the technical requirments, you should complete the following:
- [README Requirements](https://github.com/orgs/nss-evening-web-development/discussions/13)
- **RECOMMENDED** Loom Video: [Sign up for Loom](https://www.loom.com/signup) and record a video of you walking through your app
