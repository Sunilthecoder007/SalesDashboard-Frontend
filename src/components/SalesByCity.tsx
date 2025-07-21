import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SalesByCityData {
  city: string;
  sales: number;
}

interface SalesByCityProps {
  data?: SalesByCityData[];
}

export function SalesByCity({ data = [] }: SalesByCityProps) {
  // Find max value for scaling, ensure we have at least 1 to avoid division by zero
  const maxValue = data.length > 0 ? Math.max(...data.map(item => item.sales)) : 1;

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-foreground">Sales by City</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-16 text-xs text-right">
                  {item.city}
                </div>
                <div className="flex-1 h-6 bg-[#d6eff3] relative overflow-hidden">
                  <div 
                    className="h-full bg-chart-teal transition-all duration-500"
                    style={{ width: `${(item.sales / maxValue) * 100}%` }}
                  />
                </div>
                <div className="w-8 text-xs text-muted-foreground">
                  ${Math.round(item.sales)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No data available
            </div>
          )}
        </div>
        <div className="flex justify-between mt-4 text-xs text-muted-foreground">
          {(() => {
            if (data.length === 0) {
              return (
                <>
                  <span>$0</span>
                  <span>$20</span>
                  <span>$40</span>
                  <span>$60</span>
                  <span>$80</span>
                  <span>$100</span>
                </>
              );
            }
            
            // Create 6 evenly spaced scale points from 0 to maxValue
            const scalePoints = [];
            for (let i = 0; i <= 5; i++) {
              const value = (maxValue / 5) * i;
              scalePoints.push(
                <span key={i}>
                  ${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : Math.round(value)}
                </span>
              );
            }
            return scalePoints;
          })()}
        </div>
      </CardContent>
    </Card>
  );
}