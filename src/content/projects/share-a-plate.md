---
title: "Share A Plate: Mutual Exchange"
kind: Team project
role: Built the Mutual Exchange feature; QA and presentation lead
dates: Fall 2025
sortDate: 2025-12-01
duration: One semester (senior capstone)
team: 4 developers
summary: Share A Plate is a React Native app that connects neighbors through food sharing. I designed and built its Mutual Exchange feature, where people post food to offer or trade, find posts near them, and arrange exchanges. Before anyone can trade, the feature makes sure they have accepted Michigan's Cottage Food Law terms.
blurb: React Native app for neighborly food sharing. I built the Mutual Exchange feature end to end, from the live feed to the Cottage Food Law agreement.
metrics:
  - value: "13,000+"
    label: lines of code across 31 documented files
  - value: "10+"
    label: screens with transitions under 500 ms
  - value: "3"
    label: "exchange types: offer, cook together, trade"
tags:
  - React Native
  - Expo
  - TypeScript
  - Firebase Auth
  - Firestore
  - React Navigation
featured: true
diagram: phone-screens
gallery:
  - src: ../../assets/projects/share-a-plate/exchange-feed.png
    alt: Exchange feed showing a Cook Together post with its distance, filter chips, and a button to view the Cottage Food Law.
    caption: Exchange feed with distance and type filters
  - src: ../../assets/projects/share-a-plate/create-exchange.png
    alt: Create Exchange form with a photo field, the three exchange types, a title and a description.
    caption: Posting an exchange
  - src: ../../assets/projects/share-a-plate/request-exchange.png
    alt: Request Exchange screen where a user writes a message to the post's owner.
    caption: Requesting to join an exchange
  - src: ../../assets/projects/share-a-plate/messaging.png
    alt: Chat between two users about a freeze-dried candy trade, with the post pinned at the top.
    caption: Messaging opens after a request is accepted
---

### My part

I owned the Mutual Exchange feature, from wireframes to working screens, and was the team's QA and presentation lead. Other teammates built authentication, the recipe feed and events.

### Live feed and search

- Real-time Firestore listeners (`onSnapshot`) keep the exchange feed current without a refresh.
- Posts are filtered by distance using the Haversine formula on latitude and longitude. Zip codes are geocoded to coordinates.
- Search combines several criteria: allergens, dietary preferences and food categories.

### Exchange workflow

- Three exchange types: Offering, Cook Together and Direct Trade.
- A request, accept and decline flow with status that updates in real time.
- Messaging opens once an exchange is accepted.
- Bookmarks for saving posts.

### Cottage Food Law agreement

Michigan's Cottage Food Law sets rules for making and sharing homemade food. Before anyone can trade, the app shows the terms and asks the user to accept them.

- Firebase checks each user's agreement status, so the screen only appears for users who haven't agreed yet.
- Each agreement is stored with a timestamp.
- Firebase security rules enforce the requirement on the server, not just in the app.

### Problems I solved

- **Authentication state:** fixed issues where screens didn't reflect whether a user was signed in.
- **Navigation:** fixed React Navigation issues in the exchange flow.

### Design

I designed the wireframes for the features overview, location entry, and filtered posts on a map.

### Code

The code is in a private team repository. I'm happy to walk through it in an interview.
