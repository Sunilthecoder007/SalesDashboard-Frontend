# 📊 Sales Dashboard Frontend

A modern, responsive React.js dashboard application for visualizing sales analytics data. Features interactive charts, real-time filtering, and dynamic data visualization powered by a Node.js backend API.

## 🚀 Features

### **Core Features (✅ Implemented)**
- **Interactive Dashboard** - Real-time sales analytics visualization
- **State-based Filtering** - Dynamic dropdown populated from API
- **Date Range Selection** - Smart date filtering with validation
- **Responsive Design** - Works on desktop, tablet, and mobile devices

### **Dashboard Components**
- **📈 KPI Cards** - Total Sales, Quantity Sold, Discount%, Profit
- **🏙️ Sales by City** - Horizontal bar chart with dynamic scaling
- **📦 Sales by Products** - Product performance table
- **🎯 Sales by Category** - Interactive donut chart
- **📋 Sales by Sub-Category** - Sub-category performance table
- **👥 Sales by Segment** - Customer segment donut chart

### **Technical Features**
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- 🔄 **Real-time Updates** - Data refreshes automatically with filter changes
- 🎭 **Loading States** - User feedback during API calls
- 🛡️ **Error Handling** - Graceful error display and recovery
- 📱 **Responsive** - Mobile-first design approach
- ⚡ **Performance Optimized** - Efficient data fetching and rendering

## 🏗️ Tech Stack

- **Framework:** React.js with TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Charts:** Custom components with dynamic data visualization
- **HTTP Client:** Fetch API
- **State Management:** React Hooks (useState, useEffect)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Sales Dashboard Backend API running on `http://localhost:3001`

### Installation

```bash
# 1. Clone/Download the project
git clone <your-repo-url>
cd sales-dashboard-frontend

# 2. Install dependencies
npm install

# 3. Install required UI components (if not already installed)
npm install @radix-ui/react-select
npm install lucide-react
npm install tailwindcss
npm install class-variance-authority
npm install clsx
npm install tailwind-merge

# 4. Start development server
npm run dev
```

### Backend Dependency
Make sure your backend API is running:
```bash
# In your backend directory
cd ../sales-dashboard-backend
npm run dev
```

## 📁 Project Structure

```
sales-dashboard-frontend/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 ui/           # shadcn/ui components
│   │   │   ├── card.tsx
│   │   │   └── select.tsx
│   │   ├── Dashboard.tsx     # Main dashboard component
│   │   ├── KPICard.tsx      # KPI metrics cards
│   │   ├── SalesByCity.tsx  # City sales chart
│   │   ├── SalesByProducts.tsx    # Products table
│   │   ├── SalesBySubCategory.tsx # Sub-category table
│   │   └── DonutChart.tsx   # Category/Segment charts
│   ├── 📁 lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── 📄 package.json          # Dependencies and scripts
├── 📄 tailwind.config.js    # Tailwind configuration
├── 📄 tsconfig.json         # TypeScript configuration
└── 📄 README.md             # This file
```

## 🔌 API Integration

The frontend connects to the backend API at `http://localhost:3001/api` with these endpoints:

| Component | API Endpoint | Purpose |
|-----------|--------------|---------|
| State Dropdown | `/states` | Populate state options |
| Date Inputs | `/date-range/:state` | Set min/max dates |
| All Charts & Cards | `/dashboard-data` | Load dashboard data |

### API Configuration
The API base URL is configured in the Dashboard component:
```typescript
const API_BASE = 'http://localhost:3001/api';
```

For production, update this to your deployed backend URL.

## 📊 Component Details

### Dashboard.tsx (Main Component)
**Responsibilities:**
- Manages all state and API calls
- Handles filtering logic
- Coordinates data flow to child components
- Provides loading states and error handling

**Key Features:**
- Real-time state management
- Automatic data refresh on filter changes
- Error boundary with user-friendly messages
- Loading indicators during API calls

### KPICard.tsx
**Purpose:** Display key performance indicators
- Total Sales with currency formatting
- Quantity Sold with number formatting
- Discount Percentage with decimal precision
- Profit with currency formatting

### SalesByCity.tsx
**Purpose:** Horizontal bar chart for city-wise sales
- Dynamic bar scaling based on data
- Intelligent axis labels (adapts to data range)
- Truncated city names with hover tooltips
- Responsive design for different screen sizes

### SalesByProducts.tsx & SalesBySubCategory.tsx
**Purpose:** Tabular display of product/subcategory performance
- Clean table layout with alternating row styles
- Currency formatting for sales values
- Truncated product names for long titles
- Consistent styling with dashboard theme

### DonutChart.tsx
**Purpose:** Category and segment distribution visualization
- Dynamic data binding from API
- Color-coded segments
- Legend integration
- Responsive sizing

## 🎨 Styling & Design

### Color Scheme
```css
/* Primary Colors */
--chart-teal: #8bd0e0     /* Bar charts */
--chart-blue: #227cb4     /* Icons and accents */
--chart-orange: #ffbf65   /* Highlights */
--profit-pink: #e91e63    /* Profit indicators */
--success-green: #4caf50  /* Success states */

/* Background Colors */
--bg-light-blue: #d6eff3  /* Chart backgrounds */
--bg-card: white          /* Card backgrounds */
```

### Responsive Breakpoints
- **Mobile:** < 768px (stacked layout)
- **Tablet:** 768px - 1024px (2-column grid)
- **Desktop:** > 1024px (full 3-4 column layout)

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Run type checking
npm run type-check
```

### Environment Configuration

Create `.env` file for environment-specific settings:
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_TITLE=Sales Dashboard
```

Update API configuration:
```typescript
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
```

## 🎯 Key Features Implementation

### 1. Dynamic State Selection
```typescript
// Fetches real states from backend
const fetchStates = async () => {
  const response = await fetch(`${API_BASE}/states`);
  const data = await response.json();
  setStates(data.data);
};
```

### 2. Smart Date Range Updates
```typescript
// Updates date inputs when state changes
useEffect(() => {
  if (selectedState) {
    fetchDateRange(selectedState);
  }
}, [selectedState]);
```

### 3. Real-time Data Filtering
```typescript
// Refreshes all data when filters change
useEffect(() => {
  if (selectedState && fromDate && toDate) {
    fetchDashboardData();
  }
}, [selectedState, fromDate, toDate]);
```

### 4. Loading States
```typescript
// Shows loading indicators during API calls
{loading && (
  <div className="text-center text-sm text-gray-500 mb-4">
    Updating dashboard data...
  </div>
)}
```

## 🧪 Testing

### Manual Testing Checklist

**✅ State Selection:**
- [ ] Dropdown shows real states from backend
- [ ] Selecting state updates date range
- [ ] Date inputs reflect actual data range

**✅ Date Filtering:**
- [ ] From/To dates can be changed
- [ ] Date changes trigger data refresh
- [ ] Invalid date ranges are handled

**✅ Data Display:**
- [ ] All KPI cards show real numbers
- [ ] Charts display actual data from JSON
- [ ] Product/city names match source data
- [ ] Numbers are properly formatted

**✅ Responsive Design:**
- [ ] Works on mobile devices
- [ ] Tablet layout is functional
- [ ] Desktop shows full feature set

### API Connection Testing
```bash
# Test if backend is accessible
curl http://localhost:3001/api/health

# Test API endpoints
curl http://localhost:3001/api/states
curl http://localhost:3001/api/dashboard-data
```

## 🚀 Deployment

### Build for Production
```bash
# Create production build
npm run build

# The dist/ folder contains deployable files
```

### Deployment Options

**1. Static Hosting (Vercel, Netlify):**
```bash
# Deploy to Vercel
npm install -g vercel
vercel --prod

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**2. Docker Deployment:**
```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**3. Custom Server:**
```bash
# Serve with any static file server
npm install -g serve
serve -s dist -l 3000
```

## 🛠️ Troubleshooting

### Common Issues

**1. API Connection Failed**
```bash
# Check if backend is running
curl http://localhost:3001/api/health

# Verify CORS configuration in backend
# Ensure frontend URL is allowed
```

**2. Components Not Rendering**
```bash
# Check console for JavaScript errors
# Verify all dependencies are installed
npm install

# Check if shadcn/ui components are properly installed
```

**3. Styling Issues**
```bash
# Ensure Tailwind CSS is properly configured
# Check if custom CSS classes are defined
# Verify postcss configuration
```

**4. Data Not Loading**
```bash
# Open browser developer tools
# Check Network tab for failed API calls
# Verify backend is returning expected data format
```

**5. TypeScript Errors**
```bash
# Run type checking
npm run type-check

# Install missing type definitions
npm install --save-dev @types/react @types/react-dom
```

## 📱 Browser Support

- **Chrome:** Latest 2 versions
- **Firefox:** Latest 2 versions
- **Safari:** Latest 2 versions
- **Edge:** Latest 2 versions

## 🔒 Security Considerations

- **API Endpoints:** Ensure backend has proper CORS configuration
- **Environment Variables:** Keep sensitive data in `.env` files
- **Build Security:** Regularly update dependencies for security patches

## 🎉 Features Completed

### ✅ Required Features
- [x] Dashboard created from Figma design
- [x] State selection dropdown with API integration
- [x] Date range selection with backend validation

### 🎯 Bonus Features
- [x] Dynamic data binding for all charts and cards
- [x] Responsive design for all screen sizes
- [x] TypeScript implementation
- [x] Loading states and error handling
- [x] Professional UI with consistent styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/new-feature`)
6. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or issues:
1. Check the troubleshooting section above
2. Verify backend API is running and accessible
3. Check browser console for error messages
4. Ensure all dependencies are properly installed

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
