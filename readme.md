# Reverse Geocoder CLI

## Introduction

This project takes latitude and longitude and reverse geocodes the location using google map API and stores it into Redis (LRU Cache )

## Code Samples

> rgc '28.657,77.288'

{ '28.657,77.288': 'F-1, Swami Dayanand Marg, Radheypuri, Krishna Nagar, Delhi 110051, India' }


> rgc "['28.657776,77.289506', '28.657876,78.289606']" --batch

{ '28.657776,77.289506': '81, Gali Number 1, Block B, Arjun Nagar, Krishna Nagar, Delhi, 110051, India',
  '28.657876,78.289606': 'Unnamed Road, Uttar Pradesh 244241, India' }


## Installation

> npm install


> Create a file called .env from copying .env.example


> In .env file put Google maps API Key and Redis Details

> npm link

You're done !!
