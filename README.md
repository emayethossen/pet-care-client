# Pet Care Tips & Stories - Frontend

This is the frontend for the **Pet Care Tips & Stories** web application. It is built with **Next.js** and allows users to explore pet care blogs and stories, make payments for premium content, and manage their profiles.

## Live link: https://pet-care-client-three.vercel.app/

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Key Pages](#key-pages)
- [Authentication](#authentication)
- [Payment Integration](#payment-integration)
- [Infinite Scrolling](#infinite-scrolling)
- [Search and Filter](#search-and-filter)
- [Contributing](#contributing)
- [License](#license)

---

## Tech Stack

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Superset of JavaScript used for static typing.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for making API requests.
- **MongoDB**: For storing data.
- **JWT (JSON Web Tokens)**: Used for authentication.
- **Stripe / Aamarpay**: Payment gateway integration.
- **react-infinite-scroll-component**: For implementing infinite scrolling.

---

## Features

- **User Authentication**: Login, registration, and protected routes.
- **Blog Listing**: Browse pet care tips and stories.
- **Search & Filter**: Search posts by title and filter by categories.
- **Infinite Scrolling**: Seamless data loading as the user scrolls.
- **Premium Content Access**: Restrict certain content based on user payments.
- **Profile Management**: Update user details and view premium content.
- **Payment Integration**: Stripe and Aamarpay integration for premium content access.

---

## Installation

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v14.x or later)
- **npm** or **yarn**

### Steps to install and run the frontend:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/emayethossen/pet-care-client.git
   cd pet-care-client
