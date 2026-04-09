# CICT Capstone UI Prototype: E-Commerce & Ordering

Welcome to your Capstone UI Prototype! This starter repository is pre-configured with **React, Vite, Tailwind CSS**, and a **Mock Database Architecture** using `localStorage`.

Currently, this application operates entirely on the front-end. It simulates a database and user authentication in your browser. This allows your group to rapidly build user interfaces, map out business logic, and test user flows before connecting a real Node.js/MongoDB backend.

## Step 1: Installation & Setup

1. **Create Your Repository:** Click the green **"Use this template"** button at the top of this GitHub repository to create a copy in your own group's account.
2. **Clone to Your Machine:** Open your terminal and run:
   git clone [paste-your-new-repo-url-here]
3. **Open in VS Code**: Open the newly cloned folder in VS Code.
4. **Install Dependencies**: Open the VS Code Integrated Terminal (Ctrl + ~). Ensure your terminal path is inside the project folder, then run:
Bash
npm install


## Step 2: Running the Server

1. **Start the Development Server**: Run the following command in your terminal:
Bash
npm run dev
2. **View the Application:** Hover over or click the http://localhost:5173 link in your terminal to open the template in your browser.

## Step 3: Testing the System Flow
To understand how the application works, test the order pipeline using the built-in mock accounts (admin@store.com / admin123 and customer@store.com / user123).

1. **Log In as a Customer**: Click "Login" in the top right and sign in using the Customer Account credentials.
2. **Place an Order**: Go to the Catalog, add a few items to your cart, click the Cart Icon, and proceed to Checkout. Fill out the shipping details and confirm.
3. **Check Your History:** Click "My Orders" in the navigation bar. You will see your new order listed as "Pending".
4. **Log Out:** Click the red Logout button to clear your session.
5. **Log In as Admin:** Log back in using the Admin Account credentials. Notice that the "Admin Panel" button now appears in the navigation.
6. **Process the Order:** Go to the Admin Panel. Find the order you just placed and change its status from "Pending" to "Processing" or "Completed".
7. **Verify the Update:** Log back in as the Customer. Check "My Orders" to see that your order status has automatically updated.

## Step 4: Customizing Your Template
Now that the core system works, it is time to customize it for your specific Capstone title.
1. **Change the Products:** Open src/api/productService.js and replace the default products with the actual items or services for your business (e.g., Dried Fish, E-Bikes, or Food Menu items).
2. **Customize the Branding:** Open src/components/Navbar.jsx to change the system name and icons. You can find free icons to use at lucide.dev/icons.
20 **Build Additional Pages:** Look at your project objectives. If you need an "About Us" or "Contact" page, create new components in the src/pages/ folder and add them to the routing in src/App.jsx.