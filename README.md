# bash-travels# **Bash Travels ✈️ – AI-Powered Travel Companion**

*A full-stack web app designed to simplify travel planning for Japan & Korea.*

<p align="center">
  <img src="frontend/projectDemo1.png" alt="Project Demo 1" width="300" height="300"/>
  <img src="frontend/projectDemo2.png" alt="Project Demo 2" width="400" height="300"/>
</p>

## **🌍 About the Project**

Bash Travels is a one-stop solution for planning trips, offering AI-powered recommendations, real-time translations, and essential travel tools. Built specifically for a trip to **Japan & Korea**, this app combines everything needed into a single, easy-to-use platform.

## **🚀 Features**

✅ **AI-Powered Assistant** – Get real-time travel recommendations, find **nearby restrooms**, and translate on the go.\
✅ **Pocket Translator** – Quick English-to-Japanese/Korean translations with phonetic support.\
✅ **Itinerary Planner** – Pre-built and customizable travel plans for each day.\
✅ **Currency Converter** – Simple USD, JPY, and KRW conversions.\
✅ **Location-Based Search** – Instantly find **restaurants, stores, and emergency locations** nearby using OpenStreetMap.



## **🛠️ Tech Stack**

- **Frontend:** HTML, CSS, JavaScript, Bootstrap
- **Backend:** Node.js, Express.js
- **AI Integration:** OpenAI API (GPT)
- **Location Data:** OpenStreetMap Overpass API
- **Hosting:** Vercel (Frontend & Backend)

## **💻 Getting Started**

### **1⃣ Clone the Repository**

```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/bash-travels.git
cd bash-travels
```

### **2⃣ Install Dependencies**

#### Frontend:

```sh
cd frontend
npm install
```

#### Backend:

```sh
cd backend
npm install
```

### **3⃣ Set Up Environment Variables**

Create a `.env` file inside `backend/` and add:

```sh
OPENAI_API_KEY=your_openai_api_key_here
```

### **4⃣ Run the Project Locally**

#### **Start Backend**

```sh
cd backend
node server.js
```

The backend will run on [**http://localhost:5001**](http://localhost:5001)

#### **Start Frontend**

```sh
cd frontend
npm start
```

The frontend will run on [**http://localhost:3000**](http://localhost:3000)

## **🌎 Live Demo**

Check out the deployed version:\
🔗 [**Bash Travels Live**](https://bash-travels.vercel.app/)

---

## **📌 Future Improvements**

- 🏞️ **Interactive Map for Sightseeing Locations**
- 🗓️ **User-Customized Itinerary Planner**
- 🏨 **Hotel & Airbnb Recommendations**

