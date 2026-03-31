# <img src="logo.svg" alt="ForestSnap Logo" width="38" align="top">  ForestSnap
  
  **Crowdsourced Fire Risk Estimation System**

  *Bridging the ground-truth gap for off-grid forest environments.*

  ![Status](https://img.shields.io/badge/Status-Active_Development-success)
  ![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-black)
  ![AWS](https://img.shields.io/badge/Cloud-AWS-FF9900)
  ![Deep Learning](https://img.shields.io/badge/AI-ResNet%20%7C%20U--Net-blue)
</div>

---

## 🌲 Overview

Current predictive wildfire models rely heavily on low-resolution satellite imagery, which fails to detect the dangerous "fuel load" (dry undergrowth) hidden beneath the tree canopy. **ForestSnap** is a crowdsourced solution designed to capture this critical ground-truth data safely and efficiently.

By empowering hikers and forest rangers with an offline-capable mobile application, ForestSnap captures geo-tagged images of forest environments and offloads the heavy computational AI analysis to scalable cloud infrastructure, ultimately generating highly granular, localized fire risk heatmaps.

---

## ⚠️ The Problem: The Ground-Truth Gap

1. **Low-Res Satellite Data:** Satellites can map the canopy, but they cannot see the highly flammable dry brush underneath.
2. **Computational Drain:** Running real-time AI image segmentation and classification directly on a mobile device severely drains batteries—a major safety hazard in off-grid scenarios.
3. **Zero Connectivity:** Deep forest trails lack internet access, making instant data synchronization and risk reporting impossible for personnel on the ground.

---

## 💡 The Solution: Three Phases to Intelligence

### Phase 1: Edge Data Collection & Store-and-Forward
Users capture geo-tagged photos of undergrowth offline. The app extracts necessary metadata, encrypts the payload, and queues it in a local database. The system utilizes a battery-conscious "Store-and-Forward" architecture, waiting to automatically batch-sync the data only when cellular connectivity is restored.

### Phase 2: Cloud AI Inference Pipeline
Once synchronized via AWS API Gateway, the heavy lifting is offloaded to the cloud. Our deep learning pipeline normalizes the images and passes them through two models:
* **U-Net:** Performs semantic segmentation to assess undergrowth density.
* **ResNet:** Classifies specific wild forest fuel types based on training from datasets like *iNaturalist* and *PlantVillage*.

### Phase 3: Geospatial Fusion & Risk Calculation
The AI outputs are fused with geospatial coordinates and queried against global databases (e.g., TRY Plant Trait Database for flammability metrics) and external weather APIs. The system calculates a localized Fire Risk Index, updates global heatmaps, and pushes automated alerts to forest departments.

---

## 🛠️ Architecture & Tech Stack

**Web & Mobile Frontend:**
* **Framework:** Next.js (Web), React Native / Native iOS/Android (Mobile - *In Progress*)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion / Custom CSS Keyframes

**Cloud Infrastructure (AWS Native):**
* **Ingestion:** API Gateway
* **Storage:** S3 (Blob Storage)
* **Compute/Events:** AWS Lambda, EventBridge

**AI / Machine Learning:**
* **Image Segmentation:** U-Net (Convolutional Networks)
* **Image Classification:** ResNet (Deep Residual Learning)
* **Datasets:** iNaturalist, PlantVillage

---

## 🚀 Getting Started (Web Landing Page)

To run the Next.js landing page locally:

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/forestsnap.git](https://github.com/your-username/forestsnap.git)
   cd forestsnap/web

Install dependencies

Bash
npm install
# or
yarn install
Run the development server

Bash
npm run dev
# or

👨‍💻 The Team
Built by engineering students at the Ramaiah Institute of Technology, Dept. of CSE (AI&ML), as part of the VI Semester Mini Project (Code: CIP67).

Project Guide: Dr. Naveen N C (Professor, Dept. of CSE AIML)

Developers:

Arya N. (1MS23CI017)
Ishan Gupta (1MS23CI043)
Kotagi Shashank (1MS23CI058)
Kumar Aadarsh Suman (1MS23CI059)

📄 License
© 2026 Ramaiah Institute of Technology. All rights reserved.
