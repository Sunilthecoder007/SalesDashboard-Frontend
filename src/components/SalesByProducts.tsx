import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SalesByProductsData {
  productName: string;
  sales: number;
}

interface SalesByProductsProps {
  data?: SalesByProductsData[];
}

export function SalesByProducts({ data = [] }: SalesByProductsProps) {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-foreground">Sales by Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-700">
          {/* Table header */}
          <div className="grid grid-cols-2  font-semibold pb-2">
            <div className="text-card-foreground">Product Name</div>
            <div className="text-right mr-16 text-card-foreground">Sales in $</div>
          </div>

          {/* Table rows */}
          <div>
            {data.length > 0 ? (
              data.map((product, index) => (
                <div key={index} className="grid grid-cols-[minmax(0,1fr)_120px] items-center text-sm mb-2">
                  {/* Product Name Cell */}
                  <div className="font-semibold bg-[#d6eff3] pl-2 truncate" title={product.productName}>
                    {product.productName}
                  </div>
                  {/* Sales Cell */}
                  <div className="font-semibold text-right bg-[#8bd0e0] h-full flex items-center justify-end pr-2">
                    ${product.sales.toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No data available
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}