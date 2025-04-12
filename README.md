# Estimate Module – React Assignment

## 📋 Overview

This React project is designed to display and manage an **Estimate Module** that includes multiple **sections**, each with an unlimited number of **items**. The module simulates an API response using a provided JSON file (fetched via AJAX, not imported), and presents an interactive, editable table UI that updates calculations in real-time.

## 🚀 Features

- Fetches JSON data via AJAX to simulate backend API response.
- Dynamically renders multiple **sections**, each containing a list of **items**.
- Displays a **grand total** at the top of the page.
- Allows inline editing of `quantity` and `unit cost` for each item.
- Automatically updates:
  - Item-level total
  - Section-level total
  - Grand total (on every key press)
- Fast page load and performance even with large data sets.
- Proper conversion of monetary values (`unit_cost` and `total`) by dividing them by 100.

---

## 🛠️ Getting Started

- git clone <repository-url>
- cd estimate-table
- npm install
- npm run dev