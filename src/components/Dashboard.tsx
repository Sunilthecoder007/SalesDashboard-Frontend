import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { KPICard } from "./KPICard";
import { SalesByCity } from "./SalesByCity";
import { SalesByProducts } from "./SalesByProducts";
import { DonutChart } from "./DonutChart";
import { SalesBySubCategory } from "./SalesBySubCategory";

// API Base URL
const API_BASE = 'https://salesdashboard-backend-ctvm.onrender.com/api';

// Types for API responses
interface DashboardData {
  cards: {
    totalSales: number;
    quantitySold: number;
    discountPercentage: number;
    profit: number;
  };
  charts: {
    salesByCity: Array<{ city: string; sales: number }>;
    salesByProducts: Array<{ productName: string; sales: number }>;
    salesByCategory: Array<{ category: string; sales: number }>;
    salesBySubCategory: Array<{ subCategory: string; sales: number }>;
    salesBySegment: Array<{ segment: string; sales: number }>;
  };
}

interface DateRange {
  minDate: string;
  maxDate: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export function Dashboard() {
  // State management
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // API functions
  const fetchStates = async () => {
    try {
      const response = await fetch(`${API_BASE}/states`);
      const data: ApiResponse<string[]> = await response.json();
      if (data.success) {
        setStates(data.data);
        // Set first state as default
        if (data.data.length > 0) {
          setSelectedState(data.data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching states:', error);
      setError('Failed to fetch states');
    }
  };

  const fetchDateRange = async (state: string) => {
    if (!state) return;
    
    try {
      const response = await fetch(`${API_BASE}/date-range/${encodeURIComponent(state)}`);
      const data: ApiResponse<DateRange> = await response.json();
      if (data.success) {
        setDateRange(data.data);
        setFromDate(data.data.minDate);
        setToDate(data.data.maxDate);
      }
    } catch (error) {
      console.error('Error fetching date range:', error);
      setError('Failed to fetch date range');
    }
  };

  const fetchDashboardData = async () => {
    if (!selectedState) return;
    
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedState) params.append('state', selectedState);
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);
      
      const response = await fetch(`${API_BASE}/dashboard-data?${params}`);
      const data: ApiResponse<DashboardData> = await response.json();
      
      if (data.success) {
        setDashboardData(data.data);
        setError("");
      } else {
        setError(data.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchDateRange(selectedState);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && fromDate && toDate) {
      fetchDashboardData();
    }
  }, [selectedState, fromDate, toDate]);

  // Event handlers
  const handleStateChange = (value: string) => {
    setSelectedState(value);
  };

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };

  // Format data for charts
  const formatCategoryData = () => {
    if (!dashboardData?.charts.salesByCategory) return [];
    
    const colors = ["#d16e64", "#ffbf65", "#227cb4"];
    return dashboardData.charts.salesByCategory.map((item, index) => ({
      name: item.category,
      value: item.sales,
      color: colors[index % colors.length]
    }));
  };

  const formatSegmentData = () => {
    if (!dashboardData?.charts.salesBySegment) return [];
    
    const colors = ["#d16e64", "#ffbf65", "#227cb4"];
    return dashboardData.charts.salesBySegment.map((item, index) => ({
      name: item.segment,
      value: item.sales,
      color: colors[index % colors.length]
    }));
  };

  const getCategoryLegendItems = () => {
    return dashboardData?.charts.salesByCategory.map(item => item.category) || [];
  };

  const getSegmentLegendItems = () => {
    return dashboardData?.charts.salesBySegment.map(item => item.segment) || [];
  };

  // Loading state
  if (loading && !dashboardData) {
    return (
      <div className="p-4 sm:p-6 space-y-6 mt-16 sm:mt-20 h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-card-foreground">Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !dashboardData) {
    return (
      <div className="p-4 sm:p-6 space-y-6 mt-16 sm:mt-20">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 mt-4">
      {/* Header with filters */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-card-foreground">Sales Overview</h2>
        
        {/* Mobile: Stack filters vertically, Desktop: Horizontal */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-end sm:gap-4 sm:space-y-0 lg:gap-6">
          <div className="flex flex-col w-full sm:w-auto">
            <span className="text-xs font-bold text-card-foreground mb-1 pl-1">Select a state</span>
            <Select value={selectedState} onValueChange={handleStateChange}>
              <SelectTrigger className="w-full sm:w-40 h-8 text-sm">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col w-full sm:w-auto">
            <span className="text-xs font-bold text-card-foreground mb-1 pl-1">Select From date</span>
            <input 
              type="date" 
              value={fromDate}
              onChange={handleFromDateChange}
              min={dateRange?.minDate}
              max={dateRange?.maxDate}
              className="border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            />
          </div>
          
          <div className="flex flex-col ">
            <span className="text-xs font-bold text-card-foreground mb-1 pl-1">Select To date</span>
            <input 
              type="date" 
              value={toDate}
              onChange={handleToDateChange}
              min={dateRange?.minDate}
              max={dateRange?.maxDate}
              className="border border-input bg-background px-3 py-1 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            />
          </div>
        </div>
      </div>

      {/* Loading indicator for data refresh */}
      {loading && (
        <div className="text-center text-sm text-card-foreground mb-4">
          Updating dashboard data...
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-center text-sm text-red-600 mb-4 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {/* KPI Cards - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <KPICard
          title="Total Sales"
          value={dashboardData ? `$${dashboardData.cards.totalSales.toLocaleString()}` : "$0"}
          icon={"../img/Sales Icon.png"}
          iconColor="bg-success-green"
        />
        <KPICard
          title="Quantity Sold"
          value={dashboardData ? dashboardData.cards.quantitySold.toLocaleString() : "0"}
          icon={"../img/Quantity-Icon.png"}
          iconColor="bg-chart-blue"
        />
        <KPICard
          title="Discount%"
          value={dashboardData ? `${dashboardData.cards.discountPercentage}%` : "0%"}
          icon={"../img/Discount-Icon.png"}
          iconColor="bg-chart-orange"
        />
        <KPICard
          title="Profit"
          value={dashboardData ? `$${dashboardData.cards.profit.toLocaleString()}` : "$0"}
          icon={"../img/Profit-Icon.png"}
          iconColor="bg-profit-pink"
        />
      </div>

      {/* Charts Section - Stack on mobile, side by side on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <SalesByCity data={dashboardData?.charts.salesByCity || []} />
        <SalesByProducts data={dashboardData?.charts.salesByProducts || []} />
      </div>

      {/* Bottom Charts Section - Responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <DonutChart
          title="Sales By Category"
          data={formatCategoryData()}
          legendItems={getCategoryLegendItems()}
        />
        
        <SalesBySubCategory data={dashboardData?.charts.salesBySubCategory || []} />
        
        <DonutChart
          title="Sales By Segment"
          data={formatSegmentData()}
          legendItems={getSegmentLegendItems()}
        />
      </div>
    </div>
  );
}